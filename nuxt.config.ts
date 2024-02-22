// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  devtools: {
    enabled: false
  },

  config: {
    productionTip: false,
    devtools: false
  },

  modules: [
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Rubik: '300..900',
        }
      }
    ],
  ],

  googleFonts: {
    display: 'swap'
  },

  css: [
    "~/assets/styles/main.css"
  ],

  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@import "@/assets/styles/main.sass"',
        },
      },
    },
  },

  runtimeConfig: {
    weatherURL: process.env.WEATHER_URL,
    weatherApiKey: process.env.WEATHER_API_KEY
  }
})
