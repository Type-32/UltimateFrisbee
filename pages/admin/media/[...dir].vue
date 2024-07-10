<script setup lang="ts">

import DashboardLayout from "~/layouts/DashboardLayout.vue";
import type {FormError, FormSubmitEvent} from "#ui/types";

definePageMeta({
    middleware: ['check-auth']
})

const $route = useRoute(), $media = useMedia(), $toast = useToast()
const $dir = $route.params.dir as string || '/';
const lastDirAsRoute = () => {
    // NOT DIRECTORY! FOR ROUTE ONLY!
    let temp = `${$dir}`.split('/')
    if(temp.length <= 1)
        return '/media'
    else {
        return temp.at(temp.length - 2) == '' ? '/media' : '/media' + temp.at(temp.length - 2)
    }
}
// console.log($dir);

const columns = [
    {
        key: 'fileName',
        label: 'Name',
        sortable: true,
    },
    {
        key: 'createdAt',
        label: 'Created At'
    }
]

const selected = ref([]), fileRef = ref<HTMLInputElement>(), file = ref<File>(), uploading = ref(false)
const uploadFileModal = ref(false), newDirModal = ref(false)

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
    state.avatar = URL.createObjectURL(input.files[0])
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

    const {data, error} = await $media.createDirectory($dir, `${dirState.dirName}`)

    if(error.value as any){
        $toast.add({ title: error.value?.statusMessage || 'Unknown Error Occurred', color: 'red' })
        return
    }

    refresh()
    $toast.add({ title: 'Folder Created Successfully!', icon: 'i-heroicons-check-circle', color: 'green' })
    uploading.value = false
    newDirModal.value = false
}

function select (row: any) {
    //@ts-ignore
    const index = selected.value.findIndex((item) => item.id === row.id)
    if (index === -1) {
        selected.value.push(row as never)
    } else {
        selected.value.splice(index, 1)
    }
}

function joinUrl(str: string): string{
    const runtimeConfig = useRuntimeConfig()
    return runtimeConfig.public.siteUrl + str
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
                                <UButton variant="ghost" icon="i-mdi-arrow-left" :to="`/admin${lastDirAsRoute()}`" :disabled="$dir == '/'"/>
                                <UButton variant="ghost" icon="i-mdi-refresh" @click="refresh()"/>
                            </UButtonGroup>
                            <UBadge v-if="selected.length >= 1" variant="soft" size="sm" color="blue">Selected {{selected.length}} Item(s)</UBadge>
                        </div>
                    </template>
                    <template #right>
                        <UButton :disabled="selected.length < 1" :variant="selected.length < 1 ? 'soft' : 'solid'" color="red">Delete</UButton>
                        <UButton :disabled="selected.length < 1" color="gray" :variant="selected.length < 1 ? 'soft' : 'solid'">Move</UButton>
                        <UButton :disabled="selected.length >= 1" color="gray" @click="newDirModal = true">New</UButton>
                        <UButton :disabled="selected.length >= 1" color="gray" @click="uploadFileModal = true">Upload</UButton>
                    </template>
                </UDashboardNavbar>
                <UTable :columns="columns" v-model="selected" :rows="data?.items" :loading="pending" @select="select">
                    <template #fileName-data="{row}">
                        <div class="flex flex-row gap-3 items-center">
                            <span v-if="!row.isFolder" class="flex flex-row gap-3 items-center"><nuxt-img :src="joinUrl(row.url)" alt="preview" class="object-contain size-8"/> {{row.fileName}}</span>
                            <span v-else><UButton icon="i-mdi-folder" :to="`/admin${row.url}`" :label="row.fileName"/></span>
                        </div>
                    </template>
                    <template #updatedAt-data="{ row }">
                        <span>{{ parseAndFormatDate(row.updatedAt) }}</span>
                    </template>
                    <template #createdAt-data="{ row }">
                        <span>{{ parseAndFormatDate(row.updatedAt) }}</span>
                    </template>
                </UTable>

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
            </UDashboardPanel>
        </UDashboardPage>
    </DashboardLayout>
</template>

<style scoped>

</style>