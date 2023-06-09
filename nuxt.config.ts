// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/html-validator"],

  runtimeConfig: {
    jwtAccessToken: process.env.JWT_ACCESS_TOKEN,
    jwtRefreshToken: process.env.JWT_REFRESH_TOKEN,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  telemetry: false,

  devtools: {
    enabled: true,
  },
});
