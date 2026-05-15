import path from 'node:path'
import { access, mkdir, readFile, rm } from 'node:fs/promises'
import { chromium } from '@playwright/test'
import { XMLParser } from 'fast-xml-parser'
import { viewports } from './viewports.mjs'

const BASE_URL = process.env.SCREENSHOT_BASE_URL ?? 'http://127.0.0.1:4321'
const OUT_DIR = process.env.SCREENSHOT_OUT_DIR ?? 'screenshots'
const WAIT_MS = Number.parseInt(process.env.SCREENSHOT_WAIT_MS ?? '0', 10)
const NAV_TIMEOUT_MS = Number.parseInt(process.env.SCREENSHOT_NAV_TIMEOUT_MS ?? '45000', 10)
const HIDE_CONTEST_NOTICE = (process.env.SCREENSHOT_HIDE_CONTEST_NOTICE ?? '1') !== '0'
const SCREENSHOT_ONLY = process.env.SCREENSHOT_ONLY ?? ''
const CLEAN_OUT_DIR = (process.env.SCREENSHOT_CLEAN ?? '0') === '1'
const SITEMAP_PATH = process.env.SITEMAP_PATH

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

function sanitizeSegment(input) {
  return input.replace(/[^a-zA-Z0-9._-]/g, '_')
}

function urlToOutputPath(url, viewportDir) {
  const parsed = new URL(url)
  const segments = parsed.pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => sanitizeSegment(segment))
  return path.join(viewportDir, ...segments, 'index.png')
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
  if (basePath && cleanPath.startsWith(basePath)) {
    cleanPath = cleanPath.slice(basePath.length)
  }
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
    const urls = toArray(data.urlset.url)
      .map((entry) => entry?.loc)
      .filter(Boolean)
    return urls
  }

  if (data.sitemapindex) {
    const children = toArray(data.sitemapindex.sitemap)
      .map((entry) => entry?.loc)
      .filter(Boolean)

    const nested = []
    for (const childLoc of children) {
      const childPath = localSitemapPathFromLoc(childLoc)
      if (!(await fileExists(childPath))) {
        throw new Error(`Nested sitemap not found: ${childPath} (from ${childLoc})`)
      }
      nested.push(...(await parseSitemap(childPath, visited)))
    }
    return nested
  }

  throw new Error(`Unsupported sitemap format: ${filePath}`)
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function parseOnlyPatterns() {
  return SCREENSHOT_ONLY
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
}

function normalizedPathForMatching(pathname) {
  const basePath = (() => {
    try {
      return new URL(BASE_URL).pathname.replace(/^\/|\/$/g, '')
    } catch {
      return ''
    }
  })()

  const normalized = pathname.replace(/^\/|\/$/g, '')
  if (!basePath) return normalized
  if (normalized === basePath) return ''
  if (normalized.startsWith(`${basePath}/`)) return normalized.slice(basePath.length + 1)
  return normalized
}

function normalizePatternPath(pattern) {
  const fromUrl = pattern.startsWith('http://') || pattern.startsWith('https://')
  const rawPath = fromUrl ? new URL(pattern).pathname : pattern
  return rawPath.replace(/^\/|\/$/g, '')
}

function matchesPattern(pathname, patterns) {
  if (!patterns.length) return true

  const normalizedPath = normalizedPathForMatching(pathname)
  for (const pattern of patterns) {
    const normalizedPattern = normalizePatternPath(pattern)
    if (normalizedPattern.endsWith('/*')) {
      const prefix = normalizedPattern.slice(0, -2)
      if (normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`)) {
        return true
      }
      continue
    }

    if (normalizedPath === normalizedPattern) return true
  }

  return false
}

function withScreenshotParams(url) {
  const parsed = new URL(url)
  if (HIDE_CONTEST_NOTICE) {
    parsed.searchParams.set('hideContestNotice', '1')
  }
  return parsed.toString()
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

  let uniqueUrls = [...new Set(urls)]
  const onlyPatterns = parseOnlyPatterns()
  if (onlyPatterns.length) {
    uniqueUrls = uniqueUrls.filter((url) => matchesPattern(new URL(url).pathname, onlyPatterns))
  }
  if (!uniqueUrls.length) {
    throw new Error(`No URLs found in sitemap: ${sitemapPath}`)
  }

  console.log(`Sitemap: ${sitemapPath}`)
  console.log(`Found ${uniqueUrls.length} URL(s)`)
  if (onlyPatterns.length) {
    console.log(`Filters: ${onlyPatterns.join(', ')}`)
  }

  if (CLEAN_OUT_DIR) {
    await rm(OUT_DIR, { recursive: true, force: true })
  }

  const browser = await chromium.launch({ headless: true })
  const failures = []

  try {
    for (const viewport of viewports) {
      const viewportDir = path.join(OUT_DIR, viewport.name)
      await mkdir(viewportDir, { recursive: true })

      const context = await browser.newContext({
        viewport: {
          width: viewport.width,
          height: viewport.height,
        },
        deviceScaleFactor: viewport.deviceScaleFactor,
        isMobile: viewport.isMobile,
      })

      const page = await context.newPage()
      page.setDefaultNavigationTimeout(NAV_TIMEOUT_MS)

      for (const url of uniqueUrls) {
        const outputPath = urlToOutputPath(url, viewportDir)
        const targetUrl = withScreenshotParams(url)
        await mkdir(path.dirname(outputPath), { recursive: true })

        try {
          console.log(`[${viewport.name}] ${targetUrl}`)
          await page.goto(targetUrl, { waitUntil: 'networkidle' })
          if (WAIT_MS > 0) await delay(WAIT_MS)
          await page.screenshot({
            path: outputPath,
            fullPage: true,
            animations: 'disabled',
          })
        } catch (error) {
          failures.push({ viewport: viewport.name, url, error })
          console.error(`[ERROR][${viewport.name}] ${url}`)
          console.error(error)
        }
      }

      await context.close()
    }
  } finally {
    await browser.close()
  }

  if (failures.length > 0) {
    console.error(`\nFailed screenshots: ${failures.length}`)
    for (const failure of failures) {
      console.error(`- [${failure.viewport}] ${failure.url}`)
    }
    process.exit(1)
  }

  console.log('All screenshots generated successfully.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
