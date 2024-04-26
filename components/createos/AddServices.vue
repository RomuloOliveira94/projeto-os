<script setup lang="ts">
  import type { Service } from "~/types/create-os";

  const props = defineProps<{
    showService: boolean;
    service: Service;
    handleAddService: () => void;
  }>();

  const showService = ref(props.showService);

  const handleAdd = () => {
    props.handleAddService();
    showService.value = !showService.value;
  };
</script>

<template>
  <h2 class="text-xl font-bold">Serviço</h2>
  <UButton
    v-if="!showService"
    class="w-fit mb-2"
    type="button"
    @click="showService = !showService"
    >Adicionar Serviço</UButton
  >

  <div class="grid md:grid-cols-2 gap-4" v-if="showService">
    <UFormGroup label="Serviço" name="serviceName">
      <UInput v-model="service.serviceName" />
    </UFormGroup>

    <UFormGroup label="Valor" name="servicePrice">
      <UInput
        v-maska
        data-maska="R$ 0,99"
        data-maska-tokens="0:\d:multiple|9:\d:optional"
        v-model="service.servicePrice"
      />
    </UFormGroup>

    <UFormGroup class="col-span-2" label="Descrição" name="serviceDescription">
      <UTextarea v-model="service.serviceDescription" />
    </UFormGroup>

    <div class="flex gap-4">
      <UButton
        class="bg-red-500 hover:bg-red-700 w-20"
        type="button"
        @click="showService = !showService"
        >Cancelar</UButton
      >
      <UButton type="button" @click="handleAdd" class="w-20">Adicionar</UButton>
    </div>
  </div>
</template>
