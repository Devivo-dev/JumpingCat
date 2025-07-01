import { PlayerService } from './player.service'
import { supabaseClient } from './supabase.client'

class Whiskas {
	constructor() {}

	async getWhiskas() {
		const { tg_id } = await PlayerService.getCurrentPlayer()
		const { data, error } = await supabaseClient
			.from('players')
			.select('whiskas')
			.eq('tg_id', tg_id)
			.single()

		if (error) {
			throw new Error('❌ Помилка при getWhiskas()')
		}

		return { data, error }
	}

	async updateWhiskas(amount) {
		const { data } = await this.getWhiskas()
		const newWhiskasAmount = data?.whiskas + amount
		const { tg_id } = await PlayerService.getCurrentPlayer()
		const { error } = await supabaseClient
			.from('players')
			.update({ whiskas: newWhiskasAmount })
			.eq('tg_id', tg_id)

		if (error) {
			throw new Error('❌ Помилка при updateWhiskas()')
		}

		return { error }
	}
}

export const WhiskasService = new Whiskas()