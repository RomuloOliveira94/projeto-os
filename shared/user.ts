interface User {
  name: string;
  company: string;
  age: number;
  role: string;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {} as User,
  }),
  actions: {
    async fetchUser() {
      const user = await fetchUser();
      this.user = user;
    },
  },
});
async function fetchUser(): Promise<User> {
  return new Promise(async (resolve) => {
    setTimeout(async () => {
      resolve({
        name: "Rômetas",
        company: "Nuxt",
        age: 30,
        role: "Developer",
      });
    }, 500);
  });
}
