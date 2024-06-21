<script setup lang="ts">
const route = useRoute()

const links = [
    {
        label: 'Articles',
        icon: 'i-heroicons-newspaper',
        to: '/articles'
    },
    {
        label: 'Matches',
        icon: 'i-heroicons-radio',
        to: `/matches`
    },
    {
        label: 'Clubs',
        icon: 'i-heroicons-user-group',
        to: '/clubs'
    }
]


</script>

<template>
    <div class="w-full top-0 sticky flex items-center justify-start z-10 bg-white/95 backdrop-blur-2xl shadow-sm px-5">
        <NuxtLink class="text-2xl text-primary cursor-pointer" to="/">SHUL</NuxtLink>
        <UHorizontalNavigation class="justify-end" :links="links"/>
    </div>
    <main>
        <slot/>
    </main>
    <UFooter :links="links" class="w-full mt-10">
        <template #left>
            The SHUL Team, Copyright © {{ new Date().getFullYear() }}
        </template>

        <template #right>
            <UButton icon="i-simple-icons-github" color="gray" variant="ghost" to="https://github.com/Type-32/UltimateFrisbee" target="_blank" />
        </template>
    </UFooter>
</template>

<style scoped>
div, main {
    font-family: Inter, sans-serif;
}
</style>