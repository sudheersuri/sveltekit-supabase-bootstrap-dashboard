<script>
  // @ts-nocheck
  //imports
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";

  //declarations
  let { data, form } = $props();
  let searchText = $state();
  let loading = $state(false);
  let closeAddModalBtn = $state(null);
  let closeEditModalBtn = $state(null);
  let openModalBtn = $state(null);
  let editingObj = $state(null);
  let sortField = $state("");
  let sortOrder = $state("asc");

  let filteredData = $derived.by(() => {
    return data.expenses.slice().sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  });
  
  const sortableColumns = ["activity", "amount"];


  //side effects
  $effect(() => {
    if (editingObj) {
      openModal();
    }
  });

  //functions
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options).replace(",", "");
  }

  function sortTable(field) {
    sortField = field;
    sortOrder = sortOrder === "asc" ? "desc" : "asc";
  }

  function closeEditModal() {
    closeEditModalBtn.click();
    if (editingObj) {
      editingObj = null;
    }
  }

  function openModal() {
    openModalBtn.click();
  }

  function toastBG(message) {
    if(message?.includes('deleted')){
      return 'bg-danger'
    }else{
      return 'bg-success'
    }
  }

  async function addFormHandler(f) {
    loading = true;
    await new Promise((res) => setTimeout(res, 200));
    return async ({ result, update }) => {
      if (result.data.status === 200) {
        closeAddModalBtn.click();
        searchText = "";
        await update();
        if(!filteredData?.length){
          goto("?page=1");
        }
      }
      loading = false;
    };
  }

  async function updateFormHandler(f){
        loading = true;
        await new Promise((res) => setTimeout(res, 200));
        return async ({ result, update }) => {
          if (result.data.status === 200) {
            closeEditModal();
            searchText = "";
            update();
          }
          loading = false;
        };
  }
</script>

<div
  class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  id="title"
>
  {@render toast()}
  <h1 class="h2">Home</h1>
  <div class="btn-toolbar mb-2 mb-md-0">
    <div class="btn-group me-2">
      <button type="button" class="btn btn-sm btn-outline-secondary"
        >Share</button
      >
      <button type="button" class="btn btn-sm btn-outline-secondary"
        >Export</button
      >
    </div>
    <button
      type="button"
      class="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1"
    >
      <i class="bi bi-calendar3"></i>
      This week
    </button>
  </div>
</div>

<div class="row"></div>

<div class="row">
  <p>
    This is the homepage of a simple responsive dashboard interface
  </p>
  <div class="row">
    <div class="col-12 mb-4 mb-lg-0">
      <div class="card">
        <h5 class="card-header">
          <div
            class="d-flex justify-content-between align-items-sm-center flex-column flex-sm-row"
          >
            <span class="pb-2 pb-sm-0">Expenses</span>
            <div class="d-flex w-auto">
              {@render searchBar()}
              <button
                class="btn btn-secondary btn-gradient btn-sm ms-2"
                data-bs-toggle="modal"
                data-bs-target="#newModal">Add</button
              >
            </div>
          </div>
        </h5>
        <div class="px-2">
          <div class="table-responsive min-height min-height-40-vh">
            <table class="table table-striped">
              <thead>
                <tr>
                  {#each ["activity", "amount", "date", "category", "description"] as header}
                    <th scope="col" onclick={() => sortTable(header)}>
                      {header.charAt(0).toUpperCase() + header.slice(1)}
                      {#if sortField === header && sortableColumns.includes(sortField)}
                        {sortOrder === "asc" ? "↑" : "↓"}
                      {/if}
                    </th>
                  {/each}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {#if !filteredData?.length}
                  <tr>
                    <td class="w-100 text-center text-secondary" colspan="100%"
                      >No search result found</td
                    >
                  </tr>
                {/if}
                {#each filteredData as expense (expense.id)}
                  <tr>
                    <td class="text-nowrap">{expense.activity}</td>
                    <td class="text-nowrap">${expense.amount}</td>
                    <td class="text-nowrap">{formatDate(expense.created_at)}</td
                    >
                    <td class="text-nowrap"
                      >Expense</td
                    >
                    <td class="text-nowrap">Save not shave</td>
                    <td>
                      {@render actions(expense)}
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
          {#if data.totalPagesArr?.length && data.currentPage}
            {@render pagination()}
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

{@render addModal()}
{#if editingObj}
  {@render editModal()}
{/if}

<!-- Snippets  -->
{#snippet searchBar()}
  <div class="input-group">
    <input
      type="text"
      name="searchText"
      bind:value={searchText}
      placeholder="Search and hit enter..."
      class="form-control shadow-none search-input"
      onkeydown={() => {
        if (event.key === "Enter") {
          if (searchText?.trim() !== "") {
            goto(`?search=${searchText?.trim()}`);
          }
          else {
            searchText = "";
            goto("?page=1");
          }
        }
      }}
    />
    {#if searchText}
      <button
        class="clear-button"
        type="button"
        aria-label="Clear search"
        onclick={() => {
          searchText = "";
          goto("?page=1");
        }}
      >
        <i class="bi bi-x"></i>
      </button>
    {/if}
  </div>
{/snippet}

{#snippet pagination()}
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end">
      <!-- Previous Button -->
      {#if data.currentPage > 1}
        <li class="page-item">
          <a
            class="page-link"
            href="?page={data.currentPage - 1}"
            aria-label="Previous"
          >
            Previous
          </a>
        </li>
      {:else}
        <li class="page-item disabled">
          <span class="page-link" aria-disabled="true">Previous</span>
        </li>
      {/if}

      <!-- Page Numbers -->
      {#each data.totalPagesArr as page}
        <li class="page-item {page === data.currentPage ? 'active' : ''}">
          <a
            class="page-link"
            href="?page={page}"
            data-sveltekit-preload-data="tap">{page}</a
          >
        </li>
      {/each}

      <!-- Next Button -->
      {#if data.currentPage < data.totalPagesArr.length}
        <li class="page-item">
          <a
            class="page-link"
            href="?page={data.currentPage + 1}"
            aria-label="Next"
          >
            Next
          </a>
        </li>
      {:else}
        <li class="page-item disabled">
          <span class="page-link" aria-disabled="true">Next</span>
        </li>
      {/if}
    </ul>
  </nav>
{/snippet}

{#snippet addModal()}
  <div
    class="modal fade"
    id="newModal"
    tabindex="-1"
    aria-labelledby="newModalLabel"
    aria-hidden="true"
  >
    <form
      use:enhance={addFormHandler}
      class="modal-dialog modal-dialog-centered"
      method="POST"
      action="?/add"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="newModalLabel">Add Expense</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            bind:this={closeAddModalBtn}
          ></button>
        </div>
        <div class="modal-body">
          <input
            name="activity"
            type="text"
            placeholder="Activity"
            class="form-control shadow-none"
            required
          />
          <input
            name="amount"
            type="number"
            step="0.01"
            placeholder="Amount"
            class="form-control mt-2"
            required
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal"
            ><i class="bi bi-x me-1"></i>Close</button
          >
          {#if !loading}
            <button type="submit" class="btn btn-success"
              ><i class="bi bi-check2 me-1"></i>Save changes</button
            >
          {:else}
            <button type="button" class="btn btn-success" disabled
              >{@render loader()}</button
            >
          {/if}
        </div>
      </div>
    </form>
  </div>
{/snippet}

{#snippet loader()}
  <div class="spinner-border spinner-border-sm text-light" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
{/snippet}

{#snippet toast()}
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div
      id="liveToast"
      class="toast toast-success border-0 {form?.status === 200 ? 'show' : 'hide'}"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-body d-flex justify-content-between">
        <strong class="me-auto">{form?.message}</strong>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
{/snippet}

{#snippet editModal()}
  <!-- svelte-ignore a11y_consider_explicit_label -->
  <button
    type="button"
    class="btn btn-sm m-0 p-0"
    data-bs-toggle="modal"
    data-bs-target="#editModal"
    bind:this={openModalBtn}
  ></button>
  <div
    class="modal fade"
    id="editModal"
    tabindex="-1"
    aria-labelledby="editModal"
    aria-hidden="true"
  >
    <form
      use:enhance={updateFormHandler}
      class="modal-dialog modal-dialog-centered"
      method="POST"
      action="?/update"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editModalLabel">Edit Expense</h5>
          <button
            type="button"
            class="btn-close d-none"
            data-bs-dismiss="modal"
            aria-label="Close"
            bind:this={closeEditModalBtn}
          ></button>
          <!-- svelte-ignore a11y_consider_explicit_label -->
          <button type="button" class="btn-close" onclick={closeEditModal}></button>
        </div>
        <div class="modal-body">
          <input type="hidden" name="id" value={editingObj?.id} />
          <input
            name="activity"
            type="text"
            value={editingObj?.activity}
            placeholder="Activity"
            class="form-control shadow-none"
            required
          />
          <input
            name="amount"
            type="number"
            step="0.01"
            placeholder="Amount"
            value={editingObj?.amount}
            class="form-control mt-2"
            required
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" onclick={closeEditModal}
            ><i class="bi bi-x me-1"></i>Close</button
          >
          {#if !loading}
            <button type="submit" class="btn btn-success"
              ><i class="bi bi-check2 me-1"></i>Save changes</button
            >
          {:else}
            <button type="button" class="btn btn-success" disabled
              >{@render loader()}</button
            >
          {/if}
        </div>
      </div>
    </form>
  </div>
{/snippet}

{#snippet actions(expense)}
  <div class="btn-group">
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button
      class="btn ellipsis-btn"
      type="button"
      id="defaultDropdown"
      data-bs-toggle="dropdown"
      data-bs-auto-close="true"
      aria-expanded="false"
    >
      <i class="bi bi-three-dots-vertical"></i>
    </button>
    <ul class="dropdown-menu p-0 m-0" aria-labelledby="defaultDropdown">
      <li>
        <button
          type="button"
          class="dropdown-item btn btn-sm"
          onclick={() => (editingObj = expense)}
          ><i class="bi bi-pencil me-2"></i>Edit</button
        >
      </li>
      <li>
        <form method="post" action="?/delete" class="dropdown-item" use:enhance>
          <input name="id" type="hidden" value={expense.id} />
          <button type="submit" class="btn btn-sm m-0 p-0 text-danger"
            ><i class="bi bi-trash me-2"></i>Delete</button
          >
        </form>
      </li>
    </ul>
  </div>
{/snippet}

<style>
  .ellipsis-btn {
    background: none;
    border: none;
    padding: 0;
    box-shadow: none;
    color: inherit;
  }

  /* Optional: Minimal dropdown menu styles */
  .dropdown-menu {
    min-width: auto;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  .min-height-40-vh {
    min-height: 40vh !important;
  }

  .input-group {
    position: relative;
  }

  .search-input {
    padding-right: 30px; /* Space for the 'X' button */
  }

  .clear-button {
    position: absolute;
    top: 50%;
    right: 0px; /* Adjust as per your design */
    transform: translateY(-50%);
    background: none;
    border: none;
    color: grey;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .clear-button:hover {
    color: darkgrey;
  }
</style>
