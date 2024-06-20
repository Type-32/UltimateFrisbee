// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  modules: ["@nuxt/ui", "@nuxt/fonts", "nuxt-tiptap-editor", '@pinia/nuxt'],
  fonts:{
    families: [
      { name: 'Inter', provider: 'google' }
    ]
  },
  tiptap: {
    prefix: "Tiptap", //prefix for Tiptap imports, composables not included
  },
  runtimeConfig: {
    public: {
      siteUrl: 'http://localhost:3000',
    }
  }
})