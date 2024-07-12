<script setup lang="ts">

import MainLayout from "~/layouts/MainLayout.vue";

const data = ref(), loadingPage = ref(false)
const $util = useArticles(), $route = useRoute()

onMounted(async () => {
    loadingPage.value = true
    data.value = await $util.getArticlesBySlug($route.params.articleSlug as any as string)
    loadingPage.value = false
})

useSeoMeta({
    title: data.value?.title,
    ogTitle: data.value?.title,
    description: data.value?.description,
    ogDescription: data.value?.description
})

function parseAndFormatDate(dateString: string): string {
    const date = new Date(dateString);

    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${year}/${month}/${day}, ${hours}:${minutes}`;
}
</script>

<template>
    <MainLayout>
        <UContainer class="py-10 gap-10 flex flex-col" v-if="!loadingPage">

            <div class=" flex items-center justify-center">
                <div class="w-2/3">
                    <NuxtImg src="https://picsum.photos/640/360" class="w-full rounded-lg object-center object-contain justify-center flex" />
                </div>
            </div>
            <UPage>
                <UPageHeader
                    :title="data?.title"
                    :description="data?.description"
                >
                    <template #headline>
                        <time class="text-gray-500 dark:text-gray-400">{{ parseAndFormatDate(data?.createdAt) }}</time>
                    </template>
                </UPageHeader>
                <UPageBody prose >
                    <article class="prose dark:text-white/90 max-w-none items-center">
                        <div v-html="data?.content"/>
                    </article>
                </UPageBody>
            </UPage>
        </UContainer>
        <UContainer v-else>
            <USkeleton class="w-full h-32"/>
            <USkeleton class="w-full h-32"/>
            <USkeleton class="w-full h-96"/>
        </UContainer>
    </MainLayout>
</template>

<style scoped>

</style>