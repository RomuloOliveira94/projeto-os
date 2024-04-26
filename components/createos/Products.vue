<script setup lang="ts">
  import type { Product } from "~/types/create-os";
  defineProps<{
    products: Product[];
    showService: boolean;
    product: Product;
    removeProduct: (service: Product) => void;
  }>();
</script>

<template>
  <div
    v-if="products.length > 0"
    class="border min-w-full min-h-32 rounded-md px-2"
  >
    <ul class="grid gap-1 w-full">
      <div v-for="product in products" key="service">
        <li class="grid grid-cols-3">
          <span class="font-semibold">
            {{ product.model }}
          </span>
          <span class="text-start">
            {{ product.details }}
          </span>
          <span>
            <UButton
              type="button"
              class="bg-red-500 rounded-full w-fit"
              @click="removeProduct(product)"
              >X</UButton
            >
          </span>
        </li>
      </div>
    </ul>
  </div>
</template>
