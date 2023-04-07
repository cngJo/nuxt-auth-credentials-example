<script lang="ts" setup>
definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    }
})

const { $client } = useNuxtApp();
const { signIn } = useAuth();

const userData = ref<{email: string, password: string, passwordConfirm: string}>({
    email: "",
    password: "",
    passwordConfirm: "",
});

const onSubmit = async () => {
    // FIXME: Replace error handling with useMutation
    //          See: https://github.com/wobsoriano/trpc-nuxt/issues/57 
    $client.registerUser.mutate(userData.value)
        .catch(() => alert("Could not create user"))
        .then(() => {
            const user = userData.value;

            signIn("credentials", {
                email: user.email,
                password: user.password,
            });
        });
} 

</script>
<template>
    <form @submit.prevent="onSubmit">
        <label for="username">Username</label>
        <input v-model="userData.email" type="text" name="username" id="username">
        <label for="password">Password</label>
        <input v-model="userData.password" type="password" name="password" id="password">
        <label for="password-confirm">Confirm Password</label>
        <input v-model="userData.passwordConfirm" type="password" name="password" id="password-confirm">
        <input type="submit">
    </form>
</template>