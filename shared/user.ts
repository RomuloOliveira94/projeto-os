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
function fetchUser(): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "Eduardo", company: "Nuxt", age: 30, role: "Developer" });
    }, 1000);
  });
}
