import path from 'node:path'
import { execSync, spawn } from 'node:child_process'
import { access, readdir } from 'node:fs/promises'

const repoRoot = process.cwd()
const configPath = path.join(repoRoot, '.devcontainer/siteshooter/devcontainer.json')
const screenshotsDir = path.join(repoRoot, 'screenshots')

function parseArgs(argv) {
  const only = []
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--only' && argv[i + 1]) {
      only.push(argv[i + 1])
      i += 1
      continue
    }
    if (arg.startsWith('--only=')) {
      only.push(arg.slice('--only='.length))
    }
  }
  return { only }
}

function findDevcontainerBin() {
  if (process.env.DEVCONTAINER_BIN) return process.env.DEVCONTAINER_BIN
  try {
    const fromPath = execSync('command -v devcontainer', { encoding: 'utf8' }).trim()
    if (fromPath) return fromPath
  } catch {
    // no-op
  }
  if (process.env.HOME) {
    return path.join(process.env.HOME, '.devcontainers/cli/0.84.1/package/devcontainer.js')
  }
  return 'devcontainer'
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      ...options,
    })

    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Command failed: ${command} ${args.join(' ')} (exit ${code})`))
      }
    })
  })
}

async function fileExists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

async function collectPngFiles(dir, acc = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await collectPngFiles(fullPath, acc)
    } else if (entry.isFile() && entry.name.endsWith('.png')) {
      acc.push(fullPath)
    }
  }
  return acc
}

async function main() {
  const { only } = parseArgs(process.argv.slice(2))
  const onlyCsv = only.join(',')

  const devcontainerBin = findDevcontainerBin()
  const useNode = devcontainerBin.endsWith('.js')
  const baseCmd = useNode ? 'node' : devcontainerBin
  const baseArgs = useNode ? [devcontainerBin] : []

  await run(baseCmd, [
    ...baseArgs,
    'up',
    '--workspace-folder',
    repoRoot,
    '--config',
    configPath,
  ])

  const inContainerCmd = [
    'bash',
    '-lc',
    `SCREENSHOT_CLEAN=1 ${onlyCsv ? `SCREENSHOT_ONLY=${JSON.stringify(onlyCsv)} ` : ''}pnpm screenshots`,
  ]

  await run(baseCmd, [
    ...baseArgs,
    'exec',
    '--workspace-folder',
    repoRoot,
    '--config',
    configPath,
    ...inContainerCmd,
  ])

  const uid = typeof process.getuid === 'function' ? process.getuid() : 1000
  const gid = typeof process.getgid === 'function' ? process.getgid() : 1000
  await run(baseCmd, [
    ...baseArgs,
    'exec',
    '--workspace-folder',
    repoRoot,
    '--config',
    configPath,
    'sh',
    '-lc',
    `if [ "$(id -u)" = "0" ] && [ -d /workspaces/takethehelm/screenshots ]; then chown -R ${uid}:${gid} /workspaces/takethehelm/screenshots; fi`,
  ])

  if (!(await fileExists(screenshotsDir))) {
    throw new Error('Screenshot directory not found after run')
  }

  const files = (await collectPngFiles(screenshotsDir)).sort()
  const asTextUrls = files.map((filePath) => `file://${filePath}`)

  console.log('\nGenerated screenshots:')
  for (const url of asTextUrls) {
    console.log(url)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
