import path from 'node:path'
import { execSync, spawn } from 'node:child_process'

const repoRoot = process.cwd()
const configPath = path.join(repoRoot, '.devcontainer/siteshooter/devcontainer.json')

function findDevcontainerBin() {
  if (process.env.DEVCONTAINER_BIN) return process.env.DEVCONTAINER_BIN
  try {
    const fromPath = execSync('command -v devcontainer', { encoding: 'utf8' }).trim()
    if (fromPath) return fromPath
  } catch {
    // no-op
  }
  if (process.env.HOME) return path.join(process.env.HOME, '.devcontainers/cli/0.84.1/package/devcontainer.js')
  return 'devcontainer'
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', ...options })
    child.on('exit', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`Command failed: ${command} ${args.join(' ')} (exit ${code})`))
    })
  })
}

async function main() {
  const devcontainerBin = findDevcontainerBin()
  const useNode = devcontainerBin.endsWith('.js')
  const baseCmd = useNode ? 'node' : devcontainerBin
  const baseArgs = useNode ? [devcontainerBin] : []

  await run(baseCmd, [...baseArgs, 'up', '--workspace-folder', repoRoot, '--config', configPath])

  await run(baseCmd, [
    ...baseArgs,
    'exec',
    '--workspace-folder',
    repoRoot,
    '--config',
    configPath,
    'bash',
    '-lc',
    'cd /workspaces/takethehelm && SCREENSHOT_CLEAN=1 pnpm screenshots && SCREENSHOT_BASE_URL=http://127.0.0.1:4325/takethehelm/ pnpm screenshots:audit',
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
    `if [ "$(id -u)" = "0" ]; then chown -R ${uid}:${gid} /workspaces/takethehelm/screenshots /workspaces/takethehelm/audit-results.json /workspaces/takethehelm/siteshoots-audit-latest.md 2>/dev/null || true; fi`,
  ])
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
