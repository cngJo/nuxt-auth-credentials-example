<script setup lang="ts">
const { status, data, signOut, signIn } = useAuth()
</script>

<template>
    <button @click="signIn()">Login</button>
</template>