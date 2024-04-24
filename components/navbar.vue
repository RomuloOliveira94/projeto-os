<script setup lang="ts">
  const store = useUserStore();
  callOnce(store.fetchUser);
</script>

<template>
  <nav class="bg-red-500 p-5">
    <h1 class="text-xl font-bold">{{ store.user.company }}</h1>
    <ul class="flex flex-col gap-3">
      <li>
        <ULink to="/">Home</ULink>
      </li>
      <li>
        <ULink to="/login">Login</ULink>
      </li>
      <li>
        <ULink to="/dashboard">Dashboard</ULink>
      </li>
    </ul>
  </nav>
</template>
