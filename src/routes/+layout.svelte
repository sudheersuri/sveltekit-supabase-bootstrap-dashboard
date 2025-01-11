<script>
import { invalidate } from '$app/navigation'
let { data, children } = $props()
let { supabase, session } = $state(data);
$effect(() => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (event, _session) => {
    if (_session?.expires_at !== session?.expires_at) {
      invalidate('supabase:auth')
    }
  })

  return () => subscription.unsubscribe()
})</script>

{@render children()}
