// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    baseURL: '/url-query-interactive/',
  },
  typescript: {
    shim: false,
    tsConfig: {
      compilerOptions: {
        types: ['unplugin-icons/types/vue'],
      },
    },
  },
  experimental: {
    inlineSSRStyles: false,
  },
  modules: [
    ['unplugin-icons/nuxt', {}],
    '@vueuse/nuxt',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `
                  @import "@/assets/styles/basic.less";
          `,
        },
      },
    },
  },
});
