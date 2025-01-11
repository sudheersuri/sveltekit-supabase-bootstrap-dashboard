<script lang="ts">
  //@ts-nocheck
  import { enhance } from '$app/forms';

  let { data, form } = $props();
  let loading = $state(false);
  let { session } = $state(data);
  
  const providers = session?.user.app_metadata.providers;
  const has_email_provider = providers
    ? providers.some((p: string) => p === "email")
    : session?.user.app_metadata.provider === "email";

  function getNickName() {
    return form?.nickname ?? session?.user?.user_metadata?.nickname;
  }
  function updateProfileFormHandler(f){
      loading = true;
      return ({result,update}) => {
        loading= false;
        update();
      }
  } 
</script>


{#if session}
  <div class="container py-4 min-vh-100">
    <div class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-4">
      <h1 class="h3">Profile</h1>
    </div>

    <div class="row mb-2">
      <div class="col-12 col-sm-4">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input type="text" id="email" class="form-control" disabled value={session.user.email || "not set"} />
        </div>
      </div>
    </div>
   <div class="row">
    <div class="col-sm-4 col-12">
    <form method="POST" action="?/update_profile" class="mb-3" use:enhance={updateProfileFormHandler}>
      <div class="form-group mb-2">
        <label for="new-nickname" class="form-label">Nickname</label>
        <input type="text" id="new-nickname" name="nickname" class="form-control" placeholder="Enter nick name" value={getNickName()} />
      </div>
      {#if form?.message}
        <div class="alert alert-success mt-1" role="alert">
          {form.message}
        </div>
      {/if}
      {#if form?.error}
        <div class="alert alert-danger mt-1" role="alert">
          {form.error}
        </div>
      {/if}

          {#if !loading}  
            <button class="btn btn-secondary mt-1">Save</button>
          {:else}
            <button type="button" class="btn btn-secondary mt-1" disabled
              >{@render loader()}</button
            >
          {/if}
      
    
    </div>
    </div>
  </div>
{/if}

{#snippet loader()}
  <div class="spinner-border spinner-border-sm text-light" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
{/snippet}