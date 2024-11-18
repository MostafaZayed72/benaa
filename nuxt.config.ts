// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    '@nuxt/icon',
    'nuxt-swiper',
    'vuetify-nuxt-module',
  ],
  primevue: {
    options: {
        theme: {
            preset: Aura
        }
    }
},
  i18n: {
    lazy: true,
    langDir: "locales",
    strategy:"no_prefix",
    locales: [
      {
        code: 'en-US',
        iso: 'en-US',
        name: 'English',
        file: "en-US.json",
        dir: 'ltr'
      },
      {
        code: 'ar-AR',
        iso: 'ar-AR',
        name: 'Arabic',
        file: "ar-AR.json",
        dir: 'rtl'
      },
    ],
    defaultLocale: 'ar-AR',

  },

})