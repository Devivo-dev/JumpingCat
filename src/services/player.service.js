// import { supabaseClient } from './supabase.client'

class Player {
	getCurrentPlayer() {
		if (typeof window !== 'undefined') {
			const user = window.Telegram?.WebApp?.initDataUnsafe?.user

			if (user && user.id) {
				return {
					tg_id: user.id.toString(),
					username:
						user.username?.trim() || user.first_name?.trim() || 'Anonymous'
				}
			}
		}

		return {
			tg_id: 'guest-' + Date.now(),
			username: 'Anonymous'
		}
	}

	async createPlayer() {
		const { tg_id, username } = this.getCurrentPlayer()
		const { error } = await supabaseClient
			.from('players')
			.insert({ tg_id: tg_id, username: username })

		return { error }
	}
}

export const PlayerService = new Player()
