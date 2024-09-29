<script setup lang="ts">

import DashboardLayout from "~/layouts/DashboardLayout.vue";
import {z} from "zod";
import {timeout} from "ioredis/built/utils";
const loadingPage = ref(false), creatingGallery = ref(false)
const $util = useGalleries(), $toast = useToast()
const newGalleryOpen = ref(false)
const page = ref(1)
const pageCount = 9

definePageMeta({
    middleware: ['check-auth']
})

const columns = [
    {
        key: 'id',
        label: 'ID'
    },
    {
        key: 'name',
        label: 'Name'
    },
    {
        key: 'updatedAt',
        label: 'Updated At'
    },
    {
        key: 'published',
        label: 'State'
    },
    {
        key: 'actions'
    }
]
const items = (row: any) => [
    [{
        label: 'Edit',
        icon: 'i-lucide-pencil',
        click: async () => {
            await navigateTo(`/admin/gallery/${row.id as any as number}`)
        }
    }], [{
        label: 'Publish',
        icon: 'i-lucide-arrow-right',
        click: async () => {
            if(row.published as any as boolean) {
                $toast.add({description: 'Gallery is already published.', color: 'red'})
                return
            }
            const data = await $util.publishGallery(row.id as any as number, useCookie('session_token').value as any as string)
            if(!data)
                $toast.add({description: 'Unable to publish gallery. Please Try again.', color: 'red'})
            else
                $toast.add({description: 'Gallery is successfully published!', color: 'green'})
            await refreshPage()
        }
    }, {
        label: 'Unpublish',
        icon: 'i-lucide-archive',
        click: async () => {
            if(!row.published as any as boolean) {
                $toast.add({description: 'Gallery is already unpublished.', color: 'red'})
                return
            }
            const data = await $util.unpublishGallery(row.id as any as number, useCookie('session_token').value as any as string)
            if(!data)
                $toast.add({description: 'Unable to unpublish gallery. Please Try again.', color: 'red'})
            else
                $toast.add({description: 'Gallery is successfully unpublished!', color: 'green'})
            await refreshPage()
        }
    }], [{
        label: 'Delete',
        icon: 'i-lucide-trash',
        click: async () => {
            const data = await $util.deleteGallery([row.id as any as number], useCookie('session_token').value as any as string)
            if(!data)
                $toast.add({description: 'Unable to delete gallery. Please Try again.', color: 'red'})
            else
                $toast.add({description: 'Gallery is successfully deleted!', color: 'green'})

            await refreshPage()
        }
    }]
]

const rows = ref([])

onMounted(async () => {
    await refreshPage()
})

async function refreshPage(){
    loadingPage.value = true
    rows.value = await $util.getGalleries(true)
    loadingPage.value = false
}

const dataRef = ref({
    name: undefined,
})

const schema = z.object({
    name: z.string().max( 200, 'Cannot be over 200 characters'),
})
type Schema = z.output<typeof schema>

const state = reactive({
    name: undefined,
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

async function save() {
    try {
        creatingGallery.value = true
        // console.log(useCookie('session_token').value)
        const data = await $util.newGallery(state.name as any as string, useCookie('session_token').value as any as string)
        if(!data)
            throw new Error("Unable to create new Gallery. Please try again later.")

        timeout(() => {}, 1000)
        await navigateTo(`/admin/gallery/${data.id}`)
    } catch (e: any){
        $toast.add({description: e.statusMessage || e.message, color: "red"})
    }

    creatingGallery.value = false
}
</script>

<template>
    <DashboardLayout>
        <UDashboardPage>
            <UDashboardPanel grow :collapsible="false">
                <UDashboardNavbar title="Galleries">
                    <template #right>
                        <UButton @click="newGalleryOpen = true" icon="i-lucide-plus">New Gallery</UButton>
                    </template>
                </UDashboardNavbar>


                <UModal v-model="newGalleryOpen" prevent-close class="h-full" :ui="{ height: 'h-full sm:h-auto', container: 'items-center'}">
                    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', container: 'w-fit' }">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                    Create New Gallery
                                </h3>
                                <UButton color="gray" variant="ghost" icon="i-lucide-x" class="-my-1" @click="newGalleryOpen = false" :loading="creatingGallery" />
                            </div>
                        </template>
                        <div class="w-full">
                            <UForm :schema="schema" :state="state" class="w-full grid grid-cols-2 gap-5 max-w-none" :aria-disabled="creatingGallery">
                                <UFormGroup label="Name" name="name">
                                    <UInput v-model="state.name" placeholder="Title, e.g. Example Gallery" :loading="creatingGallery" />
                                </UFormGroup>
                            </UForm>
                        </div>
                        <template #footer>
                            <div class="w-full flex items-center justify-end">
                                <UButton @click="save()" :loading="creatingGallery" >Create Gallery</UButton>
                            </div>
                        </template>
                    </UCard>
                </UModal>

                <UTable
                    :rows="rows"
                    :loading="loadingPage"
                    :columns="columns"
                    :loading-state="{ icon: 'i-lucide-rotate-cw', label: 'Loading...' }"
                    :progress="{ color: 'primary', animation: 'carousel' }"
                    class="w-full"
                    :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
                >
                    <template #actions-data="{ row }">
                        <UDropdown :items="items(row)">
                            <UButton color="gray" variant="ghost" icon="i-lucide-ellipsis" />
                        </UDropdown>
                    </template>
                    <template #updatedAt-data="{ row }">
                        <span>{{ parseAndFormatDate(row.updatedAt) }}</span>
                    </template>
                    <template #published-data="{ row }">
                        <UBadge variant="subtle" :color="row.published ? 'emerald' : 'amber'">{{ row.published ? 'Published' : 'Draft' }}</UBadge>
                    </template>
                </UTable>
            </UDashboardPanel>
        </UDashboardPage>
    </DashboardLayout>
</template>

<style scoped>

</style>