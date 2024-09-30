<script setup lang="ts">

import MainLayout from "~/layouts/MainLayout.vue";
import type {Gallery, Media} from "@prisma/client";

const data = ref<Gallery>(), content = ref<Media[]>(), loadingPage = ref(false)
const $util = useGalleries(), $media = useMedia(), $route = useRoute()

onMounted(async () => {
    loadingPage.value = true
    data.value = (await $util.getGallery([$route.params.galleryId as any as number])).at(0)
    content.value = await $util.getGalleryMedia(data.value?.id || 0)
    loadingPage.value = false
})

useSeoMeta({
    title: data.value?.name,
    ogTitle: data.value?.name
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

function isImage(url: string){
    return url?.endsWith(".jpeg") || url?.endsWith(".jpg") || url?.endsWith(".png")
}
function isVideo(url: string){
    return url?.endsWith(".mp4") || url?.endsWith(".mkv") || url?.endsWith(".mov")
}
</script>

<template>
    <MainLayout>
        <UContainer class="py-10 gap-10 flex flex-col" v-if="!loadingPage">
            <UPage>
                <UPageHeader
                    :title="data?.name"
                >
                    <template #headline>
                        <time class="text-gray-500 dark:text-gray-400">{{ parseAndFormatDate(data?.createdAt.toISOString() || (new Date().toISOString())) }}</time>
                    </template>
                </UPageHeader>
                <UPageBody>
                    <div class="flex flex-col items-center justify-center w-full">
                        <div class="container" v-for="(img, index) in content" :key="index">
                            <img v-if="isImage(img?.url)" :src="$media.getMediaUrl(img)" class="object-contain h-full rounded-lg" alt="media image"/>
                            <video v-if="isVideo(img?.url)" :src="$media.getMediaUrl(img)" class="object-contain h-full rounded-lg"/>
                        </div>
                    </div>
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