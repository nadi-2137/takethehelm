import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const HERO_DIR = path.join(ROOT, 'src', 'assets', 'hero')
const OUT_DIR = path.join(ROOT, 'public', 'images', 'og')
const LOGO_PATH = path.join(ROOT, 'public', 'brand', 'logo.png')

const WIDTH = 1200
const HEIGHT = 630
const PADDING_X = 64
const PADDING_Y = 56
const MOBILE_BREAKPOINT_HINT = 640

const TARGETS = [
  {
    out: 'og-home.png',
    src: 'home.webp',
    position: 'right',
    title: 'Własny kurs - Wyżej niż szklany sufit',
    subtitle: 'Poznaj ścieżkę do kokpitu i zacznij własny kurs.',
    cta: 'Wejdź do kokpitu',
    slogan: 'Wyżej niż szklany sufit — technologia, pasja i odwaga w drodze do kokpitu.',
  },
  {
    out: 'og-pilot.png',
    src: 'who-is-pilot.webp',
    position: 'center',
    title: 'Własny kurs - Wyżej niż szklany sufit',
    subtitle: 'Zobacz, jak wygląda praca pilota krok po kroku.',
    cta: 'Sprawdź szczegóły',
    slogan: '',
  },
  {
    out: 'og-career.png',
    src: 'become-pilot.webp',
    position: 'center',
    title: 'Własny kurs - Wyżej niż szklany sufit',
    subtitle: 'Edukacja, szkolenie i licencje - zacznij świadomie.',
    cta: 'Rozpocznij kurs',
    slogan: '',
  },
  {
    out: 'og-technology.png',
    src: 'technology.webp',
    position: 'center',
    title: 'Własny kurs - Wyżej niż szklany sufit',
    subtitle: 'Technologia lotnicza bez tajemnic: kokpit i systemy.',
    cta: 'Poznaj konkurs',
    slogan: '',
  },
  {
    out: 'og-women.png',
    src: 'women-in-aviation.webp',
    position: 'right',
    title: 'Własny kurs - Wyżej niż szklany sufit',
    subtitle: 'Historie kobiet, które inspirują do lotniczej kariery.',
    cta: 'Dołącz teraz',
    slogan: '',
  },
]

function esc(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function splitTitle(title) {
  const separator = ' - '
  if (title.includes(separator)) {
    const [first, ...rest] = title.split(separator)
    return [first.trim(), rest.join(separator).trim()]
  }
  return [title, '']
}

function textLayer({ title, subtitle, cta, slogan }) {
  const [titleLine1, titleLine2] = splitTitle(title)
  return Buffer.from(`
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .kicker { font-family: 'DejaVu Sans', 'Liberation Sans', Arial, sans-serif; font-size: 22px; font-weight: 700; letter-spacing: 1.5px; fill: #d8e4ff; }
    .title { font-family: 'DejaVu Sans', 'Liberation Sans', Arial, sans-serif; font-size: 46px; font-weight: 800; letter-spacing: 0.1px; fill: #ffffff; }
    .subtitle { font-family: 'DejaVu Sans', 'Liberation Sans', Arial, sans-serif; font-size: 25px; font-weight: 400; letter-spacing: 0.1px; fill: #cfdcf7; }
    .brand { font-family: 'DejaVu Sans', 'Liberation Sans', Arial, sans-serif; font-size: 19px; font-weight: 700; letter-spacing: 0.6px; fill: #ffffff; }
    .cta { font-family: 'DejaVu Sans', 'Liberation Sans', Arial, sans-serif; font-size: 21px; font-weight: 700; letter-spacing: 0.3px; fill: #ffffff; }
    .cta-mobile { display: none; }
    @media (max-width: ${MOBILE_BREAKPOINT_HINT}px) {
      .title { font-size: 36px; }
      .subtitle { font-size: 21px; }
      .brand { display: none; }
      .cta-mobile { display: inline; }
    }
  </style>
  <text class="kicker" x="${PADDING_X}" y="${PADDING_Y + 28}">Take the helm - Własny kurs</text>
  <text class="title" x="${PADDING_X}" y="${PADDING_Y + 92}">${esc(titleLine1)}</text>
  <text class="title" x="${PADDING_X}" y="${PADDING_Y + 142}">${esc(titleLine2)}</text>
  <text class="subtitle" x="${PADDING_X}" y="${PADDING_Y + 198}">${esc(subtitle)}</text>
  <rect x="${PADDING_X}" y="${PADDING_Y + 228}" width="270" height="50" rx="14" fill="#1e5bff"/>
  <text class="cta" x="${PADDING_X + 24}" y="${PADDING_Y + 261}">${esc(cta)}</text>
  ${slogan ? `<text class="brand" x="${PADDING_X}" y="${HEIGHT - 36}">${esc(slogan)}</text>` : ''}
</svg>`)
}

function overlayLayer() {
  return Buffer.from(`
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="leftPanel" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#030b16" stop-opacity="0.72"/>
      <stop offset="58%" stop-color="#07172c" stop-opacity="0.46"/>
      <stop offset="100%" stop-color="#0c223f" stop-opacity="0.08"/>
    </linearGradient>
    <radialGradient id="vignette" cx="50%" cy="45%" r="78%">
      <stop offset="65%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.20"/>
    </radialGradient>
    <linearGradient id="panelFade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#051224" stop-opacity="0.42"/>
      <stop offset="85%" stop-color="#051224" stop-opacity="0.26"/>
      <stop offset="100%" stop-color="#051224" stop-opacity="0.08"/>
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#leftPanel)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#vignette)"/>
  <rect x="${PADDING_X - 20}" y="${PADDING_Y - 18}" width="760" height="318" rx="28" fill="url(#panelFade)"/>
  <g opacity="0.22">
    <line x1="50" y1="510" x2="430" y2="510" stroke="#7aa6ff" stroke-width="1"/>
    <line x1="50" y1="525" x2="350" y2="525" stroke="#7aa6ff" stroke-width="1"/>
    <circle cx="430" cy="510" r="3.2" fill="#7aa6ff"/>
  </g>
</svg>`)
}

async function logoBadge() {
  const logo = await sharp(LOGO_PATH)
    .resize(74, 74, { fit: 'cover', position: 'centre' })
    .modulate({ brightness: 0.92, saturation: 0.95 })
    .png()
    .toBuffer()

  const circleMask = Buffer.from(
    `<svg width="74" height="74" xmlns="http://www.w3.org/2000/svg"><circle cx="37" cy="37" r="37" fill="white"/></svg>`
  )
  const logoCircle = await sharp(logo)
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer()

  const frame = Buffer.from(
    `<svg width="86" height="86" xmlns="http://www.w3.org/2000/svg"><circle cx="43" cy="43" r="41" fill="none" stroke="white" stroke-width="2.6"/></svg>`
  )

  return sharp({
    create: {
      width: 86,
      height: 86,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: logoCircle, left: 6, top: 6 },
      { input: frame, left: 0, top: 0 },
    ])
    .png()
    .toBuffer()
}

async function generateOne(target) {
  const srcPath = path.join(HERO_DIR, target.src)
  const outPath = path.join(OUT_DIR, target.out)

  const badge = await logoBadge()

  await sharp(srcPath)
    .resize(WIDTH, HEIGHT, {
      fit: 'cover',
      position: target.position,
      kernel: sharp.kernel.lanczos3,
    })
    .modulate({ brightness: 1.02, saturation: 1.06 })
    .composite([
      { input: overlayLayer(), blend: 'over' },
      { input: textLayer(target), blend: 'over' },
      { input: badge, top: PADDING_Y + 12, left: WIDTH - PADDING_X - 86, blend: 'over' },
    ])
    .png({ compressionLevel: 9, quality: 94 })
    .toFile(outPath)

  return outPath
}

async function run() {
  await fs.mkdir(OUT_DIR, { recursive: true })

  for (const target of TARGETS) {
    const p = path.join(HERO_DIR, target.src)
    await fs.access(p)
  }

  const outputs = []
  for (const target of TARGETS) {
    outputs.push(await generateOne(target))
  }

  console.log('Wygenerowano OG:')
  for (const output of outputs) {
    console.log(`- ${path.relative(ROOT, output)}`)
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
