<script setup lang="ts">
const pwd = ref(''), usr = ref('')
const loading = ref(false)
const toast = useToast()
const runtimeConf = useRuntimeConfig()

async function login(){
    loading.value = true
    try{
        const data = await $fetch(runtimeConf.public.siteUrl + '/api/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                username: usr.value,
                password: pwd.value
            })
        })
        refreshCookie('session_token')
        if(!data)
            throw Error("Unknown error")
        toast.add({title: `Logged in successfully!`, color: 'green'})
        return navigateTo('/admin', {replace: true})
    } catch(error){
        console.log(error)
        toast.add({title: `An Error Occurred: ${(error as any).statusMessage}`, color: 'red'})
    }
    loading.value = false
}
</script>

<template>
    <div class="w-full min-h-screen flex flex-col items-center justify-center gap-5">
        <div class="text-2xl">SHUL Admin Dashboard</div>
        <div class="w-1/4">
            <div class="text-primary/50">Username</div>
            <UInput type="username" v-model="usr" :disabled="loading"/>
        </div>
        <div class="w-1/4">
            <div class="text-primary/50">Password</div>
            <UInput type="password" v-model="pwd" :disabled="loading"/>
        </div>
        <UButton @click="login()" :disabled="loading">Login</UButton>
    </div>
</template>

<style scoped>

</style>