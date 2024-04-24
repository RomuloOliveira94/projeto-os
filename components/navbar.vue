<script setup lang="ts">
//pegar nome da empresa no estado global
</script>

<template>
  <h1>Nome da Empresa</h1>

  <nav class="bg-red-500 p-5">
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
