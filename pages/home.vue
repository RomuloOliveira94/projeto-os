<script setup lang="ts">
  const store = useUserStore();
  await callOnce(store.fetchUser);
</script>

<template>
  <h1>Olá {{ store.user.name }}</h1>
</template>
