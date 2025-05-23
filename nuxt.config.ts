// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@vueuse/nuxt",
    /* "@scalar/nuxt", */
  ],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      CMOC_SERVER: process.env.CMOC_SERVER || ''
    }
  }
  /* nitro: {
    experimental: {
      openAPI: true,
    },
    openAPI: {
      production: "prerender",
      meta: {
        title: "CMOC Viewing Tool | API",
        description: "documentation for cmoc you know the drill",
        version: "2.0",
      },
    },
  },
  scalar: {
    searchHotKey: "k",
    metaData: {
      title: "API Documentation | CMOC Viewing Tool",
    },
    devtools: true
  }, */
});