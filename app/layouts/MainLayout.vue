<script setup lang="ts">
import WebsiteFooter from "~/components/WebsiteFooter.vue";

const route = useRoute()

const links = [
    {
        label: "From Us",
        icon: 'i-lucide-info',
        children: [
            {
                label: 'Articles',
                icon: 'i-lucide-newspaper',
                to: '/articles',
                description: 'Our articles that records matches, fun facts, and more information regarding the sport of Frisbee.'
            },
            {
                label: 'Matches',
                icon: 'i-lucide-radio',
                to: `/matches`,
                description: 'The matches we have hosted in this league.'
            },
            {
                label: 'Tables',
                icon: 'i-lucide-users',
                to: `/tables`,
                description: 'The statistics of the teams in this league. Updated Real-time.'
            },
            {
                label: 'Media',
                icon: 'i-lucide-album',
                to: `/medias`,
                description: 'Collections of photos, videos, and media recorded in the league.'
            }
        ]
    },
    {
        label: 'Rules',
        icon: 'i-lucide-book',
        to: 'https://rules.wfdf.sport/'
    }
]


</script>

<template>
    <WebsiteHeader :links="links" class="bg-slate-100/80 backdrop-blur-lg" />
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