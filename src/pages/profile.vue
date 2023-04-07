<script setup lang="ts">
const { status, data, signOut } = useAuth()

</script>

<template>
    <h1>Profile</h1>
    <h2>Welcome {{ data?.user?.email }}</h2>
    <button @click="signOut({callbackUrl: '/'})">Logout</button>
</template>