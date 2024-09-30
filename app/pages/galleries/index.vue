<script setup lang="ts">

import MainLayout from "~/layouts/MainLayout.vue";
import type {Category, Gallery} from "@prisma/client";

const loadingPage = ref(true);
const $util = useCategories(), $gallery = useGalleries()
const categories = ref<Category[]>(), galleries = ref<Array<Gallery[]>>()

onMounted(async () => {
    loadingPage.value = true
    categories.value = (await $util.getCategories()).reverse()
    for(let i = 0; i < categories.value.length; i++)
        galleries.value?.push(await $util.getCategoryGalleries(categories.value?.at(i)?.id || 0))

    loadingPage.value = false
})
</script>

<template>
    <MainLayout>
        <UContainer>
            <UPage>
                <UPageHeader
                    title="Galleries"
                    description="A section of where we put collections of media at."
                />
            </UPage>
        </UContainer>
    </MainLayout>
</template>

<style scoped>

</style>