/**
 * Copies favicon.io export from public/favicon-source/ into app + public paths.
 * Drop a fresh favicon.io zip contents into public/favicon-source/, then: npm run icons
 */
import { copyFile, mkdir } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const sourceDir = join(root, 'public', 'favicon-source')
const publicDir = join(root, 'public')
const appDir = join(root, 'app')

const copies = [
  ['favicon.ico', join(appDir, 'favicon.ico')],
  ['favicon.ico', join(publicDir, 'favicon.ico')],
  ['android-chrome-192x192.png', join(appDir, 'icon.png')],
  ['apple-touch-icon.png', join(publicDir, 'apple-icon.png')],
  ['favicon-16x16.png', join(publicDir, 'favicon-16x16.png')],
  ['favicon-32x32.png', join(publicDir, 'favicon-32x32.png')],
  ['android-chrome-192x192.png', join(publicDir, 'android-chrome-192x192.png')],
  ['android-chrome-512x512.png', join(publicDir, 'android-chrome-512x512.png')],
  ['site.webmanifest', join(publicDir, 'site.webmanifest')],
]

async function main() {
  await mkdir(sourceDir, { recursive: true })
  for (const [name, dest] of copies) {
    await copyFile(join(sourceDir, name), dest)
  }
  console.log('Copied favicon-source → app/ + public/')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
