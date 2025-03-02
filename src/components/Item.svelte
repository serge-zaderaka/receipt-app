<script lang="ts">
  import { type Snippet } from 'svelte';
  import type { Product } from 'src/utils/types';
  import { stopPropagation } from 'src/utils/modifiers';

  type Props = Product & {
    checkbox: Snippet;
    priceEditId: number;
  };

  let {
    id,
    name,
    price = $bindable(),
    quantity = $bindable(),
    checkbox,
    priceEditId = $bindable(),
  }: Props = $props();
</script>

<tr>
  <td>
    {@render checkbox()}
  </td>
  <td>
    {name}
  </td>
  <td class="quantity">
    <input
      type="number"
      min="0"
      name={`quantity-${id}`}
      bind:value={quantity}
    />
  </td>
  <td onclick={stopPropagation()} class="price">
    {#if priceEditId === id}
      <input
        type="number"
        name={`price-${id}`}
        min="0"
        step="0.01"
        bind:value={price}
        onblur={() => (priceEditId = -1)}
      />
    {:else}
      <button onclick={() => (priceEditId = id)} title="Edit price">
        $ {price.toFixed(2)}
      </button>
    {/if}
  </td>
  <td class="amount">$ {(price * quantity).toFixed(2)}</td>
</tr>
