<script setup lang="ts">

import MainLayout from "~/layouts/MainLayout.vue";

const loadingPage = ref(false)
const $util = useArticles()
const data = ref()
const runtimeConf = useRuntimeConfig()

onMounted(async () => {
    loadingPage.value = true
    data.value = await $util.getArticles(false)
    loadingPage.value = false
})

function getLink(){
    return 'https://picsum.photos/640/360'
}
</script>

<template>
    <MainLayout>
        <div class="w-full h-full flex flex-col gap-5 items-center">
            <div class="text-2xl text-center p-10">Articles</div>
            <div class="w-5/6 flex flex-col">
                <UBlogList orientation="vertical">
                    <UBlogPost :to="`/articles/${post.slug}`" orientation="horizontal" :date="post.createdAt" :image="getLink()" v-for="(post, postIndex) in data" :key="postIndex" :title="post.title" :description="post.description"/>
                </UBlogList>
            </div>
        </div>
    </MainLayout>
</template>

<style scoped>

</style>