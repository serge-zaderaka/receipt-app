<script lang="ts">
  import type { ChangeEventHandler } from 'svelte/elements';
  import {
    productsService,
    productsStore,
    productsTotal,
  } from 'src/stores/products.store';
  import type { Product } from 'src/utils/types';
  import Item from 'src/components/Item.svelte';

  let selectGroup = $state<Product['id'][]>([]);

  const handleDelete = () => {
    productsService.removeProducts(selectGroup);
    selectGroup = [];
  };

  const handleSelectAll: ChangeEventHandler<HTMLInputElement> = (e) => {
    selectGroup = e.currentTarget.checked
      ? $productsStore.map((p) => p.id)
      : [];
  };

  let priceEditId = $state(-1);
</script>

<svelte:window
  onkeydown={(e) => {
    switch (e.key) {
      case 'Escape':
      case 'Enter':
        priceEditId = -1;
        break;
    }
  }}
  onclick={() => (priceEditId = -1)}
/>

<div>
  <table class="receipt">
    <thead>
      <tr>
        <th class="check-all">
          {#if $productsStore.length}
            <input
              type="checkbox"
              name="all"
              onchange={handleSelectAll}
              checked={$productsStore.length === selectGroup.length}
            />
          {/if}
        </th>
        <th>Item</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Amount</th>
      </tr>
    </thead>

    <tbody>
      <!-- https://svelte.dev/docs/svelte/compiler-errors#each_item_invalid_assignment -->
      {#each $productsStore as { id, name }, i}
        {#snippet checkbox()}
          <input
            type="checkbox"
            name={`select-${id}`}
            value={id}
            bind:group={selectGroup}
          />
        {/snippet}

        <Item
          bind:price={$productsStore[i].price}
          bind:quantity={$productsStore[i].quantity}
          bind:priceEditId
          {id}
          {name}
          {checkbox}
        />
      {/each}
    </tbody>
  </table>

  <div class="total">
    <button onclick={handleDelete}>Remove selected</button>
    <p>Total: $ {($productsTotal || 0).toFixed(2)}</p>
  </div>
</div>
