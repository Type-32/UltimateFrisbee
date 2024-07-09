// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],

  modules: [
    "@nuxt/ui",
    "@nuxt/fonts",
    "nuxt-tiptap-editor",
    '@pinia/nuxt',
    "@nuxt/image",
    'nuxt-file-storage',
    "@nuxtjs/mdc"
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
      fileStorage: {
        mount: process.env.NUXT_STORAGE_PATH
      }
    },
    storageEndpoint: '',
    storagePort: 9000,
    storageSecretKey: '',
    storageAccessKey: '',
    storageUseSSL: true,
    storageName: ''
  },

  compatibilityDate: "2024-07-09"
})