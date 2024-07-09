<script setup lang="ts">
import type {HeaderLink} from "#ui-pro/types";

const props = defineProps({
    links: {
        default: [] as any[],
        required: true,
        type: Array<HeaderLink>
    }
})
</script>

<template>
    <UHeader :links="props.links">
        <template #logo>
            SHUL
<!--            <UBadge-->
<!--                label="SaaS"-->
<!--                variant="subtle"-->
<!--                class="mb-0.5"-->
<!--            />-->
        </template>
        <template #right>
            <UButton icon="i-mdi-github" color="gray" variant="ghost" to="https://github.com/Type-32/UltimateFrisbee" target="_blank" />
        </template>
    </UHeader>
</template>

<style scoped>

</style>