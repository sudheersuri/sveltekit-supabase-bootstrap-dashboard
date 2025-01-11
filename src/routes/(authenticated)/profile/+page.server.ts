import { Fail } from "$lib/utils.js"

export const load = async ({ locals: { getSession } }) => {
  const session = await getSession()

  return { session }
}

export const actions = {
  update_profile: async ({ request, locals: { supabase } }) => {
    
    const formData = await request.formData()
    const nickname = formData.get('nickname') as string
    const phone = formData.get('phone') as string
    
    const { data, error } = await supabase.auth.updateUser({
      data: { nickname : nickname ?? '' },
      phone
    })

    if (error)
    {
      return Fail(error, { nickname, phone })
    }

    /* Refresh tokens, so we can display the new nickname. */
    if(nickname) {
      await supabase.auth.refreshSession()
    }
    return {message:'Successfully updated!',nickname};
  },
}
