/**
 * Rasterizes the same "a" mark as static SVGs (paths unchanged from public/icon.svg).
 * Run: node scripts/generate-icons.mjs
 */
import sharp from 'sharp'
import { writeFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

function paths(fg) {
  return `
      <path fill="${fg}"
        d="M101.141 53H136.632C151.023 53 162.689 64.6662 162.689 79.0573V112.904H148.112V79.0573C148.112 78.7105 148.098 78.3662 148.072 78.0251L112.581 112.898C112.701 112.902 112.821 112.904 112.941 112.904H148.112V126.672H112.941C98.5504 126.672 86.5638 114.891 86.5638 100.5V66.7434H101.141V100.5C101.141 101.15 101.191 101.792 101.289 102.422L137.56 66.7816C137.255 66.7563 136.945 66.7434 136.632 66.7434H101.141V53Z" />
      <path fill="${fg}"
        d="M65.2926 124.136L14 66.7372H34.6355L64.7495 100.436V66.7372H80.1365V118.47C80.1365 126.278 70.4953 129.958 65.2926 124.136Z" />
`
}

function svgForTheme(bg, fg) {
  return `<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0)">
    <rect fill="${bg}" width="180" height="180" rx="37" />
    <g style="transform: scale(95%); transform-origin: center">
${paths(fg)}
    </g>
  </g>
  <defs>
    <clipPath id="clip0">
      <rect width="180" height="180" fill="white" />
    </clipPath>
  </defs>
</svg>`
}

async function main() {
  const lightScheme = svgForTheme('#000000', '#ffffff')
  const darkScheme = svgForTheme('#ffffff', '#000000')

  const bufLight = await sharp(Buffer.from(lightScheme)).resize(32, 32).png().toBuffer()
  const bufDark = await sharp(Buffer.from(darkScheme)).resize(32, 32).png().toBuffer()
  const bufApple = await sharp(Buffer.from(lightScheme)).resize(180, 180).png().toBuffer()

  await writeFile(join(publicDir, 'icon-light-32x32.png'), bufLight)
  await writeFile(join(publicDir, 'icon-dark-32x32.png'), bufDark)
  await writeFile(join(publicDir, 'apple-icon.png'), bufApple)

  console.log('Wrote public/icon-light-32x32.png, icon-dark-32x32.png, apple-icon.png')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
