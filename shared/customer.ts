interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  neighborhood: string;
  number: string;
  zipCode: string;
  email: string;
  cpfOrCnpj?: string;
  city: string;
  state: string;
}

export const useCustomersStore = defineStore("customers", {
  state: () => ({
    customers: [] as Customer[],
  }),
  actions: {
    async fetchCustomers() {
      const customers = await fetchCustomers();
      this.customers = customers;
    },
  },
});

async function fetchCustomers(): Promise<Customer[]> {
  return new Promise(async (resolve) => {
    setTimeout(async () => {
      resolve([
        {
          id: "1",
          name: "Cliente 1",
          phone: "85981221275",
          address: "Rua 1",
          neighborhood: "Bairro 1",
          city: "Cidade 1",
          state: "SP",
          zipCode: "12345-678",
          number: "123",
          email: "teste@teste.com",
          cpfOrCnpj: "123.456.789-00",
        },
        {
          id: "2",
          name: "Cliente 2",
          phone: "85981221275",
          address: "Rua 2",
          neighborhood: "Bairro 2",
          city: "Cidade 2",
          state: "CE",
          zipCode: "12345-678",
          number: "456",
          email: "teste@teste.com",
          cpfOrCnpj: "123.456.789-00",
        },
      ]);
    }, 500);
  });
}
