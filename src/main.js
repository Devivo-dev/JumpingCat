import './scss/main.scss'

import { initGame } from './scripts/game/game'
import { PlayerService } from './services/player.service'
import { WhiskasService } from './services/whiskas.service'

window.addEventListener('DOMContentLoaded', async () => {
	await PlayerService.createPlayer()

	if (window.location.pathname.includes('game.html')) {
		initGame()
	}

	document.addEventListener('gesturestart', e => e.preventDefault())
	document.addEventListener('gesturechange', e => e.preventDefault())
	document.addEventListener('gestured', e => e.preventDefault())

	const whiskasDisplay = document.querySelector('#whiskas-amount')
	const sessionCoinsDisplay = document.querySelector('.coin-collected')

	// Показати баланс whiskas з бази
	await WhiskasService.getWhiskas().then(data => {
		if (whiskasDisplay) whiskasDisplay.textContent = data.data?.whiskas
	})

	// Показати, скільки зібрано за останню гру
	const collected = localStorage.getItem('coins_collected')
	if (collected !== null && sessionCoinsDisplay) {
		sessionCoinsDisplay.textContent = collected
		localStorage.removeItem('coins_collected')
	}
})
