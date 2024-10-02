<script setup lang="ts">
import type {FooterLink} from "#ui-pro/types";

const props = defineProps({
    links:{
        default: [] as any[],
        required: true,
        type: Array<FooterLink>
    }
})
</script>

<template>
    <UFooter :links="props.links" class="w-full mt-8 border-t">
        <template #left>
            The SHUL Team, Copyright © 2023-{{ new Date().getFullYear() }}
        </template>
        <template #right>
            <div class="flex items-center justify-center gap-3">
                <span class="text-sm opacity-75">View Source on GitHub</span>
                <UButton icon="i-lucide-github" color="gray" variant="ghost" to="https://github.com/Type-32/UltimateFrisbee" target="_blank" />
            </div>
        </template>
    </UFooter>
</template>

<style scoped>

</style>