import { spawnCoin } from './coin.js'
import { updateGame } from './engine.js'
import { setupEventListeners } from './input.js'
import { onGameOver } from './onGameOver.js'
import { startCountdown } from './ui.js'

export function initGame() {
	spawnCoin()
	startCountdown(() => updateGame())
	setupEventListeners()
}

const preloadImages = [
	'../../../public/img/btn-retry.png',
	'../../../public/img/btn-retry-active.png',
	'../../../public/img/EndGame.png'
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
			await onGameOver() // зберігаємо монети
			window.location.href = './index.html' // переходимо назад
		})
	}
})
