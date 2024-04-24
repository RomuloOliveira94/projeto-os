<script setup lang="ts">
  const layout = "dashboard";
  const store = useUserStore();
  callOnce(store.fetchUser);
</script>

<template>
  <NuxtLayout :name="layout">
    <h1>Olá {{ store.user.name }}</h1>
  </NuxtLayout>
</template>
