<script setup lang="ts">

import MainLayout from "~/layouts/MainLayout.vue";

const data = ref(), loadingPage = ref(false)
const $util = useArticles(), $route = useRoute()

onMounted(async () => {
    loadingPage.value = true
    data.value = await $util.getArticlesBySlug($route.params.articleSlug as any as string)
    loadingPage.value = false
})
</script>

<template>
    <MainLayout>
        <div class="flex flex-col items-center py-10">
            <div class="w-3/4 flex flex-col gap-10" v-if="!loadingPage">
                <div class=" flex items-center justify-center">
                    <div class="w-2/3">
                        <NuxtImg src="https://picsum.photos/640/360" class="w-full rounded-lg object-center object-contain justify-center flex" />
                    </div>
                </div>
                <div class="flex flex-col w-full gap-5 items-center">
                    <div class="text-2xl font-bold">{{data?.title}}</div>
                    <div class="text-black/50">{{data?.description}}</div>
                </div>
                <div class="flex flex-col gap-5 items-center">
                    <article class="prose max-w-none items-center">
                        <div v-html="data?.content"/>
                    </article>
                </div>
            </div>
            <div v-else class="flex flex-col gap-5 items-center">
                <USkeleton class="w-full h-32"/>
                <USkeleton class="w-full h-32"/>
                <USkeleton class="w-full h-96"/>
            </div>
            <UButton to="/articles" variant="link">Back to Articles</UButton>
        </div>
    </MainLayout>
</template>

<style scoped>

</style>