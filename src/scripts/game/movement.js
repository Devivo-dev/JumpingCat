//логіка руху персонажа
import { state } from './state.js'

function getAdaptiveSpeed() {
	const width = window.innerWidth
	if (width < 400) return 2 // телефони
	if (width < 768) return 5 // планшети
	return 4 // великі монітори
}
function getAdaptiveHeight() {
	const width = window.innerWidth
	if (width < 400) return 7 // телефони
	if (width < 768) return 10 // планшети
	return 10 // великі монітори
}
const speed = getAdaptiveSpeed()
const height = getAdaptiveHeight()

export function moveLeft() {
	if (!state.running) return
	state.velocityY = -height
	state.velocityX = -speed
	state.score++
	document.querySelector('.control__button--left').classList.add('active')
	setTimeout(() => {
		document.querySelector('.control__button--left').classList.remove('active')
	}, 150)
	document.querySelector('.game__player').style.transform = 'scaleX(-1)'
}

export function moveRight() {
	if (!state.running) return
	state.velocityY = -height
	state.velocityX = speed
	state.score++
	document.querySelector('.control__button--right').classList.add('active')
	setTimeout(() => {
		document.querySelector('.control__button--right').classList.remove('active')
	}, 150)
	document.querySelector('.game__player').style.transform = 'scaleX(1)'
}

// const retryBtn = document.querySelector('.retry-btn');
// retryBtn.addEventListener("click", () => {
//   retryBtn.classList.add("active");

//   setTimeout(() => {
//     retryBtn.classList.remove("active");
//     document.querySelector(".modal").classList.add("hidden");
//     location.reload();
//   }, 250);
// });
window.addEventListener('DOMContentLoaded', () => {
	const retryBtn = document.querySelector('.retry-btn')
	if (retryBtn) {
		retryBtn.addEventListener('click', () => {
			retryBtn.classList.add('active')

			setTimeout(() => {
				retryBtn.classList.remove('active')
				document.querySelector('.modal').classList.add('hidden')
				location.reload()
			}, 250)
		})
	}
})
