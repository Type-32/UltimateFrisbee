<script setup lang="ts">

import MainLayout from "~/layouts/MainLayout.vue";

import type { NuxtError } from '#app'

defineProps<{
    error: NuxtError
}>()

useSeoMeta({
    title: 'Page not found',
    description: 'We are sorry but this page could not be found.'
})
</script>

<template>
    <UContainer>
        <UMain>
            <UPage>
                <UPageError :error="error" />
            </UPage>
        </UMain>
    </UContainer>
</template>

<style scoped>

</style>