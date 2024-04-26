<script setup lang="ts">
  import type { Service } from "~/types/create-os";
  const pros = defineProps<{
    services: Service[];
    showService: boolean;
    service: Service;
    removeService: (service: Service) => void;
  }>();
</script>

<template>
  <div
    v-if="services.length > 0"
    class="border min-w-full min-h-32 rounded-md px-2"
  >
    <ul class="grid gap-1 w-full">
      <div v-for="service in services" key="service">
        <li class="grid grid-cols-3">
          <span class="font-semibold">
            {{ service.serviceName }}
          </span>
          <span class="text-start">
            {{ service.serviceDescription }}
          </span>
          <span class="flex items-center justify-end gap-2 text-end">
            {{
              Number(service.servicePrice).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            }}
            <UButton
              type="button"
              class="bg-red-500 rounded-full w-fit"
              @click="removeService(service)"
              >X</UButton
            >
          </span>
        </li>
      </div>
    </ul>
  </div>
</template>
