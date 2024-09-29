<script setup lang="ts">
import WebsiteFooter from "~/components/WebsiteFooter.vue";

const route = useRoute()

const links = [
    {
        label: 'Articles',
        icon: 'i-lucide-newspaper',
        to: '/articles'
    },
    {
        label: 'Matches',
        icon: 'i-lucide-radio',
        to: `/matches`
    },
    {
        label: 'Leagues',
        icon: 'i-lucide-users',
        to: `/leagues`
    },
    {
        label: 'Rules',
        icon: 'i-lucide-book',
        to: 'https://rules.wfdf.sport/'
    }
]


</script>

<template>
    <WebsiteHeader :links="links"/>
    <UMain>
        <slot/>
    </UMain>
    <WebsiteFooter :links="links"/>
</template>

<style scoped>
div, main {
    font-family: Inter, sans-serif;
}
</style>