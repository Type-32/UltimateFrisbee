<script setup lang="ts">

import MainLayout from "~/layouts/MainLayout.vue";

const loadingPage = ref(false)
const $util = useArticles()
const data = ref()
const runtimeConf = useRuntimeConfig()

onMounted(async () => {
    loadingPage.value = true
    data.value = await $util.getArticles(false)
    data.value = data.value.reverse()
    loadingPage.value = false
})
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getLink(){
    return `https://picsum.photos/id/${getRandomInt(1, 1000)}/600/400`
}

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
        <UContainer>
            <UPage>
                <UPageHeader
                    title="Articles"
                    description="A section of where we post content related to the organization."
                    class="text-center items-center justify-center flex"
                />
                <UPageBody class="w-full h-full flex flex-col gap-5 items-center">
                    <UBlogList orientation="vertical" v-if="!loadingPage">
                        <UBlogPost
                            :to="`/articles/${post.slug}`"
                            :date="parseAndFormatDate(post.createdAt)"
                            :image="getLink()"
                            v-for="(post, postIndex) in data"
                            :orientation="postIndex === 0 ? 'horizontal' : 'vertical'"
                            :class="[postIndex === 0 && 'col-span-full']"
                            :key="postIndex"
                            :title="post.title"
                            :description="post.description"
                        />
                    </UBlogList>
                    <div class="w-5/6 flex flex-col" v-else>
                        <USkeleton class="w-full h-96"/>
                    </div>
                </UPageBody>
            </UPage>
        </UContainer>
    </MainLayout>
</template>

<style scoped>

</style>