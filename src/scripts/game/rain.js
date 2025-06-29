import { onGameOver } from './onGameOver.js'
import { state } from './state.js'

export function spawnRaindrop() {
	if (!state.running) return

	const cloud = document.querySelector('.game__cloud')
	const gameWindow = document.querySelector('.game__window')
	const player = document.querySelector('.game__player')

	if (!cloud || !gameWindow || !player) {
		console.warn('⛔️ Не знайдені елементи для spawnRaindrop')

		clearInterval(rainTimer)
		clearInterval(difficultyIncrease)

		return
	}

	const drop = document.createElement('div')
	drop.classList.add('drop')

	drop.style.setProperty('--fallSpeed', `${state.fallSpeed}s`)

	const cloudRect = cloud.getBoundingClientRect()
	const gameRect = gameWindow.getBoundingClientRect()
	const offsetX = Math.random() * cloud.offsetWidth
	const x = cloudRect.left - gameRect.left + offsetX
	const y = cloudRect.bottom - gameRect.top

	drop.style.left = `${x}px`
	drop.style.top = `${y}px`

	gameWindow.appendChild(drop)

	let frameId

	function checkCollision() {
		const dropRect = drop.getBoundingClientRect()
		const playerRect = player.getBoundingClientRect()
		const isHit = !(
			dropRect.right < playerRect.left ||
			dropRect.left > playerRect.right ||
			dropRect.bottom < playerRect.top ||
			dropRect.top > playerRect.bottom
		)

		if (isHit) {
			handleLifeLoss()
			drop.remove()
		} else {
			frameId = requestAnimationFrame(checkCollision)
		}
	}

	frameId = requestAnimationFrame(checkCollision)

	setTimeout(() => {
		drop.remove()
		cancelAnimationFrame(frameId)
	}, state.fallSpeed * 1000)
}

setInterval(() => {
	if (state.fallSpeed > 0.5) state.fallSpeed -= 0.1
}, 10000)

let rainInterval = 2000
let rainTimer
let difficultyIncrease = setInterval(() => {
	if (rainInterval > 500) {
		rainInterval -= 200
		clearInterval(rainTimer)
		rainTimer = setInterval(spawnRaindrop, rainInterval)
	}
}, 10000)

setTimeout(() => {
	rainTimer = setInterval(spawnRaindrop, rainInterval)
}, 2000)

export function handleLifeLoss() {
	state.lives--

	const lifeEls = [
		document.querySelector('.lifes__life--third'),
		document.querySelector('.lifes__life--second'),
		document.querySelector('.lifes__life--first')
	]

	if (state.lives >= 0) {
		lifeEls[state.lives].style.opacity = 0.3
	}

	if (state.lives === 0) {
		onGameOver(state.score) // scoreAmount = state.score
		document.querySelector('.modal--game-over').classList.remove('hidden')
		document.querySelector('.control__button--left').classList.add('disabled')
		document.querySelector('.control__button--right').classList.add('disabled')
		state.running = false
	}
}
