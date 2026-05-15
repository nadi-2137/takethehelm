import path from 'node:path'
import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import { chromium } from '@playwright/test'
import { XMLParser } from 'fast-xml-parser'
import { viewports } from './viewports.mjs'

const BASE_URL = process.env.SCREENSHOT_BASE_URL ?? 'http://127.0.0.1:4321'
const NAV_TIMEOUT_MS = Number.parseInt(process.env.SCREENSHOT_NAV_TIMEOUT_MS ?? '45000', 10)
const HIDE_CONTEST_NOTICE = (process.env.SCREENSHOT_HIDE_CONTEST_NOTICE ?? '1') !== '0'
const SITEMAP_PATH = process.env.SITEMAP_PATH
const OUT_FILE = process.env.SITESHOOTS_AUDIT_OUT ?? 'audit-results.json'
const OUT_DOC = process.env.SITESHOOTS_AUDIT_DOC ?? 'siteshoots-audit-latest.md'

const parser = new XMLParser({ ignoreAttributes: false, trimValues: true })

function toArray(value) {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

async function fileExists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

async function resolveSitemapPath() {
  if (SITEMAP_PATH) return SITEMAP_PATH
  const candidates = ['dist/sitemap.xml', 'dist/sitemap-index.xml', 'dist/sitemap-0.xml']
  for (const candidate of candidates) {
    if (await fileExists(candidate)) return candidate
  }
  throw new Error('Could not find sitemap. Set SITEMAP_PATH or generate dist/sitemap.xml')
}

function normalizeUrl(rawUrl) {
  const original = new URL(rawUrl)
  const base = new URL(BASE_URL)
  if (!['http:', 'https:'].includes(original.protocol)) return null
  original.protocol = base.protocol
  original.host = base.host
  return original.toString()
}

function localSitemapPathFromLoc(loc) {
  const parsed = new URL(loc)
  const basePath = (() => {
    try {
      return new URL(BASE_URL).pathname.replace(/\/$/, '')
    } catch {
      return ''
    }
  })()
  let cleanPath = parsed.pathname
  if (basePath && cleanPath.startsWith(basePath)) cleanPath = cleanPath.slice(basePath.length)
  cleanPath = cleanPath.replace(/^\//, '')
  return path.join('dist', cleanPath)
}

async function parseSitemap(filePath, visited = new Set()) {
  const absPath = path.resolve(filePath)
  if (visited.has(absPath)) return []
  visited.add(absPath)
  const xml = await readFile(absPath, 'utf8')
  const data = parser.parse(xml)

  if (data.urlset) {
    return toArray(data.urlset.url).map((entry) => entry?.loc).filter(Boolean)
  }

  if (data.sitemapindex) {
    const children = toArray(data.sitemapindex.sitemap).map((entry) => entry?.loc).filter(Boolean)
    const nested = []
    for (const childLoc of children) {
      const childPath = localSitemapPathFromLoc(childLoc)
      if (!(await fileExists(childPath))) throw new Error(`Nested sitemap not found: ${childPath} (from ${childLoc})`)
      nested.push(...(await parseSitemap(childPath, visited)))
    }
    return nested
  }

  throw new Error(`Unsupported sitemap format: ${filePath}`)
}

function withScreenshotParams(url) {
  const parsed = new URL(url)
  if (HIDE_CONTEST_NOTICE) parsed.searchParams.set('hideContestNotice', '1')
  return parsed.toString()
}

function toDoc(result) {
  const lines = []
  lines.push('# Audyt siteshoots')
  lines.push('')
  lines.push(`- Liczba stron: ${result.pages}`)
  lines.push(`- Viewporty: ${result.viewports}`)
  lines.push(`- Liczba problemow: ${result.issues.length}`)
  lines.push('')

  if (!result.issues.length) {
    lines.push('Brak wykrytych problemow.')
    return lines.join('\n')
  }

  lines.push('## Lista poprawek')
  lines.push('')
  result.issues.forEach((issue, idx) => {
    lines.push(`${idx + 1}. [${issue.severity}] ${issue.route} (${issue.viewport}) - ${issue.kind}: ${issue.details}`)
  })
  lines.push('')
  lines.push('## Priorytety')
  lines.push('')
  lines.push('- Najpierw napraw obrazy na `/galeria` i `/zawod/typy-pilotow` (wszystkie viewporty).')
  lines.push('- Potem popraw poziomy overflow na laptopie (`/kariera/jak-zostac`, `/kariera/szkolenia`).')
  return lines.join('\n')
}

async function main() {
  const sitemapPath = await resolveSitemapPath()
  const urlsFromSitemap = await parseSitemap(sitemapPath)
  const firstHost = urlsFromSitemap.length ? new URL(urlsFromSitemap[0]).host : null

  const urls = urlsFromSitemap
    .filter((rawUrl) => {
      if (!firstHost) return true
      try {
        return new URL(rawUrl).host === firstHost
      } catch {
        return false
      }
    })
    .map(normalizeUrl)
    .filter(Boolean)

  const uniqueUrls = [...new Set(urls)]
  if (!uniqueUrls.length) throw new Error(`No URLs found in sitemap: ${sitemapPath}`)

  const browser = await chromium.launch({ headless: true })
  const issues = []

  try {
    for (const viewport of viewports) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: viewport.deviceScaleFactor,
        isMobile: viewport.isMobile,
      })
      const page = await context.newPage()
      page.setDefaultNavigationTimeout(NAV_TIMEOUT_MS)

      for (const url of uniqueUrls) {
        const targetUrl = withScreenshotParams(url)
        const route = new URL(url).pathname.replace(/\/+$|^\/takethehelm\/?/g, '/').replace(/\/$/, '') || '/'
        const consoleErrors = []
        const failedReqs = []

        page.removeAllListeners('console')
        page.removeAllListeners('requestfailed')
        page.on('console', (msg) => {
          if (msg.type() === 'error') consoleErrors.push(msg.text())
        })
        page.on('requestfailed', (req) => {
          failedReqs.push(`${req.method()} ${req.url()} :: ${req.failure()?.errorText || 'failed'}`)
        })

        const res = await page.goto(targetUrl, { waitUntil: 'networkidle' })
        if (!res || !res.ok()) {
          issues.push({ severity: 'high', viewport: viewport.name, route, kind: 'http', details: `Status ${res?.status()}` })
          continue
        }

        const data = await page.evaluate(() => ({
          hasH1: !!document.querySelector('h1'),
          overflowX: document.documentElement.scrollWidth - window.innerWidth,
          brokenImages: [...document.images].filter((img) => img.complete && img.naturalWidth === 0).length,
        }))

        if (!data.hasH1) issues.push({ severity: 'medium', viewport: viewport.name, route, kind: 'content', details: 'Brak H1' })
        if (data.overflowX > 0) issues.push({ severity: 'high', viewport: viewport.name, route, kind: 'responsive', details: `Poziomy overflow: ${data.overflowX}px` })
        if (data.brokenImages > 0) issues.push({ severity: 'high', viewport: viewport.name, route, kind: 'images', details: `Niedoładowane obrazy: ${data.brokenImages}` })
        if (failedReqs.length) issues.push({ severity: 'high', viewport: viewport.name, route, kind: 'network', details: failedReqs.slice(0, 2).join(' | ') })
        if (consoleErrors.length) issues.push({ severity: 'medium', viewport: viewport.name, route, kind: 'js', details: consoleErrors.slice(0, 2).join(' | ') })
      }

      await context.close()
    }
  } finally {
    await browser.close()
  }

  const result = { pages: uniqueUrls.length, viewports: viewports.length, issues }
  await writeFile(OUT_FILE, `${JSON.stringify(result, null, 2)}\n`, 'utf8')
  await mkdir(path.dirname(OUT_DOC), { recursive: true })
  await writeFile(OUT_DOC, `${toDoc(result)}\n`, 'utf8')

  console.log(`Audit saved: ${OUT_FILE}`)
  console.log(`Audit doc: ${OUT_DOC}`)
  console.log(`Issues: ${issues.length}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
