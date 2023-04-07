<script lang="ts" setup>

const userData = ref<{email: string, password: string}>({
    email: "",
    password: "",
});

const onSubmit = async () => {
    const response = await useFetch("/api/auth/register-user", {
        method: "POST",
        body: { ...userData.value },
    });

    if (response.error.value === null) {
        useRouter().push("/");
    } else {
        alert("Could not create user");
        console.log(response.error.value);
    }
}

</script>
<template>
    <form @submit.prevent="onSubmit">
        <label for="username">Username</label>
        <input v-model="userData.email" type="text" name="username" id="username">
        <label for="username">Password</label>
        <input v-model="userData.password" type="password" name="password" id="password">
        <input type="submit">
    </form>
</template>