<script setup lang="ts">

import DashboardLayout from "~/layouts/DashboardLayout.vue";
import {z} from "zod";
const loadingPage = ref(false), creatingArticle = ref(false)
const $util = useArticles(), $toast = useToast()
const newArticleOpen = ref(false)
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
        key: 'slug',
        label: 'Slug'
    },
    {
        key: 'title',
        label: 'Title'
    },
    {
        key: 'createdAt',
        label: 'Created At'
    },
    {
        key: 'published',
        label: 'Published?'
    },
    {
        key: 'actions'
    }
]

const items = (row: any) => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: async () => {
            await navigateTo(`/admin/article/${row.id as any as number}`)
        }
    }], [{
        label: 'Publish',
        icon: 'i-heroicons-arrow-right-circle-20-solid',
        click: async () => {
            if(row.published as any as boolean) {
                $toast.add({description: 'Article is already published.', color: 'red'})
                return
            }
            const data = await $util.publishArticle(row.id as any as number, useCookie('session_token').value as any as string)
            if(!data)
                $toast.add({description: 'Unable to publish article. Please Try again.', color: 'red'})
            else
                $toast.add({description: 'Article is successfully published!', color: 'green'})
            await refreshPage()
        }
    }, {
        label: 'Unpublish',
        icon: 'i-heroicons-archive-box-20-solid',
        click: async () => {
            if(!row.published as any as boolean) {
                $toast.add({description: 'Article is already unpublished.', color: 'red'})
                return
            }
            const data = await $util.unpublishArticle(row.id as any as number, useCookie('session_token').value as any as string)
            if(!data)
                $toast.add({description: 'Unable to unpublish article. Please Try again.', color: 'red'})
            else
                $toast.add({description: 'Article is successfully unpublished!', color: 'green'})
            await refreshPage()
        }
    }], [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: async () => {
            const data = await $util.deleteArticle(row.id as any as number, useCookie('session_token').value as any as string)
            if(!data)
                $toast.add({description: 'Unable to delete article. Please Try again.', color: 'red'})
            else
                $toast.add({description: 'Article is successfully deleted!', color: 'green'})

            await refreshPage()
        }
    }]
]

const rows = ref([] as any[])

onMounted(async () => {
    await refreshPage()
})

async function refreshPage(){
    loadingPage.value = true
    rows.value = await $util.getArticles(true) as any[]
    loadingPage.value = false
}

const dataRef = ref({
    title: undefined,
    slug: undefined,
})

const schema = z.object({
    title: z.string().max( 255, 'Cannot be over 255 characters'),
    slug: z.string().max( 255, 'Cannot be over 255 characters').toLowerCase(),
})
type Schema = z.output<typeof schema>

const state = reactive({
    title: undefined,
    slug: undefined,
})

async function save() {
    try {
        creatingArticle.value = true
        // console.log(useCookie('session_token').value)
        const data = await $util.newArticle(state.slug as any as string, state.title as any as string, '', '', false, useCookie('session_token').value as any as string)
        if(!data)
            throw new Error("Unable to create new Article. Please try again later.")
        await navigateTo(`/admin/article/${data.id}`)
    } catch (e: any){
        $toast.add({description: e.statusMessage || e.message, color: "red"})
    }

    creatingArticle.value = false
}
</script>

<template>
    <DashboardLayout>
        <UDashboardPage>
            <UDashboardPanel grow>
                <UDashboardNavbar title="Articles">
                    <template #right>
                        <UButton to="/admin/article/new">New Article</UButton>
                    </template>
                </UDashboardNavbar>

                <UDashboardPanelContent>
                    <div class="w-full flex flex-col">
                        <UTable
                            :rows="rows"
                            :loading="loadingPage"
                            :columns="columns"
                            :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
                            :progress="{ color: 'primary', animation: 'carousel' }"
                        >
                            <template #actions-data="{ row }">
                                <UDropdown :items="items(row)">
                                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                                </UDropdown>
                            </template>
                        </UTable>
                    </div>

                    <UModal v-model="newArticleOpen" prevent-close>
                        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                            <template #header>
                                <div class="flex items-center justify-between">
                                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                        Create New Article
                                    </h3>
                                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="newArticleOpen = false" />
                                </div>
                            </template>
                            <div class="w-full grid grid-cols-2">
                                <UForm :schema="schema" :state="state" class="grid grid-cols-2 gap-5" :aria-disabled="creatingArticle">
                                    <UFormGroup label="Title" name="title">
                                        <UInput v-model="state.title" placeholder="Title, e.g. Example Article" :disabled="creatingArticle" />
                                    </UFormGroup>
                                    <UFormGroup label="Slug" name="slug">
                                        <UInput v-model="state.slug" placeholder="Slug, e.g. example-article" :disabled="creatingArticle"  />
                                    </UFormGroup>
                                </UForm>
                            </div>
                            <template #footer>
                                <div class="w-full flex items-center justify-end">
                                    <UButton @click="save()" :disabled="creatingArticle" >Create Article</UButton>
                                </div>
                            </template>
                        </UCard>
                    </UModal>
                </UDashboardPanelContent>
            </UDashboardPanel>
        </UDashboardPage>
    </DashboardLayout>
</template>

<style scoped>

</style>