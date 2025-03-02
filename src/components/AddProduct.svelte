<script lang="ts">
  import type { EventHandler } from 'svelte/elements';
  import { preventDefault } from 'src/utils/modifiers';
  import { productsService } from 'src/stores/products.store';
  import { newProduct } from 'src/stores/new-product.store';

  const addProduct: EventHandler<SubmitEvent, HTMLFormElement> = () => {
    const name = $newProduct.name.trim();
    if (!name) return;
    productsService.addProduct(name, $newProduct.price);
    $newProduct = { name: '', price: 0 };
  };
</script>

<form onsubmit={preventDefault(addProduct)} class="add-product">
  <label>
    Item name:
    <input type="text" name="product" bind:value={$newProduct.name} />
  </label>
  <label>
    Price:
    <input
      type="number"
      name="price"
      min="0"
      step="0.01"
      bind:value={$newProduct.price}
    />
  </label>

  <button>Add</button>
</form>
