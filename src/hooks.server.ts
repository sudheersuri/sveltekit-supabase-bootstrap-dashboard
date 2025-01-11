import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createServerClient } from '@supabase/ssr'
import { redirect, type Handle } from '@sveltejs/kit'
import { JWT_SECRET } from '$env/static/private'
import * as jose from 'jose'
import type { Session } from '@supabase/supabase-js'
import type { SupabaseJwt } from './types.js'

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => event.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) => {
            event.cookies.set(name, value, { ...options, path: '/' })
          })
        }
      }
    }
  )

  event.locals.getSession = async (): Promise<Session | null> => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()

    if (!session) return null

  
    try {
      const { payload: decoded }: { payload: SupabaseJwt } = await jose.jwtVerify(session.access_token, new TextEncoder().encode(JWT_SECRET))
      const validated_session: Session = {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_at: decoded.exp,
        expires_in: decoded.exp - Math.round(Date.now() / 1000),
        token_type: 'bearer',
        user: {
          app_metadata: decoded.app_metadata ?? {},
          aud: 'authenticated',
          created_at: '',
          id: decoded.sub,
          email: decoded.email,
          phone: decoded.phone,
          user_metadata: {
            avatar_url: decoded.user_metadata?.avatar_url,
            nickname: decoded.user_metadata?.nickname
          },
          is_anonymous: decoded.is_anonymous
        }
      }

      return validated_session
    } catch (err) {
      return null
    }
  }

  const session = await event.locals.getSession()

  const auth_protected_paths = new Set(['(authenticated)'])
  if(event.route.id === '/'){
    throw redirect(307, session  ? '/home' : '/auth');
  } 
  
  if (!session && auth_protected_paths.has(event.route.id?.split('/')[1] || '')) 
    throw redirect(307, '/auth')

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version'
    },
  })
}
