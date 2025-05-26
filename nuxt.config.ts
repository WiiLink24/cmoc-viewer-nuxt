// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/icon", "@vueuse/nuxt"],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      CMOC_SERVER: process.env.CMOC_SERVER || "",
    },
  },
  nitro: {
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
      ui: {
        scalar: {
          route: "/docs",
          theme: "default",
          metaData: {
            title: "API Documentation | CMOC Viewing Tool",
          },
          customCss: `
            .light-mode {
  --scalar-color-1: #121212;
  --scalar-color-2: rgba(0, 0, 0, 0.6);
  --scalar-color-3: rgba(0, 0, 0, 0.4);
  --scalar-color-accent: #0a85d1;
  --scalar-background-1: #fff;
  --scalar-background-2: #f6f5f4;
  --scalar-background-3: #f1ede9;
  --scalar-background-accent: #5369d20f;
  --scalar-border-color: rgba(0, 0, 0, 0.08);
}
.dark-mode {
  --scalar-color-1: rgba(255, 255, 255, 0.81);
  --scalar-color-2: rgba(255, 255, 255, 0.443);
  --scalar-color-3: rgba(255, 255, 255, 0.282);
  --scalar-color-accent: #8ab4f8;
  --scalar-background-1: #202020;
  --scalar-background-2: #272727;
  --scalar-background-3: #333333;
  --scalar-background-accent: #8ab4f81f;
}

.light-mode .sidebar {
  --scalar-sidebar-background-1: var(--scalar-background-1);
  --scalar-sidebar-item-hover-color: currentColor;
  --scalar-sidebar-item-hover-background: var(--scalar-background-2);
  --scalar-sidebar-item-active-background: var(--scalar-background-2);
  --scalar-sidebar-border-color: var(--scalar-border-color);
  --scalar-sidebar-color-1: var(--scalar-color-1);
  --scalar-sidebar-color-2: var(--scalar-color-2);
  --scalar-sidebar-color-active: var(--scalar-color-2);
  --scalar-sidebar-search-background: var(--scalar-background-2);
  --scalar-sidebar-search-border-color: var(--scalar-border-color);
  --scalar-sidebar-search-color: var(--scalar-color-3);
}
.dark-mode .sidebar {
  --scalar-sidebar-background-1: var(--scalar-background-1);
  --scalar-sidebar-item-hover-color: currentColor;
  --scalar-sidebar-item-hover-background: var(--scalar-background-2);
  --scalar-sidebar-item-active-background: var(--scalar-background-2);
  --scalar-sidebar-border-color: var(--scalar-border-color);
  --scalar-sidebar-color-1: var(--scalar-color-1);
  --scalar-sidebar-color-2: var(--scalar-color-2);
  --scalar-sidebar-color-active: var(--scalar-color-2);
  --scalar-sidebar-search-background: var(--scalar-background-2);
  --scalar-sidebar-search-border-color: var(--scalar-border-color);
  --scalar-sidebar-search-color: var(--scalar-color-3);
}
          `,
        },
      },
    },
  },
});
