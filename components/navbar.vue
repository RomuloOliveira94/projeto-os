<script setup lang="ts">
  const store = useUserStore();
  const show = ref(true);
  callOnce(store.fetchUser);
  const showMenu = () => {
    show.value = !show.value;
  };
</script>

<template>
  <header class="relative">
    <div
      class="bg-sky-400 min-h-screen flex flex-col"
      :class="show ? 'min-w-[180px] p-2' : 'w-fit-content p-1 items-center'"
    >
      <Icon
        name="iconamoon:menu-burger-horizontal"
        @click="showMenu"
        class="block md:hidden cursor-pointer h-10 w-10 self-start items-start"
      />
      <nav v-if="show" class="pt-8">
        <h1 class="text-xl font-bold pb-12">
          {{ store.user.company }}
        </h1>
        <ul class="flex flex-col gap-3">
          <li>
            <ULink to="/">Home</ULink>
          </li>
          <li>
            <ULink to="/criar-os">Criar OS</ULink>
          </li>
          <li>
            <ULink to="/criar-orçamento">Criar Orçamento</ULink>
          </li>
          <hr />
          <li>
            <ULink to="/os">Ver OSs</ULink>
          </li>
          <li>
            <ULink to="/orçamentos">Ver Orçamentos</ULink>
          </li>
          <hr />
          <li>
            <ULink to="/relatorios">Relatórios</ULink>
          </li>
          <li>
            <ULink to="/config">Configurações</ULink>
          </li>
        </ul>
      </nav>
      <nav v-else>
        <ul class="flex flex-col gap-3 pt-5">
          <li>
            <ULink to="/"><Icon name="ic:round-home" class="w-5 h-5" /></ULink>
          </li>
          <li>
            <ULink to="/criar-os"
              ><Icon name="ic:round-home" class="w-5 h-5"
            /></ULink>
          </li>
          <li>
            <ULink to="/criar-orçamento"
              ><Icon name="ic:round-home" class="w-5 h-5"
            /></ULink>
          </li>
          <li>
            <ULink to="/os"
              ><Icon name="ic:round-home" class="w-5 h-5"
            /></ULink>
          </li>
          <li>
            <ULink to="/orçamentos"
              ><Icon name="ic:round-home" class="w-5 h-5"
            /></ULink>
          </li>
          <li>
            <ULink to="/relatorios"
              ><Icon name="ic:round-home" class="w-5 h-5"
            /></ULink>
          </li>
          <li>
            <ULink to="/config"
              ><Icon name="ic:round-home" class="w-5 h-5"
            /></ULink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
