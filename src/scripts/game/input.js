//обробка кліків
import { moveLeft, moveRight } from './movement.js'

export function setupEventListeners() {
	document
		.querySelector('.control__button--left')
		.addEventListener('click', moveLeft)
	document
		.querySelector('.control__button--right')
		.addEventListener('click', moveRight)
	const retryBtn = document.querySelector('.modal__retry')

	retryBtn.addEventListener('click', () => {
		retryBtn.classList.add('active')

		setTimeout(() => {
			retryBtn.classList.remove('active')
		}, 150)
		setTimeout(() => {
			location.reload()
		}, 1000)
	})
}
