import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  target: "server",
  modules: ["@nuxtjs/tailwindcss", "cookie-universal-nuxt"],
  css: ["@/assets/css/fonts/index.module.scss"],
  runtimeConfig: {
    public: {
      apiURL: "https://demo4.traccar.org",
    },
  },
});
