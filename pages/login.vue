<script setup lang="ts">
  import { string, objectAsync, email, minLength, type Input } from "valibot";
  import type { FormSubmitEvent } from "#ui/types";

  const router = useRouter();

  const schema = objectAsync({
    email: string([email("Email Inválido")]),
    password: string([minLength(1, "Digite sua senha.")]),
  });

  type Schema = Input<typeof schema>;

  const state = reactive({
    email: "",
    password: "",
  });

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    //chamada da api de login
    if (event.data.email === "r@r.com" && event.data.password === "123") {
      router.push("/home");
    } else {
      alert("Usuário ou senha inválidos");
    }
    console.log(event.data);
  }
</script>

<template>
  <UContainer
    class="flex flex-col items-center justify-center gap-2 min-h-screen"
  >
    <h1 class="text-2xl font-bold">Entrar no sistema</h1>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <UButton type="submit"> Entrar </UButton>
    </UForm>
  </UContainer>
</template>
