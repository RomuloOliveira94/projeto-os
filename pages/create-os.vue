<script setup lang="ts">
  import { string, objectAsync, email, minLength, type Input } from "valibot";
  import type { FormSubmitEvent } from "#ui/types";
  import type { Customer, Product, Service } from "~/types/create-os";

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
    customerNeighborhood: "",
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

  const product = reactive<Product>({
    model: "",
    details: "",
  });

  const products = ref<Product[]>([
    {
      model: "Produto 1",
      details: "Detalhes do produto 1",
    },
    {
      model: "Produto 2",
      details: "Detalhes do produto 2",
    },
  ]);

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
  const showProduct = ref(false);

  const customersStore = useCustomersStore();

  await callOnce(customersStore.fetchCustomers);

  const searchCustomerInput = ref("");
  const searchCustomers = computed(() => {
    if (searchCustomerInput.value === "") {
      return [];
    }

    let matches = 0;

    return customersStore.customers.filter((customer) => {
      if (
        customer.name
          .toLowerCase()
          .includes(searchCustomerInput.value.toLowerCase()) &&
        matches < 10
      ) {
        matches++;
        return customer;
      }
    });
  });

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

  const handleAddProduct = () => {
    products.value.push({
      model: product.model,
      details: product.details,
    });
    product.model = "";
    product.details = "";
    showProduct.value = false;
  };

  const handleAddCustomers = (customersId: string) => {
    const customers = customersStore.customers.find(
      (c) => c.id === customersId
    );
    state.customerName = customers?.name || "";
    state.customerPhone = customers?.phone || "";
    state.customerAddress = customers?.address || "";
    state.customerNumber = customers?.number || "";
    state.customerNeighborhood = customers?.neighborhood || "";
    state.customerEmail = customers?.email || "";
    state.customerCpfOrCnpj = customers?.cpfOrCnpj || "";
    state.customerCity = customers?.city || "";
    state.customerState = customers?.state || "";
    state.customerZipCode = customers?.zipCode || "";
    searchCustomerInput.value = "";
  };

  const removeService = (service: Service) => {
    services.value = services.value.filter((s) => s !== service);
  };

  const removeProduct = (product: Product) => {
    products.value = products.value.filter((p) => p !== product);
  };

  const total = computed(() => {
    return services.value
      .reduce((acc, service) => {
        return acc + Number(service.servicePrice);
      }, 0)
      .toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
  });

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
      class="grid gap-4 xl:w-screen"
      :schema="schema"
      :state="state"
      @submit="onSubmit"
    >
      <h2 class="text-xl font-bold">Dados do cliente</h2>

      <UFormGroup
        label="Pesquisar clientes cadastrados:"
        name="selectedCustomer"
      >
        <UInput v-model="searchCustomerInput" type="text" />
        <CreateosCustomerSearch
          :searchCustomerInput="searchCustomerInput"
          :searchCustomers="searchCustomers"
          :customersStore="customersStore"
          :handleAddCustomers="handleAddCustomers"
        />
      </UFormGroup>

      <div class="grid gap-4 md:grid-cols-3 w-full">
        <UFormGroup label="Nome do cliente" name="customerName">
          <UInput v-model="state.customerName" />
        </UFormGroup>

        <UFormGroup label="CPF/CNPJ" name="customerCpfOrCnpj">
          <UInput v-model="state.customerCpfOrCnpj" />
        </UFormGroup>
        <UFormGroup label="Telefone" name="customerPhone">
          <UInput v-model="state.customerPhone" />
        </UFormGroup>
      </div>

      <div class="grid gap-4 md:grid-cols-3 w-full">
        <UFormGroup class="flex-1" label="Endereço" name="customerAddress">
          <UInput v-model="state.customerAddress" />
        </UFormGroup>

        <UFormGroup label="Nº" name="customerNumber">
          <UInput v-model="state.customerNumber" />
        </UFormGroup>

        <UFormGroup label="Bairro" name="customerNeighborhood">
          <UInput v-model="state.customerNeighborhood" />
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

      <CreateosAddProducts
        :showProduct="showProduct"
        :product="product"
        :handleAddProduct="handleAddProduct"
      />

      <CreateosProducts
        :products="products"
        :product="product"
        :showProduct="showProduct"
        :removeProduct="removeProduct"
      />

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

        <UFormGroup label="Fim do serviço (previsão)" name="serviceDateTo">
          <UInput v-model="state.serviceDateTo" type="date" />
        </UFormGroup>
      </div>

      <UFormGroup label="Observações" name="observations">
        <UTextarea
          placeholder="Adicione observações aqui"
          v-model="state.observations"
        />
      </UFormGroup>

      <div class="w-full text-end">
        <span class="text-end text-xl font-bold">Valor: {{ total }}</span>
      </div>

      <div class="flex justify-center">
        <UButton
          type="submit"
          class="text-2xl w-44 flex items-center justify-center gap-4"
        >
          <span>Criar OS</span>
          <Icon name="icon-park-outline:order" class="w-5 h-5" />
        </UButton>
      </div>
    </UForm>
  </section>
</template>
