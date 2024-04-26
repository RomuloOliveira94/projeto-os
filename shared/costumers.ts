interface Costumer {
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

export const useCostumerStore = defineStore("costumer", {
  state: () => ({
    customers: [] as Costumer[],
  }),
  actions: {
    async fetchCostumers() {
      const costumers = await fetchCostumers();
      this.customers = costumers;
    },
  },
});

async function fetchCostumers(): Promise<Costumer[]> {
  return new Promise(async (resolve) => {
    setTimeout(async () => {
      resolve([
        {
          id: "1",
          name: "Cliente 1",
          phone: "999999999",
          address: "Rua 1",
          neighborhood: "Bairro 1",
          city: "Cidade 1",
          state: "SP",
          zipCode: "12345-678",
          number: "123",
          email: "",
          cpfOrCnpj: "123.456.789-00",
        },
        {
          id: "2",
          name: "Cliente 2",
          phone: "888888888",
          address: "Rua 2",
          neighborhood: "Bairro 2",
          city: "Cidade 2",
          state: "CE",
          zipCode: "12345-678",
          number: "456",
          email: "",
          cpfOrCnpj: "123.456.789-00",
        },
      ]);
    }, 500);
  });
}
