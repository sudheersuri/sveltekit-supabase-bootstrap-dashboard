import { redirect } from '@sveltejs/kit'
import { type Provider } from '@supabase/supabase-js'
import { Fail } from '$lib/utils.js'

export const load = async ({ locals: { getSession } }) => {
  const session = await getSession()

  /* User is already logged in. */
  if (session) redirect(303, '/home')
}

export const actions = {
  signup: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password)
      return Fail(
        { message: 'Please enter an email and password' }, 
        { email }
      )

    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error)
      return Fail(error, { email })
    else
      return { message: 'Please check your email to confirm your signup.' }
  },
  signin_email: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password)
      return Fail(
        { message: 'Please enter an email and password' }, 
        { email }
      )
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
  
    if (error)
      return Fail(error, { email })

    /* Login successful, redirect. */
    redirect(303, '/home')
  },
  reset: async({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string

    if (!email)
      return Fail({ message: 'Please enter an email.' })

    const { error } = await supabase.auth.resetPasswordForEmail(email)

    if (error)
      return Fail(error, { email })
    else
      return { message: 'Please check your email to reset your password.' }
  },
  signout: async ({ locals: { supabase } }) => {
    await supabase.auth.signOut()
    redirect(303, '/')
  }
}
