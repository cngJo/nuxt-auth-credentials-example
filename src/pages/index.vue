<script setup lang="ts">
const { status, data, signOut, signIn } = useAuth()

const isAuthenticated = status.value === 'authenticated';
</script>

<template>
    <h1>Home</h1>
    <div v-if="isAuthenticated">
        <h2>Welcome {{ data?.user?.email }}</h2>
        <button @click="signOut()">Logout</button>
    </div>
    <div v-else>
        <button v-if="!isAuthenticated" @click="signIn()">Login</button>
        <nuxt-link to="/auth/register" is="button">Register</nuxt-link>
    </div>
</template>