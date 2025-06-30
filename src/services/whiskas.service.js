import { PlayerService } from './player.service'
import { supabaseClient } from './supabase.client'

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
			throw new Error(`❌ Помилка при getWhiskas(): ${error.message}`)
		}

		return { data, error }
	}

	async updateWhiskas(amount) {
		const { data } = await this.getWhiskas()
		const newWhiskasAmount = data.whiskas + amount

		const { error } = await supabaseClient
			.from('players')
			.update({ whiskas: newWhiskasAmount })
			.eq('tg_id', this.tg_id)

		if (error) {
			throw new Error(`❌ Помилка при updateWhiskas(): ${error.message}`)
		}

		return { whiskas: newWhiskasAmount }
	}
}

export const WhiskasService = new Whiskas()
