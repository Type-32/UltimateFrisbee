// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/fonts"],
  fonts:{
    families: [
      { name: 'Inter', provider: 'google' }
    ]
  }
})