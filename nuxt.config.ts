// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  modules: [
    "@nuxt/ui",
    "@nuxt/fonts",
    "nuxt-tiptap-editor",
    '@pinia/nuxt',
    "@nuxt/image"
  ],
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
    },
    storageEndpoint: '',
    storagePort: 9000,
    storageSecretKey: '',
    storageAccessKey: '',
    storageUseSSL: true,
    storageName: ''
  }
})