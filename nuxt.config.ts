// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    // ...
    // '@nuxtjs/axios',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-icon'
  ],

  css: [
    '~/assets/css/main.css',
  ],
  autoImports: {
    dirs: ["./stores"],
  },
  // buildModules: [
  //   // Other build modules...
  // ],
})
