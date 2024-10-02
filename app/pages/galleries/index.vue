<script setup lang="ts">

import MainLayout from "~/layouts/MainLayout.vue";
import type {Category, Gallery} from "@prisma/client";

const loadingCategories = ref(true), loadingGalleries = ref(true);
const $util = useCategories(), $gallery = useGalleries()
const categories = ref<Category[]>([]), galleries = ref<Array<Gallery[]>>([])

onMounted(async () => {
    loadingCategories.value = true
    loadingGalleries.value = true
    categories.value = (await $util.getCategories()).reverse()
    loadingCategories.value = false
    for(let i = 0; i < categories.value.length; i++)
        galleries.value?.push(await $util.getCategoryGalleries(categories.value?.at(i)?.id || 0, false))
    console.log(galleries.value.length)
    console.log(categories.value)
    loadingGalleries.value = false
})
function getImageLink(){
    return "https://picsum.photos/200/150"
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
                    title="Galleries"
                    description="A section of where we put collections of media at."
                />
                <UPageBody class="flex flex-col max-w-none min-w-none w-full max-h-none h-full gap-5 items-center">
                    <div class="flex flex-col items-center w-full gap-5" v-for="(category, index) in categories" :key="index" v-if="!loadingCategories">
                        <UDivider><span class="text-center font-medium text-2xl">{{category.name}}</span></UDivider>
                        <div class="w-full" v-if="!loadingGalleries">
                            <div class="grid grid-cols-3 gap-3" v-if="galleries[index].length > 0">
                                <UBlogPost
                                    v-for="(gallery, ind) in galleries[index]"
                                    :key="ind"
                                    :image="getImageLink()"
                                    :date="parseAndFormatDate(gallery.createdAt)"
                                    :title="gallery.name"
                                    :to="`/galleries/${gallery.id}`"
                                />
                            </div>
                            <div class="w-full text-center font-light opacity-60" v-else>There are no galleries under this category.</div>
                        </div>
                        <div class="grid grid-cols-3 gap-3 w-full" v-else>
                            <USkeleton class="w-full h-64"/>
                            <USkeleton class="w-full h-64"/>
                            <USkeleton class="w-full h-64"/>
                        </div>
                    </div>
                    <USkeleton class="h-64 w-full" v-else/>
                </UPageBody>
            </UPage>
        </UContainer>
    </MainLayout>
</template>

<style scoped>

</style>