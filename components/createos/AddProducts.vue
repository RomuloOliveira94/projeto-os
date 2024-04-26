<script setup lang="ts">
  import type { Product } from "~/types/create-os";

  const props = defineProps<{
    showProduct: boolean;
    product: Product;
    handleAddProduct: () => void;
  }>();

  const showProduct = ref(props.showProduct);
</script>

<template>
  <h2 class="text-xl font-bold">Serviço</h2>
  <UButton
    v-if="!showProduct"
    class="w-fit mb-2"
    type="button"
    @click="showProduct = !showProduct"
    >Adicionar Serviço</UButton
  >

  <div class="grid md:grid-cols-2 gap-4" v-if="showProduct">
    <UFormGroup label="Modelo" name="productModel">
      <UInput v-model="product.model" />
    </UFormGroup>

    <UFormGroup class="col-span-2" label="detalhes" name="productDetails">
      <UTextarea v-model="product.details" />
    </UFormGroup>

    <div class="flex gap-4">
      <UButton
        class="bg-red-500 hover:bg-red-700 w-20"
        type="button"
        @click="showProduct = !showProduct"
        >Cancelar</UButton
      >
      <UButton type="button" @click="handleAddProduct()" class="w-20"
        >Adicionar</UButton
      >
    </div>
  </div>
</template>
