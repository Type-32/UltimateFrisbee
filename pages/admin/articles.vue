<script setup lang="ts">

import DashboardLayout from "~/layouts/DashboardLayout.vue";
const loadingPage = ref(false)
const $util = useArticles(), $toast = useToast()
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
        key: 'description',
        label: 'Description'
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
    rows.value = await $util.getArticles() as any[]
    loadingPage.value = false
}
</script>

<template>
    <DashboardLayout>
        <div class="w-full px-10 py-10 flex flex-col gap-5">
            <div class="w-full flex flex-row items-center">
                <div class="text-3xl font-bold flex-grow">Articles</div>
                <UButton to="/admin/article/new">New Article</UButton>
            </div>
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
    </DashboardLayout>
</template>

<style scoped>

</style>