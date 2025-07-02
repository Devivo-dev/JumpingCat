import { glob } from 'glob'
import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import FullReload from 'vite-plugin-full-reload'
import injectHTML from 'vite-plugin-html-inject'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default defineConfig({
	base: '/JumpingCat/',
	root: 'src',
	plugins: [injectHTML(), FullReload(['./src/**/**.html'])],
	build: {
		rollupOptions: {
			input: glob
				.sync('./src/**/*.html')
				.map(file => path.resolve(dirname, file))
		},
		outDir: '../dist'
	},
	resolve: {
		alias: {
			'@': path.resolve(dirname, 'src')
		}
	}
})
