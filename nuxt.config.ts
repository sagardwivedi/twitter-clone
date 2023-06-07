// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    jwtAccessToken: process.env.JWT_ACCESS_TOKEN,
    jwtRefreshToken: process.env.JWT_REFRESH_TOKEN,
  },
  telemetry: false,
});
