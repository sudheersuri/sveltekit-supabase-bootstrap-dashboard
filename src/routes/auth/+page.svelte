<script lang="ts">
  //@ts-nocheck
  import { enhance } from "$app/forms";

  let { form } = $props();
  let activeTab = $state("login");
  let loading = $state(false);
  let formSuccess = $state(false);
  let formError = $state(false);
  let passwordDontMatch = $state(false);
  // Function to reset form statuses
  const resetFormMessages = () => {
    formError = false;
    formSuccess = false;
    passwordDontMatch = false;
  };

  // Watch for tab changes and reset form errors
  const switchTab = (tab: string) => {
    activeTab = tab;
    resetFormMessages();
  };

  function loginFormHandler(f) {
    loading = true;
    return ({ result, update }) => {
      loading = false;
      formSuccess = result?.type === 'success';
      formError = result?.type !== 'success';
      update();
    };
  }

  function registerFormHandler(f) {
    loading = true;
    const email = f?.formElement?.elements?.["email"]?.value;
    const password = f?.formElement?.elements?.["password"]?.value;
    const confirmPassword =
      f?.formElement?.elements?.["confirm_password"]?.value;
    if (password !== confirmPassword) {
      passwordDontMatch = true;
      f.cancel();
      loading = false;
    } else {
      passwordDontMatch = false;
    }
    return ({ result, update }) => {
      loading = false;
      formSuccess = result?.type === "success";
      formError = result?.type !== "success";
      update();
    };
  }
</script>

<div class="container d-flex justify-content-center align-items-center vh-100">
  <div class="card shadow p-4" style="max-width: 400px; width: 100%;">
    <ul class="nav nav-tabs mb-4">
      <li class="nav-item">
        <button
          class="nav-link {activeTab === 'login' ? 'active' : ''}"
          onclick={() => switchTab("login")}
        >
          Login
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link {activeTab === 'register' ? 'active' : ''}"
          onclick={() => switchTab("register")}
        >
          Register
        </button>
      </li>
    </ul>
    <!-- Login Tab -->
    {#if activeTab === "login"}
      <form
        method="POST"
        action="?/signin_email"
        use:enhance={loginFormHandler}
      >
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            class="form-control"
            placeholder="Enter your email"
            value={form?.data?.email ?? ""}
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            class="form-control"
            placeholder="Enter your password"
            required
          />
        </div>
        
        {#if !loading}
          <button type="submit" class="btn btn-primary w-100">Login</button>
        {:else}
          <button type="button" class="btn btn-primary w-100" disabled
            >{@render loader()}</button
          >
        {/if}
      </form>
    {/if}

    <!-- Register Tab -->
    {#if activeTab === "register"}
      <form method="POST" action="?/signup" use:enhance={registerFormHandler}>
        <div class="mb-3">
          <label for="registerEmail" class="form-label">Email</label>
          <input
            id="registerEmail"
            name="email"
            type="email"
            class="form-control"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="registerPassword" class="form-label">Password</label>
          <input
            id="registerPassword"
            name="password"
            type="password"
            class="form-control"
            placeholder="Enter your password"
            required
          />
        </div>
        <div class="mb-3">
          <label for="confirmPassword" class="form-label"
            >Confirm Password</label
          >
          <input
            id="confirmPassword"
            name="confirm_password"
            type="password"
            class="form-control"
            placeholder="Confirm your password"
            required
          />
        </div>
        {#if !loading}
          <button type="submit" class="btn btn-success w-100">Register</button>
        {:else}
          <button type="button" class="btn btn-success w-100" disabled
            >{@render loader()}</button
          >
        {/if}
      </form>
    {/if}
    {#if formSuccess && form?.message}
      <div class="alert alert-success mt-3 d-flex align-items-center">
        {form?.message}
      </div>
    {/if}
    {#if formError && form?.error}
      <div class="alert alert-danger mt-3 d-flex align-items-center">
        <i class="bi bi-exclamation-circle-fill text-danger me-2"></i>
        {form?.error}
      </div>
    {/if}
    {#if passwordDontMatch}
      <div class="alert alert-danger mt-3 d-flex align-items-center">
        <i class="bi bi-exclamation-circle-fill text-danger me-2"></i>
        Please make sure passwords match
      </div>
    {/if}
  </div>
</div>

{#snippet loader()}
  <div class="spinner-border spinner-border-sm text-light" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
{/snippet}
