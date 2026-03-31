/**
 * Builds favicon + touch icons from public/as.png (your “as” monogram).
 * Run: npm run icons
 *
 * Writes: app/favicon.ico, app/icon.png (Next file convention), apple + 32px PNGs.
 */
import sharp from 'sharp'
import pngToIco from 'png-to-ico'
import { readFile, writeFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')
const appDir = join(__dirname, '..', 'app')
const SOURCE = join(publicDir, 'as.png')

async function main() {
  const input = await readFile(SOURCE)
  const base = sharp(input).png().ensureAlpha()

  const buf16 = await base
    .clone()
    .resize(16, 16, { fit: 'cover', position: 'centre' })
    .png()
    .toBuffer()
  const buf32 = await base
    .clone()
    .resize(32, 32, { fit: 'cover', position: 'centre' })
    .png()
    .toBuffer()
  const buf48 = await base
    .clone()
    .resize(48, 48, { fit: 'cover', position: 'centre' })
    .png()
    .toBuffer()
  const buf180 = await base
    .clone()
    .resize(180, 180, { fit: 'cover', position: 'centre' })
    .png()
    .toBuffer()

  await writeFile(join(publicDir, 'icon-light-32x32.png'), buf32)
  await writeFile(join(publicDir, 'icon-dark-32x32.png'), buf32)
  await writeFile(join(publicDir, 'apple-icon.png'), buf180)

  const ico = await pngToIco([buf48, buf32, buf16])
  await writeFile(join(appDir, 'favicon.ico'), ico)
  await writeFile(join(appDir, 'icon.png'), buf48)

  console.log(
    'From public/as.png → app/favicon.ico, app/icon.png, public/apple-icon.png, public/icon-*-32x32.png'
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
