// import { supabaseClient } from './supabase.client'

// class Player {
// 	getCurrentPlayer() {
// 		if (typeof window !== 'undefined') {
// 			const user = window.Telegram?.WebApp?.initDataUnsafe?.user

// 			if (user && user.id) {
// 				return {
// 					tg_id: user.id.toString(),
// 					username:
// 						user.username?.trim() || user.first_name?.trim() || 'Anonymous'
// 				}
// 			}
// 		}

// 		return {
// 			tg_id: 'guest-' + Date.now(),
// 			username: 'Anonymous'
// 		}
// 	}

// 	async createPlayer() {
// 		const { tg_id, username } = this.getCurrentPlayer()
// 		const { error } = await supabaseClient
// 			.from('players')
// 			.insert({ tg_id: tg_id, username: username })

// 		return { error }
// 	}
// }

// export const PlayerService = new Player()
import { supabaseClient } from './supabase.client'

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

			// Гість (через браузер)
			let guestId = localStorage.getItem('guest_id')
			if (!guestId) {
				guestId = 'guest-' + Date.now()
				localStorage.setItem('guest_id', guestId)
			}

			return {
				tg_id: guestId,
				username: 'Anonymous'
			}
		}

		// Якщо window недоступне (наприклад SSR)
		return {
			tg_id: 'guest-server',
			username: 'Anonymous'
		}
	}

	async createPlayer() {
		const { tg_id, username } = this.getCurrentPlayer()

		// Перевірка — чи вже існує такий гравець
		const { data, error: selectError } = await supabaseClient
			.from('players')
			.select('tg_id')
			.eq('tg_id', tg_id)
			.single()

		if (selectError && selectError.code !== 'PGRST116') {
			// Якщо сталася помилка не через "немає рядків"
			throw new Error(`❌ Помилка при перевірці гравця: ${selectError.message}`)
		}

		if (!data) {
			// Якщо гравця немає — створюємо
			const { error: insertError } = await supabaseClient
				.from('players')
				.insert({ tg_id, username })

			if (insertError) {
				throw new Error(`❌ Помилка при створенні гравця: ${insertError.message}`)
			}
		}

		return { tg_id, username }
	}
}

export const PlayerService = new Player()
