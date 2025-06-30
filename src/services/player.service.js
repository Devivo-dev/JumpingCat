import { jwtVerify, SignJWT } from 'jose'
import Cookies from 'js-cookie'
import { supabaseClient } from './supabase.client'

class Player {
	constructor() {
		this.secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET)
	}
	async getCurrentPlayer() {
		if (typeof window !== 'undefined') {
			const user = window.Telegram?.WebApp?.initDataUnsafe?.user

			if (user && user.id) {
				return {
					tg_id: user.id.toString(),
					username:
						user.username?.trim() || user.first_name?.trim() || 'Anonymous'
				}
			} else if (Cookies.get('guest_id')) {
				const token = Cookies.get('guest_id')
				const guestPayload = await this.verifyPlayer(token)

				if (guestPayload?.tg_id) {
					const guest_id = guestPayload.tg_id
					const { data } = await supabaseClient
						.from('players')
						.select('username')
						.eq('tg_id', guest_id)
						.single()
					return {
						tg_id: guest_id,
						username: data?.username || 'Anonymous'
					}
				}
			}
		}

		return {
			tg_id: 'guest-' + Date.now(),
			username: 'Anonymous'
		}
	}

	async createPlayer() {
		const { tg_id, username } = await this.getCurrentPlayer()

		const { data: existing } = await supabaseClient
			.from('players')
			.select('tg_id')
			.eq('tg_id', tg_id)
			.single()

		if (!existing) {
			const { error } = await supabaseClient
				.from('players')
				.insert({ tg_id, username })

			if (error) return { error }
		}

		if (tg_id.includes('guest-')) {
			const tg_id_jwt = await new SignJWT({ tg_id })
				.setProtectedHeader({ alg: 'HS256' })
				.setIssuedAt()
				.setExpirationTime('1d')
				.sign(this.secret)

			Cookies.set('guest_id', tg_id_jwt, { path: '/', expires: 1 })
		}

		return { error: null }
	}

	async verifyPlayer(token) {
		try {
			const { payload } = await jwtVerify(token, this.secret)
			return payload
		} catch (err) {
			console.error('Invalid JWT:', err)
			return null
		}
	}
}

export const PlayerService = new Player()
