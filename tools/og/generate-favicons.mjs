import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'public', 'brand', 'logo.png')
const OUT = path.join(ROOT, 'public')

const outputs = [
  ['favicon.png', 512],
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['favicon-48x48.png', 48],
  ['favicon-64x64.png', 64],
  ['favicon-128x128.png', 128],
  ['favicon-180x180.png', 180],
  ['favicon-192x192.png', 192],
  ['favicon-256x256.png', 256],
  ['favicon-512x512.png', 512],
  ['apple-touch-icon.png', 180],
  ['android-chrome-192x192.png', 192],
  ['android-chrome-512x512.png', 512],
]

function circleMask(size) {
  return Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/></svg>`
  )
}

function ringSvg(size, stroke) {
  const r = size / 2 - stroke / 2
  return Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="white" stroke-width="${stroke}"/></svg>`
  )
}

async function render(size) {
  const stroke = Math.max(1, Math.round(size * 0.015))
  const inner = size - stroke * 2

  const logo = await sharp(SRC)
    .resize(inner, inner, { fit: 'cover', position: 'centre' })
    .composite([{ input: circleMask(inner), blend: 'dest-in' }])
    .png()
    .toBuffer()

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: logo, left: stroke, top: stroke },
      { input: ringSvg(size, stroke), left: 0, top: 0 },
    ])
    .png()
    .toBuffer()
}

for (const [name, size] of outputs) {
  const out = path.join(OUT, name)
  const buf = await render(size)
  await sharp(buf).toFile(out)
  console.log(`generated ${name}`)
}
