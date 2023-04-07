<script setup lang="ts">
definePageMeta({ auth: false })

const { status, data, signOut, signIn } = useAuth()

const isAuthenticated = status.value === 'authenticated';
</script>

<template>
    <h1>Home</h1>
    <div v-if="isAuthenticated">
        <nuxt-link to="/profile">Profile</nuxt-link>
    </div>
    <div v-else>
        <button v-if="!isAuthenticated" @click="signIn()">Login</button>
        <nuxt-link to="/auth/register" is="button">Register</nuxt-link>
    </div>
</template>