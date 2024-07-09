<script setup lang="ts">
const loading = ref(false)
const toast = useToast()
const runtimeConf = useRuntimeConfig()

import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
    username: z.string(),
    password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive({
    username: undefined,
    password: undefined
})

useSeoMeta({
    title: 'SHUL Dashboard Login'
})

async function login(event: FormSubmitEvent<any>) {
    loading.value = true
    try{
        console.log(event)
        const data = await $fetch('/api/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                // @ts-ignore
                username: event?.username,
                // @ts-ignore
                password: event?.password
            })
        })
        refreshCookie('session_token')
        if(!data)
            throw Error("Unknown error")
        toast.add({title: `Logged in successfully!`, color: 'green'})
        return navigateTo('/admin', {replace: true})
    } catch(error){
        console.log(error)
        toast.add({title: `An Error Occurred: ${(error as any).statusMessage || (error as any).message}`, color: 'red'})
    }
    loading.value = false
}

onBeforeMount(async () => {
    if(!!useCookie('session_token').value)
        await navigateTo('/admin')
})

const fields = [{
    name: 'username',
    type: 'text',
    label: 'Username',
    placeholder: 'Enter your username'
}, {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password'
}]
</script>

<template>
    <div class="h-screen flex items-center justify-center overlay">
        <div class="gradient" />

        <UButton
            icon="i-heroicons-home"
            label="Home"
            to="/"
            color="black"
            class="absolute top-4"
        />

        <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
            <UAuthForm
                :fields="fields"
                :state="state"
                :schema="schema"
                title="Welcome back"
                align="top"
                icon="i-heroicons-lock-closed"
                :ui="{ base: 'text-center', footer: 'text-center' }"
                :submit-button="{ trailingIcon: 'i-heroicons-arrow-right-20-solid' }"
                @submit="login"
            />
        </UCard>
    </div>
</template>

<style scoped>

</style>