// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt", "nuxt-icon", "@nuxtjs/tailwindcss"],
  pinia: {
    storesDirs: ["~/shared/**", "./shared/**"],
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: "teste123",
    // Keys within public are also exposed client-side
    public: {
      apiBase: "/api",
    },
  },
});
