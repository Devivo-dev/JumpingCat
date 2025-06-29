// import { PlayerService } from './player.service'
// import { supabaseClient } from './supabase.client'

class Whiskas {
	constructor() {
		const { tg_id } = PlayerService.getCurrentPlayer()
		this.tg_id = tg_id
	}

	async getWhiskas() {
		const { data, error } = await supabaseClient
			.from('players')
			.select('whiskas')
			.eq('tg_id', this.tg_id)
			.single()

		if (error) {
			throw new Error('❌ Помилка при getWhiskas()')
		}

		return { data, error }
	}

	async updateWhiskas(amount) {
		const newWhiskasAmount = (await this.getWhiskas()) + amount

		const { error } = await supabaseClient
			.from('players')
			.update({ whiskas: newWhiskasAmount })

		return { error }
	}
}

export const WhiskasService = new Whiskas()
