<script setup lang="ts">
  useHead({
    title: "OS Fácil",
    meta: [
      {
        name: "description",
        content:
          "App gerador de os e orçamentos facilitando a vida dos prestadores de serviços.",
      },
    ],   
  });
</script>

<template>
  <div class="flex min-h-screen">
    <Navbar />
    <UContainer>
      <NuxtPage />
    </UContainer>
  </div>
</template>
