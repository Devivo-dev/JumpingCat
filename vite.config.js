import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default defineConfig({
 plugins: [],
 resolve: {
  alias: {
   '@': path.resolve(dirname, 'src')
  }
 }
})