import { spawnCoin } from './coin.js'
import { updateGame } from './engine.js'
import { setupEventListeners } from './input.js'
import { spawnRaindrop } from './rain.js'
import { startCountdown } from './ui.js'

export function initGame() {
	spawnCoin()
	startCountdown(() => updateGame())
	setupEventListeners()
	spawnRaindrop()
}

const preloadImages = [
	'/img/btn-retry.png',
	'/img/btn-retry-active.png',
	'/img/EndGame.png'
]

preloadImages.forEach(src => {
	const img = new Image()
	img.src = src
})

document.addEventListener('DOMContentLoaded', () => {
	const backBtn = document.getElementById('back-to-menu')
	if (backBtn) {
		backBtn.addEventListener('click', async e => {
			e.preventDefault()
			backBtn.classList.add('active')
			await new Promise(resolve => setTimeout(resolve, 300))
			window.location.href = './index.html' // переходимо назад
		})
	}
})
