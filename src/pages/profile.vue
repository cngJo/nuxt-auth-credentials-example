<script setup lang="ts">
const { $client } = useNuxtApp();

const { data, signOut } = useAuth()
const {id: userId} = await $client.userId.query();
</script>

<template>
    <h1>Profile</h1>
    <h2>Welcome {{ data?.user?.email }}</h2>
    <ul>
        <li>UserID: {{ userId }}</li>
    </ul>
    <button @click="signOut({callbackUrl: '/'})">Logout</button>
</template>