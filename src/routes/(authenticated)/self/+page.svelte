<script lang="ts">
  let { data, form } = $props()

  let { session } = $state(data)
  const providers = session?.user.app_metadata.providers
  const has_email_provider = providers 
    ? providers.some((p: string) => p === 'email') 
    : session?.user.app_metadata.provider === 'email'
</script>
<!-- 
{#if session}
  <h2>Welcome to /self!</h2>
  <h3>User Information:</h3>
  <p style="margin-left: 10px;">ID: {session.user.id}</p>
  <p style="margin-left: 10px;">Email: {session.user.email || "not set"}</p>
  <p style="margin-left: 10px;">Phone Number: {session.user.phone || "not set"}</p>
  <p style="margin-left: 10px;">Nickname: {session.user.user_metadata.nickname || "not set"}</p>
  <form method="POST" action="?/delete_user">
    Delete a user by ID:
    <input name="user" type="text">
    <button style="margin-top: 12px;">Delete</button>
  </form>
  <form method="POST" action="?/update_nickname">
    Change your nickname:
    <input name="nickname" type="text" value={form?.data?.nickname ?? ""}>
    <button style="margin-top: 12px;">Update</button>
    <button formaction="?/delete_nickname" style="margin-top: 12px;">Delete</button>
  </form>
  <form method="POST" action="?/update_phone">
    Change your phone number:
    <input name="phone" type="text">
    <button style="margin-top: 12px;">Update</button>
  </form>
  {#if has_email_provider}
    <form method="POST" action="?/update_password">
      Change your password:
      <input name="password" type="password">
      <button style="margin-top: 12px;">Change</button>
    </form>
  {/if}
  {#if session.user.is_anonymous}
    <form method="POST" action="?/convert_provider">
      Convert to a permanent user:
      <button style="margin-top: 12px;" name="provider" value="github">Use GitHub auth</button>
    </form>
    <form method="POST" action="?/convert_email">
      Convert to a permanent user:
      <input name="email" type="email" placeholder="email">
      <input name="password" type="password" placeholder="password">
      <button style="margin-top: 12px;">Use email auth</button>
    </form>
  {/if}
{/if}

{#if form?.message}
  <p>{form.message}</p>
{/if}
{#if form?.error}
  <p style="color: red;">{form.error}</p>
{/if}
{#if form?.verify}
  <form method="POST" action="?/verify_otp">
    <input name="otp" placeholder={`OTP sent to ${form?.phone}`} type="text">
    <input name="phone" type="hidden" value={form?.phone}>
    <button style="margin-top: 12px;">Verify</button>
  </form>
{/if} -->



<div class="row">
  <h2>Section title</h2>
  <div class="table-responsive small">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Header</th>
          <th scope="col">Header</th>
          <th scope="col">Header</th>
          <th scope="col">Header</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1,001</td>
          <td>random</td>
          <td>data</td>
          <td>placeholder</td>
          <td>text</td>
        </tr>
        <tr>
          <td>1,002</td>
          <td>placeholder</td>
          <td>irrelevant</td>
          <td>visual</td>
          <td>layout</td>
        </tr>
        <tr>
          <td>1,003</td>
          <td>data</td>
          <td>rich</td>
          <td>dashboard</td>
          <td>tabular</td>
        </tr>
        <tr>
          <td>1,003</td>
          <td>information</td>
          <td>placeholder</td>
          <td>illustrative</td>
          <td>data</td>
        </tr>
        <tr>
          <td>1,004</td>
          <td>text</td>
          <td>random</td>
          <td>layout</td>
          <td>dashboard</td>
        </tr>
        <tr>
          <td>1,005</td>
          <td>dashboard</td>
          <td>irrelevant</td>
          <td>text</td>
          <td>placeholder</td>
        </tr>
        <tr>
          <td>1,006</td>
          <td>dashboard</td>
          <td>illustrative</td>
          <td>rich</td>
          <td>data</td>
        </tr>
        <tr>
          <td>1,007</td>
          <td>placeholder</td>
          <td>tabular</td>
          <td>information</td>
          <td>irrelevant</td>
        </tr>
        <tr>
          <td>1,008</td>
          <td>random</td>
          <td>data</td>
          <td>placeholder</td>
          <td>text</td>
        </tr>
        <tr>
          <td>1,009</td>
          <td>placeholder</td>
          <td>irrelevant</td>
          <td>visual</td>
          <td>layout</td>
        </tr>
        <tr>
          <td>1,010</td>
          <td>data</td>
          <td>rich</td>
          <td>dashboard</td>
          <td>tabular</td>
        </tr>
        <tr>
          <td>1,011</td>
          <td>information</td>
          <td>placeholder</td>
          <td>illustrative</td>
          <td>data</td>
        </tr>
        <tr>
          <td>1,012</td>
          <td>text</td>
          <td>placeholder</td>
          <td>layout</td>
          <td>dashboard</td>
        </tr>
        <tr>
          <td>1,013</td>
          <td>dashboard</td>
          <td>irrelevant</td>
          <td>text</td>
          <td>visual</td>
        </tr>
        <tr>
          <td>1,014</td>
          <td>dashboard</td>
          <td>illustrative</td>
          <td>rich</td>
          <td>data</td>
        </tr>
        <tr>
          <td>1,015</td>
          <td>random</td>
          <td>tabular</td>
          <td>information</td>
          <td>text</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="my-3 p-3 bg-body rounded shadow-sm">
  <h6 class="border-bottom pb-2 mb-0">Recent updates</h6>
  <div class="d-flex text-body-secondary pt-3">
    <svg
      class="bd-placeholder-img flex-shrink-0 me-2 rounded"
      width="32"
      height="32"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Placeholder: 32x32"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
      ><title>Placeholder</title><rect
        width="100%"
        height="100%"
        fill="#007bff"
      /><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg
    >
    <p class="pb-3 mb-0 small lh-sm border-bottom">
      <strong class="d-block text-gray-dark">@username</strong>
      Some representative placeholder content, with some information about this user.
      Imagine this being some sort of status update, perhaps?
    </p>
  </div>
  <div class="d-flex text-body-secondary pt-3">
    <svg
      class="bd-placeholder-img flex-shrink-0 me-2 rounded"
      width="32"
      height="32"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Placeholder: 32x32"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
      ><title>Placeholder</title><rect
        width="100%"
        height="100%"
        fill="#e83e8c"
      /><text x="50%" y="50%" fill="#e83e8c" dy=".3em">32x32</text></svg
    >
    <p class="pb-3 mb-0 small lh-sm border-bottom">
      <strong class="d-block text-gray-dark">@username</strong>
      Some more representative placeholder content, related to this other user. Another
      status update, perhaps.
    </p>
  </div>
  <div class="d-flex text-body-secondary pt-3">
    <svg
      class="bd-placeholder-img flex-shrink-0 me-2 rounded"
      width="32"
      height="32"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Placeholder: 32x32"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
      ><title>Placeholder</title><rect
        width="100%"
        height="100%"
        fill="#6f42c1"
      /><text x="50%" y="50%" fill="#6f42c1" dy=".3em">32x32</text></svg
    >
    <p class="pb-3 mb-0 small lh-sm border-bottom">
      <strong class="d-block text-gray-dark">@username</strong>
      This user also gets some representative placeholder content. Maybe they did
      something interesting, and you really want to highlight this in the recent
      updates.
    </p>
  </div>
  <small class="d-block text-end mt-3">
    <a href="#">All updates</a>
  </small>
</div>

<div class="my-3 p-3 bg-body rounded shadow-sm">
  <h6 class="border-bottom pb-2 mb-0">Suggestions</h6>
  <div class="d-flex text-body-secondary pt-3">
    <svg
      class="bd-placeholder-img flex-shrink-0 me-2 rounded"
      width="32"
      height="32"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Placeholder: 32x32"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
      ><title>Placeholder</title><rect
        width="100%"
        height="100%"
        fill="#007bff"
      /><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg
    >
    <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
      <div class="d-flex justify-content-between">
        <strong class="text-gray-dark">Full Name</strong>
        <a href="#">Follow</a>
      </div>
      <span class="d-block">@username</span>
    </div>
  </div>
  <div class="d-flex text-body-secondary pt-3">
    <svg
      class="bd-placeholder-img flex-shrink-0 me-2 rounded"
      width="32"
      height="32"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Placeholder: 32x32"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
      ><title>Placeholder</title><rect
        width="100%"
        height="100%"
        fill="#007bff"
      /><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg
    >
    <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
      <div class="d-flex justify-content-between">
        <strong class="text-gray-dark">Full Name</strong>
        <a href="#">Follow</a>
      </div>
      <span class="d-block">@username</span>
    </div>
  </div>
  <div class="d-flex text-body-secondary pt-3">
    <svg
      class="bd-placeholder-img flex-shrink-0 me-2 rounded"
      width="32"
      height="32"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Placeholder: 32x32"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
      ><title>Placeholder</title><rect
        width="100%"
        height="100%"
        fill="#007bff"
      /><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg
    >
    <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
      <div class="d-flex justify-content-between">
        <strong class="text-gray-dark">Full Name</strong>
        <a href="#">Follow</a>
      </div>
      <span class="d-block">@username</span>
    </div>
  </div>
  <small class="d-block text-end mt-3">
    <a href="#">All suggestions</a>
  </small>
</div>

<div class="row">
  <footer class="pt-5 d-flex justify-content-between">
    <span
      >Copyright © 2019-2020 <a href="https://themesberg.com">Themesberg</a
      ></span
    >
    <ul class="nav m-0">
      <li class="nav-item">
        <a class="nav-link text-secondary" aria-current="page" href="#"
          >Privacy Policy</a
        >
      </li>
      <li class="nav-item">
        <a class="nav-link text-secondary" href="#">Terms and conditions</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-secondary" href="#">Contact</a>
      </li>
    </ul>
  </footer>
</div>
