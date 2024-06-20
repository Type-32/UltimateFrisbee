<script setup lang="ts">

import DashboardLayout from "~/layouts/DashboardLayout.vue";
const loadingPage = ref(false)
const $util = useArticles()
const page = ref(1)
const pageCount = 9

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

const items = (row) => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => console.log('Edit', row.id)
    }, {
        label: 'Duplicate',
        icon: 'i-heroicons-document-duplicate-20-solid'
    }], [{
        label: 'Unpublish',
        icon: 'i-heroicons-archive-box-20-solid'
    }, {
        label: 'Publish',
        icon: 'i-heroicons-arrow-right-circle-20-solid'
    }], [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid'
    }]
]

const rows = ref([] as any[])

onMounted(async () => {
    loadingPage.value = true
    rows.value = await $util.getArticles() as any[]
    loadingPage.value = false
})
</script>

<template>
    <DashboardLayout>
        <div class="w-full px-10 py-10 flex flex-col gap-5">
            <div class="w-full flex flex-row items-center">
                <div class="text-3xl font-bold flex-grow">Articles</div>
                <UButton>New Article</UButton>
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