// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: "src",
    modules: [
        "@sidebase/nuxt-auth",
    ],
    auth: {
        enableGlobalAppMiddleware: true,
    }
})
