<script setup lang="ts">

import DashboardLayout from "~/layouts/DashboardLayout.vue";
import {z} from "zod";
import type {FormSubmitEvent} from "#ui/types";
import GalleryMediaFrame from "~/components/GalleryMediaFrame.vue";
import {ref} from "vue";
import type {Media} from "@prisma/client";
definePageMeta({
    middleware: ['check-auth']
})

const medias = ref<Media[]>([]), $route = useRoute(), $util = useGalleries(), loadingPage = ref(false), settingsModal = ref(false), mediaAddModal = ref(false)
const pendingInModal = ref(false), directory = ref(''), selected = ref([]), data = ref()
const $media = useMedia(), $toast = useToast()

const dataRef = ref({
    name: undefined,
    published: undefined
})

const galleryId = parseInt($route.params.galleryId as string);
console.log(galleryId)

onBeforeMount(async () => {
    data.value = await $media.listDirectory(directory.value, false, true);
})

onMounted(async () => {
    try {
        loadingPage.value = true

        const gallery = await $util.getGallery([galleryId], true)
        if(gallery.length == 0)
            throw new Error("Gallery not found.")
        dataRef.value.name = gallery.at(0)?.name as any
        dataRef.value.published = gallery.at(0)?.published as any
        medias.value = await $util.getGalleryMedia(galleryId) as any

        loadingPage.value = false
    } catch (e: any) {
        $toast.add({description: e.message, color: "red"})
        await navigateTo('/admin/galleries')
    }
})

const schema = z.object({
    name: z.string(),
    published: z.boolean()
})
type Schema = z.output<typeof schema>

const state = reactive(dataRef.value)

async function onSubmit (event: FormSubmitEvent<Schema>) {
    await edit()
}

async function edit() {
    try {
        loadingPage.value = true
        // console.log(useCookie('session_token').value as any as string)
        const data = await $util.editGallery(galleryId as any as number, state.name as any as string, state.published as any as boolean, medias.value.map(m => m.id) as any as number[], useCookie('session_token').value as any as string)
        if(!data)
            throw new Error("Edit unsuccessful. Please try again later.")
        await navigateTo('/admin/galleries')
    } catch (e: any){
        $toast.add({description: e.statusMessage || e.message, color: "red"})
    }
    loadingPage.value = false
}

const parseArrayRouteDir = (arr: string[]) => {
    if(arr.length == 0) return '/'
    if(arr.length == 1) return `${arr[0]}`

    let temp = arr[0] as string
    for(let i = 1; i < arr.length; i++) {
        if(arr[i] == '') continue;
        temp += `/${arr[i]}`
    }

    return temp
}

const lastDirAsRoute = () => {
    // NOT DIRECTORY! FOR ROUTE ONLY!
    let temp = directory.value.split('/')
    // selected.value = []
    if(temp.length <= 1)
        return '/'
    else {
        return temp.at(temp.length - 2) == '' ? '/' : '/' + parseArrayRouteDir(temp.splice(0, temp.length - 1))
    }
}

const handlePrevious = () => {
    directory.value = lastDirAsRoute()
    selected.value = []
    // dat.value.refresh()
    refreshDir()
}

const handleForwards = (url: string, pseudo: string) => {
    // previousDir.value = directory.value
    directory.value = url.substring(7)
    selected.value = []
    refreshDir()
}

const addMedia = async () => {
    // console.log(editor.value.chain().focus())

    if(selected.value.length != 1){
        $toast.add({title: 'Cannot select multiple images', color: 'red'})
        return
    }

    const url = (selected.value?.at(0) as any).url as string
    console.log(url)
    if (!(isImage(url) || isVideo(url))) {
        $toast.add({title: 'Cannot select non-image files', color: 'red'})
        return
    }

    for(let i = 0; i < selected.value.length; i++){
        medias.value?.push(selected.value.at(i) as any as Media)
    }

    mediaAddModal.value = false
    selected.value = []
}

const refreshDir = async () => {
    pendingInModal.value = true
    data.value = await $media.listDirectory(directory.value, false, true)
    pendingInModal.value = false
}

function isImage(url: string){
    return url.endsWith(".jpeg") || url.endsWith(".jpg") || url.endsWith(".png")
}
function isVideo(url: string){
    return url.endsWith(".mp4") || url.endsWith(".mkv") || url.endsWith(".mov")
}

const moveMediaUp = (index: number) => {
    if (index > 0 && medias.value) {
        const temp = medias.value[index];
        medias.value[index] = medias.value?.at(index - 1) as any;
        medias.value[index-1] = temp as any;
    }
}

const moveMediaDown = (index: number) => {
    if (medias.value && index < medias.value.length - 1) {
        const temp = medias.value[index];
        medias.value[index] = medias.value?.at(index + 1) as any;
        medias.value[index + 1] = temp as any;
    }
}

const removeMedia = (index: number) => {
    if (medias.value) {
        medias.value.splice(index, 1);
    }
}
</script>

<template>
    <DashboardLayout>
        <UDashboardPage>
            <UDashboardPanel grow>
                <UDashboardNavbar title="Edit Gallery">
                    <template #right>
                        <UButton variant="ghost" @click="settingsModal = true" icon="i-lucide-settings"/>
                        <UButton variant="outline" to="/admin/galleries" :disabled="loadingPage" >Cancel</UButton>
                        <UButton @click="edit()" :disabled="loadingPage" >Save Changes</UButton>
                    </template>
                </UDashboardNavbar>
                <UDashboardPanelContent class="h-full flex flex-col px-10 w-full gap-5 py-10">
                    <div class="flex items-center justify-center">
                        <UButton icon="i-lucide-plus" class="transition duration-300 p-3 w-fit justify-self-center" @click="mediaAddModal = true">Add Media</UButton>
                    </div>
                    <div v-for="(id, index) in medias" :key="index" class="w-full h-72 flex items-center justify-center gap-5">
                        <div class="flex flex-col justify-between items-center align-middle gap-5">
                            <UButton icon="i-lucide-arrow-up" @click="moveMediaUp(index)"/>
                            <UButton icon="i-lucide-arrow-down" @click="moveMediaDown(index)"/>
                        </div>
                        <div class="h-72 flex items-center justify-center rounded-lg w-full container p-4 ring-2 ring-gray-500/50 backdrop-blur-lg dark:bg-gray-800/50 flex-grow overflow-hidden">
                            <img v-if="isImage(id.url)" :src="$media.wrapMediaUrlStump(id.url || '')" class="object-cover h-full rounded-lg" alt="media image"/>
                            <video v-if="isVideo(id.url)" :src="$media.wrapMediaUrlStump(id.url || '')" class="object-cover h-full rounded-lg"/>
                        </div>
                        <UButton icon="i-lucide-trash" color="red" @click="removeMedia(index)"/>
                    </div>
                    <div class="flex items-center justify-center" v-if="medias?.length > 0 || false">
                        <UButton icon="i-lucide-plus" class="transition duration-300 p-3 w-fit justify-self-center" @click="mediaAddModal = true">Add Media</UButton>
                    </div>
                </UDashboardPanelContent>
                <UModal v-model="settingsModal" class="h-full" :ui="{ height: 'h-full sm:h-auto', container: 'items-center'}">
                    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', container: 'w-fit p-5' }">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                    Gallery Properties
                                </h3>
                                <UButton color="gray" variant="ghost" icon="i-lucide-x" class="-my-1" @click="settingsModal = false" :loading="loadingPage" />
                            </div>
                        </template>
                        <div class="w-full">
                            <UForm :schema="schema" :state="state" class="grid grid-cols-1 gap-5" :aria-disabled="loadingPage">
                                <UFormGroup label="Name" name="name">
                                    <UInput v-model="state.name" placeholder="Name, e.g. My Gallery" :disabled="loadingPage" />
                                </UFormGroup>
                                <UFormGroup label="Published" name="published">
                                    <UToggle v-model="state.published" placeholder="Is The Gallery Published. If false, this won't be visible to the public." :disabled="loadingPage" />
                                </UFormGroup>
                            </UForm>
                        </div>
                    </UCard>
                </UModal>

                <UModal v-model="mediaAddModal" title="Insert Media">
                    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', container: 'w-full' }">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                    Select Media
                                </h3>
                                <UButtonGroup>
                                    <UButton color="gray" variant="ghost" icon="i-lucide-arrow-left" class="-my-1" @click="handlePrevious()"/>
                                    <UButton color="gray" variant="ghost" icon="i-lucide-x" class="-my-1" @click="mediaAddModal = false"/>
                                </UButtonGroup>
                            </div>
                        </template>
                        <MediaBrowserTable v-model="selected" :rows="(data as any).items as any[]" :loading="pendingInModal" :route-forwards="false" @onforwards="handleForwards"/>
                        <template #footer>
                            <UButton :disabled="selected.length != 1" @click="addMedia()" block>Add</UButton>
                        </template>
                    </UCard>
                </UModal>
            </UDashboardPanel>
        </UDashboardPage>
    </DashboardLayout>
</template>

<style scoped>

</style>