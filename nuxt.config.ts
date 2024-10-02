// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],

  colorMode: {
    preference: 'light'
  },

  modules: [
    "@nuxt/ui",
    "@nuxt/fonts",
    "nuxt-tiptap-editor",
    '@pinia/nuxt',
    "@nuxt/image",
    'nuxt-file-storage',
    "@nuxtjs/mdc",
    '@nuxt/icon'
  ],

  nitro: {
    storage: {
      'media': { driver: 'fs', base: './media' }
    }
  },

  // If you want to serve media files from a specific URL prefix
  routeRules: {
    '/media/**': { static: true }
  },

  fonts:{
    families: [
      { name: 'DM Sans', provider: 'google' }
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