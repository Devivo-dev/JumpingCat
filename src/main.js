import { initGame } from './scripts/game/game'
import './scss/main.scss'
import { WhiskasService } from './services/whiskas.service'

window.addEventListener('DOMContentLoaded', () => {
	if (window.location.pathname.includes('game.html')) {
		initGame()
	}

	document.addEventListener('gesturestart', e => e.preventDefault())
	document.addEventListener('gesturechange', e => e.preventDefault())
	document.addEventListener('gestured', e => e.preventDefault())

	const whiskasDisplay = document.querySelector('#whiskas-amount')
	const sessionCoinsDisplay = document.querySelector('.coin-collected')

	// Показати баланс whiskas з бази
	WhiskasService.getWhiskas().then(amount => {
		if (whiskasDisplay) whiskasDisplay.textContent = amount
	})

	// Показати, скільки зібрано за останню гру
	const collected = localStorage.getItem('coins_collected')
	if (collected !== null && sessionCoinsDisplay) {
		sessionCoinsDisplay.textContent = collected
		localStorage.removeItem('coins_collected')
	}
})
console.log(import.meta.env.VITE_SUPABASE_URL)
console.log(import.meta.env.VITE_SUPABASE_KEY)