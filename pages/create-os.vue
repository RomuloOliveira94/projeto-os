<script setup lang="ts">
  import { string, objectAsync, email, minLength, type Input } from "valibot";
  import type { FormSubmitEvent } from "#ui/types";
  import type { Service } from "~/types/create-os";
  import { format } from "date-fns";

  const schema = objectAsync({
    customerName: string([minLength(1, "Nome do cliente é obrigatório")]),
    email: string([email("Invalid email")]),
    password: string([minLength(8, "Must be at least 8 characters")]),
  });

  type Schema = Input<typeof schema>;

  const state = reactive({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    customerNumber: "",
    customerEmail: "",
    customerCpfOrCnpj: "",
    customerCity: "",
    customerState: "",
    customerZipCode: "",
    customerProduct: "",
    serviceDateFrom: "",
    serviceDateTo: "",
    materials: "",
    observations: "",
    password: "",
  });

  const service = reactive<Service>({
    serviceName: "",
    serviceDescription: "",
    servicePrice: "",
  });

  const services = ref<Service[]>([
    {
      serviceName: "Serviço 1",
      serviceDescription: "Descrição do serviço 1",
      servicePrice: "100",
    },
    {
      serviceName: "Serviço 2",
      serviceDescription: "Descrição do serviço 2",
      servicePrice: "200",
    },
  ]);

  const showService = ref(false);

  const handleAddService = () => {
    services.value.push({
      serviceName: service.serviceName,
      serviceDescription: service.serviceDescription,
      servicePrice: service.servicePrice,
    });
    service.serviceName = "";
    service.serviceDescription = "";
    service.servicePrice = "";
    showService.value = false;
  };

  const removeService = (service: Service) => {
    services.value = services.value.filter((s) => s !== service);
  };

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data);
  }
</script>

<template>
  <h1 class="text-2xl font-bold pt-8">Criar nova OS</h1>
  <p class="text-md font-semibold my-2">
    Digite os dados do cliente e da ordem de serviço para criar uma nova ordem
    de serviço.
  </p>

  <section class="flex w-full">
    <UForm
      class="grid gap-2 w-full"
      :schema="schema"
      :state="state"
      @submit="onSubmit"
    >
      <h2 class="text-xl font-bold my-2">Dados do cliente</h2>
      <div class="grid gap-4 md:grid-cols-2 w-full">
        <UFormGroup label="Nome do cliente" name="customerName">
          <UInput v-model="state.customerName" />
        </UFormGroup>

        <UFormGroup label="CPF/CNPJ" name="customerCpfOrCnpj">
          <UInput v-model="state.customerCpfOrCnpj" />
        </UFormGroup>
      </div>

      <div class="grid gap-4 md:grid-cols-3 w-full">
        <UFormGroup label="Telefone" name="customerPhone">
          <UInput v-model="state.customerPhone" />
        </UFormGroup>

        <UFormGroup label="Endereço" name="customerAddress">
          <UInput v-model="state.customerAddress" />
        </UFormGroup>

        <UFormGroup label="Nº" name="customerNumber">
          <UInput v-model="state.customerAddress" />
        </UFormGroup>
      </div>

      <div class="grid gap-4 md:grid-cols-3 w-full">
        <UFormGroup label="CEP" name="customerZipCode">
          <UInput v-model="state.customerZipCode" />
        </UFormGroup>

        <UFormGroup label="Cidade" name="customerCity">
          <UInput v-model="state.customerCity" />
        </UFormGroup>

        <UFormGroup label="Estado" name="customerState">
          <USelect
            v-model="state.customerState"
            :options="states"
            option-attribute="label"
          />
        </UFormGroup>
      </div>

      <CreateosAddServices
        :showService="showService"
        :service="service"
        :handleAddService="handleAddService"
      />

      <CreateosServices
        :services="services"
        :service="service"
        :showService="showService"
        :removeService="removeService"
      />

      <div class="grid md:grid-cols-2 gap-4">
        <UFormGroup label="Ínicio do serviço" name="serviceDateFrom">
          <UInput v-model="state.serviceDateFrom" type="date" />
        </UFormGroup>

        <UFormGroup label="Fim do serviço" name="serviceDateTo">
          <UInput v-model="state.serviceDateTo" type="date" />
        </UFormGroup>
      </div>

      <UButton type="submit"> Submit </UButton>
    </UForm>
  </section>
</template>
