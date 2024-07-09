<script setup lang="ts">
import WebsiteFooter from "~/components/WebsiteFooter.vue";

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