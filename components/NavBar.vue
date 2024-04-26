<script setup lang="ts">
  onMounted(() => {
    if (window.innerWidth < 768) {
      show.value = false;
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        show.value = true;
      }

      if (window.innerWidth < 768) {
        show.value = false;
      }
    });
  });

  const route = useRoute();
  const store = useUserStore();
  const show = ref(true);
  await callOnce(store.fetchUser);
  const showMenu = () => {
    show.value = !show.value;
  };

  const isOnDashboard = computed(() => {
    return route.path !== "/" && route.path !== "/login";
  });
</script>

<template>
  <header
    v-if="isOnDashboard"
    class="bg-sky-400 flex flex-col text-slate-900 min-h-screen"
    :class="
      show ? 'min-w-[180px] p-2 md:p-4' : 'w-fit-content p-1 items-center'
    "
  >
    <span class="md:hidden">
      <Icon
        name="iconamoon:menu-burger-horizontal"
        @click="showMenu"
        class="cursor-pointer h-8 w-8"
        v-if="!show"
      />

      <Icon
        name="akar-icons:cross"
        @click="showMenu"
        class="cursor-pointer h-8 w-8"
        v-else
      />
    </span>
    <nav v-if="show" class="pt-8">
      <h1 class="text-xl font-bold pb-12">
        {{ store.user.company }}
      </h1>
      <ul class="flex flex-col gap-3">
        <li>
          <ULink to="/home">Home</ULink>
        </li>
        <li>
          <ULink to="/create-os">Criar OS</ULink>
        </li>
        <li>
          <ULink to="/create-budget">Criar Orçamento</ULink>
        </li>
        <hr class="border border-slate-900 bg-slate-900" />
        <li>
          <ULink to="/os">Ver OSs</ULink>
        </li>
        <li>
          <ULink to="/budget">Ver Orçamentos</ULink>
        </li>
        <hr class="border border-slate-900 bg-slate-900" />
        <li>
          <ULink to="/reports">Relatórios</ULink>
        </li>
        <li>
          <ULink to="/config">Configurações</ULink>
        </li>
      </ul>
    </nav>
    <nav v-else>
      <ul class="flex flex-col gap-3 pt-5">
        <li>
          <ULink to="/home"
            ><Icon name="ic:round-home" class="w-5 h-5"
          /></ULink>
        </li>
        <li>
          <ULink to="/create-os"
            ><Icon name="icon-park-outline:order" class="w-5 h-5"
          /></ULink>
        </li>
        <li>
          <ULink to="/create-budget"
            ><Icon name="f7:money-dollar" class="w-5 h-5"
          /></ULink>
        </li>
        <li>
          <ULink to="/os"
            ><Icon
              name="fluent:document-bullet-list-16-regular"
              class="w-5 h-5"
          /></ULink>
        </li>
        <li>
          <ULink to="/budget"
            ><Icon name="fluent:receipt-money-16-regular" class="w-5 h-5"
          /></ULink>
        </li>
        <li>
          <ULink to="/reports"
            ><Icon name="icon-park-outline:sales-report" class="w-5 h-5"
          /></ULink>
        </li>
        <li>
          <ULink to="/config"
            ><Icon name="icon-park-outline:config" class="w-5 h-5"
          /></ULink>
        </li>
      </ul>
    </nav>
  </header>
</template>
