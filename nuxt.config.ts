import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    baseURL: '/url-query-interactive/',
  },
  typescript: {
    shim: false,
    tsConfig: {
      compilerOptions: {
          types: ["unplugin-icons/types/vue"]
      }
    }
  },
  modules: [
    ['unplugin-icons/nuxt', {}],
    '@vueuse/nuxt',
  ],
});
