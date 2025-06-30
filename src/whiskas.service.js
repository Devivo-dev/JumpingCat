// import { PlayerService } from './player.service'
// import { supabaseClient } from './supabase.client'

// class Whiskas {
// 	constructor() {
// 		const { tg_id } = PlayerService.getCurrentPlayer()
// 		this.tg_id = tg_id
// 	}

// 	async getWhiskas() {
// 		const { data, error } = await supabaseClient
// 			.from('players')
// 			.select('whiskas')
// 			.eq('tg_id', this.tg_id)
// 			.single()

// 		if (error) {
// 			throw new Error('❌ Помилка при getWhiskas()')
// 		}

// 		return { data, error }
// 	}

// 	async updateWhiskas(amount) {
// 		const newWhiskasAmount = (await this.getWhiskas()) + amount

// 		const { error } = await supabaseClient
// 			.from('players')
// 			.update({ whiskas: newWhiskasAmount })

// 		return { error }
// 	}
// }

// export const WhiskasService = new Whiskas()


import { supabase } from './supabase.js';

// ✅ Telegram ID + username
function getCurrentUser() {
  if (typeof window !== 'undefined') {
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;

    if (user && user.id) {
      return {
        tg_id: user.id.toString(),
        username: user.username?.trim() || user.first_name?.trim() || 'Anonymous'
      };
    }
  }

  return {
    tg_id: 'guest-' + Date.now(),
    username: 'Anonymous'
  };
}

// ✅ Зчитуємо або створюємо гравця
export async function getWhiskas() {
  const { tg_id, username } = getCurrentUser();

  // 🟢 Додаємо console.log для дебагу
  console.log('👤 getWhiskas()', { tg_id, username });

  // 🔁 Створюємо або оновлюємо username
  const { error: upsertError } = await supabase.from('players').upsert(
    { tg_id, username },
    { onConflict: ['tg_id'] }
  );

  if (upsertError) {
    console.warn('❌ Помилка при upsert:', upsertError);
    return 0;
  }

  // 🔄 Отримуємо whiskas
  const { data, error } = await supabase
    .from('players')
    .select('whiskas')
    .eq('tg_id', tg_id)
    .single();

  if (error) {
    console.warn('❌ Помилка при getWhiskas():', error);
    return 0;
  }

  return data?.whiskas ?? 0;
}

// ✅ Додаємо whiskas після гри
export async function updateWhiskas(addAmount) {
  const { tg_id } = getCurrentUser();
  const current = await getWhiskas(); // всередині теж getCurrentUser()
  const newTotal = current + addAmount;

  const { error } = await supabase
    .from('players')
    .update({ whiskas: newTotal })
    .eq('tg_id', tg_id);

  if (error) {
    console.warn('❌ Помилка при updateWhiskas():', error);
  } else {
    console.log('🟢 updateWhiskas()', tg_id, addAmount);
  }

  return newTotal;
}