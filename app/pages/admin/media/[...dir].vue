<script setup lang="ts">

import DashboardLayout from "~/layouts/DashboardLayout.vue";
import type {FormError, FormSubmitEvent} from "#ui/types";
import MediaBrowserTable from "~/components/MediaBrowserTable.vue";

definePageMeta({
    middleware: ['check-auth']
})

const $route = useRoute(), $media = useMedia(), $toast = useToast()
const parseRouteDir = () => {
    //@ts-ignore
    return parseArrayRouteDir(Array.from($route.params.dir) || [''])
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

const $dir = parseRouteDir();
const lastDirAsRoute = () => {
    // NOT DIRECTORY! FOR ROUTE ONLY!
    let temp = $dir.split('/')
    if(temp.length <= 1)
        return '/'
    else {
        return temp.at(temp.length - 2) == '' ? '/' : '/' + parseArrayRouteDir(temp.splice(0, temp.length - 1))
    }
}

const selected = ref([]), fileRef = ref<HTMLInputElement>(), file = ref<File>(), uploading = ref(false), deleting = ref(false)
const uploadFileModal = ref(false), newDirModal = ref(false), deleteFileModal = ref(false)

const {data, pending, refresh} = await $media.listDirectory($dir)

// region
const state = reactive({
    avatar: ''
})
const dirState = reactive({
    dirName: undefined
})

function validate(state: any): FormError[] {
    const errors = []
    if(!file.value) {
        $toast.add({title: 'File cannot be null', icon: 'i-heroicons-check-circle'})
        errors.push({ path: 'name', message: 'Please enter your name.' })
    }
    return errors
}
function dirValidate(state: any): FormError[] {
    const errors = []
    if(!state.dirName) {
        $toast.add({title: 'Folder Name Cannot be Null', color: 'red'})
        errors.push({ path: 'dirName', message: 'Please enter the folder name.' })
    }
    return errors
}

function onFileChange(e: Event) {
    const input = e.target as HTMLInputElement

    if (!input.files?.length) {
        return
    }

    file.value = input.files[0]
    state.avatar = input.files[0] ? URL.createObjectURL(input.files[0]) : ''
}

function onFileClick() {
    fileRef.value?.click()
}

async function onSubmit(event: FormSubmitEvent<any>) {
    console.log("Submitting")
    uploading.value = true
    // Do something with data
    const {data, error} = await $media.uploadFile(file.value as any as File, $dir)

    if(error.value as any){
        // console.log(error.value)
        $toast.add({ title: error.value?.statusMessage || 'Unknown Error Occurred', color: 'red' })
        return
    }

    refresh()
    $toast.add({ title: 'File Uploaded', icon: 'i-heroicons-check-circle', color: 'green' })
    uploading.value = false
    uploadFileModal.value = false
}
async function onNewDirSubmit(event: FormSubmitEvent<any>) {
    console.log("Submitting")
    uploading.value = true

    if(!dirState.dirName) {
        $toast.add({title: 'Folder Name Cannot be Null', color: 'red'})
        return
    }

    console.log($dir)
    const {data, error} = await $media.createDirectory(`${$dir}`, `${dirState.dirName}`)

    if(error.value as any){
        $toast.add({ title: error.value?.statusMessage || 'Unknown Error Occurred', color: 'red' })
        return
    }

    refresh()
    $toast.add({ title: 'Folder Created Successfully!', icon: 'i-heroicons-check-circle', color: 'green' })
    uploading.value = false
    newDirModal.value = false
}
async function onDeleteFiles(){
    deleting.value = true
    const fCount = selected.value.length

    const {data, error} = await $media.deleteBatch(selected.value.map(i => (i as any).id))

    if(error.value){
        deleting.value = false
        $toast.add({title: `An error occurred: ${(error.value as any)?.statusMessage || (error.value as any)?.message || 'Unknown Error'}`, color: 'red'})
        return
    }

    deleting.value = false
    deleteFileModal.value = false
    refresh()
    $toast.add({title: `${data.value?.message}`, color: 'yellow'})
}
// endregion
</script>

<template>
    <DashboardLayout>
        <UDashboardPage>
            <UDashboardPanel grow :collapsible="false">
                <UDashboardNavbar title="Media Library">
                    <template #badge>
                        <div class="flex items-center gap-5">
                            <UTooltip text="This is your current directory."><UBadge variant="subtle">{{$dir != '/' ? '/'+$dir : $dir + ' (Root)'}}</UBadge></UTooltip>
                            <UButtonGroup>
                                <UButton variant="ghost" icon="i-mdi-arrow-left" :to="`/admin/media${lastDirAsRoute()}`" :disabled="$dir == '/'"/>
                                <UButton variant="ghost" icon="i-mdi-refresh" @click="refresh()"/>
                            </UButtonGroup>
                            <UBadge v-if="selected.length >= 1" variant="soft" size="sm" color="blue">Selected {{selected.length}} Item(s)</UBadge>
                        </div>
                    </template>
                    <template #right>
                        <UButton :disabled="selected.length < 1" :variant="selected.length < 1 ? 'soft' : 'solid'" color="red" @click="deleteFileModal = true">Delete</UButton>
                        <UButton :disabled="selected.length < 1" color="gray" :variant="selected.length < 1 ? 'soft' : 'solid'">Move</UButton>
                        <UButton :disabled="selected.length >= 1" color="gray" @click="newDirModal = true">New</UButton>
                        <UButton :disabled="selected.length >= 1" color="gray" @click="uploadFileModal = true">Upload</UButton>
                    </template>
                </UDashboardNavbar>

                <MediaBrowserTable v-model="selected" :rows="data?.items" :loading="pending"/>

                <UModal v-model="uploadFileModal" prevent-close :ui="{ height: 'h-full sm:h-auto', container: 'items-center'}">
                    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', container: 'w-fit' }">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                    Upload Image File
                                </h3>
                                <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="uploadFileModal = false" :loading="uploading" />
                            </div>
                        </template>
                        <UForm :state="state" :validate="validate" :validate-on="['submit']" @submit="onSubmit">
                            <div class="flex flex-col gap-5">
                                <UFormGroup name="image" label="Image" class="gap-2" :ui="{ container: 'flex items-center gap-3'}">
                                    <nuxt-img :src="state.avatar" alt="Please Upload A File" class="rounded max-w-80 object-contain flex-grow"/>
                                    <UButton label="Choose" color="white" size="md" @click="onFileClick" :loading="uploading"/>
                                    <input ref="fileRef" type="file" class="hidden" accept=".jpg, .jpeg, .png, .gif" @change="onFileChange">
                                </UFormGroup>
                                <UBadge variant="soft" color="blue" class="w-fit">JPG, GIF or PNG. 5MB Max.</UBadge>
                                <UButton type="submit" label="Submit" block :loading="uploading"/>
                            </div>
                        </UForm>
                    </UCard>
                </UModal>

                <UModal v-model="newDirModal" prevent-close :ui="{ height: 'h-full sm:h-auto', container: 'items-center' }">
                    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', container: 'w-fit' }">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                    New Directory
                                </h3>
                                <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="uploadFileModal = false" :loading="uploading" />
                            </div>
                        </template>
                        <UForm class="flex flex-col gap-5" :state="dirState" :validate="dirValidate" :validate-on="['submit']" @submit="onNewDirSubmit">
                            <UFormGroup label="Folder Name" name="dirName">
                                <UInput v-model="dirState.dirName" placeholder="Folder name, e.g. 'Images'" :disabled="uploading"/>
                            </UFormGroup>
                            <UButton label="Submit" type="submit" block :loading="uploading"/>
                        </UForm>
                    </UCard>
                </UModal>

                <UDashboardModal v-model="deleteFileModal" title="Delete File(s)"
                    description="Are you sure you want to delete these file(s)? This action is permanent and the file(s) will not be recovered!"
                    icon="i-heroicons-exclamation-circle"
                    :ui="{
                          icon: { base: 'text-red-500 dark:text-red-400' } as any,
                          footer: { base: 'ml-16' } as any
                        }"
                >
                    <template #footer>
                        <UButton color="red" label="Delete" :loading="deleting" :disabled="deleting" @click="onDeleteFiles()" />
                        <UButton color="white" label="Cancel" @click="deleteFileModal = false" :disabled="deleting" />
                    </template>
                </UDashboardModal>
            </UDashboardPanel>
        </UDashboardPage>
    </DashboardLayout>
</template>

<style scoped>

</style>