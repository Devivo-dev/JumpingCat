import { WhiskasService } from '../../services/whiskas.service.js'
import { state } from './state.js'

export async function onGameOver() {
	const coinsCollected = state.coins

	localStorage.setItem('whiskas-amount', coinsCollected.toString())

	await WhiskasService.updateWhiskas(coinsCollected)
	console.log('🟡 onGameOver() викликано')
}
