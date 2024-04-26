<script setup lang="ts">
  import type { Customer } from "~/types/create-os";
  defineProps<{
    searchCustomerInput: string;
    searchCustomers: Customer[];
    customersStore: {
      customers: Customer[];
    };
    handleAddCustomers: (id: string) => void;
  }>();
</script>
<template>
  <ul class="border p-3 mt-2" v-if="searchCustomers.length">
    <li class="p-2">
      Mostrando {{ searchCustomers.length }} de
      {{ customersStore.customers.length }} resultados.
    </li>
    <hr />
    <li
      class="grid p-2 hover:bg-slate-300 cursor-pointer"
      v-for="customer in searchCustomers"
      :key="customer.name"
      @click="handleAddCustomers(customer.id)"
    >
      {{ customer.name }}
    </li>
  </ul>
  <p
    class="my-1 text-sm font-semibold"
    v-if="!searchCustomers.length && searchCustomerInput !== ''"
  >
    Nenhum cliente encontrado.
  </p>
</template>
