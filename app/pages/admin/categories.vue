<script setup lang="ts">

import DashboardLayout from "~/layouts/DashboardLayout.vue";
import {z} from "zod";
import {timeout} from "ioredis/built/utils";
import type {Category} from "@prisma/client";
const loadingPage = ref(false), creatingCategory = ref(false)
const $util = useCategories(), $toast = useToast()
const newCategoryOpen = ref(false)
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
        key: 'actions'
    }
]
const items = (row: any) => [
    [{
        label: 'Edit',
        icon: 'i-lucide-pencil',
        click: async () => {
            await navigateTo(`/admin/category/${row.id as any as number}`)
        }
    }], [{
        label: 'Delete',
        icon: 'i-lucide-trash',
        click: async () => {
            const data = await $util.deleteCategory([row.id as any as number], useCookie('session_token').value as any as string)
            if(!data)
                $toast.add({description: 'Unable to delete category. Please Try again.', color: 'red'})
            else
                $toast.add({description: 'Category is successfully deleted!', color: 'green'})

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
    rows.value = await $util.getCategories() as any
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
        creatingCategory.value = true
        const data = await $util.newCategory(state.name as any as string, useCookie('session_token').value as any as string)
        if(!data)
            throw new Error("Unable to create new Category. Please try again later.")

        timeout(() => {}, 1000)
        await navigateTo(`/admin/category/${data.id}`)
    } catch (e: any){
        $toast.add({description: e.statusMessage || e.message, color: "red"})
    }

    creatingCategory.value = false
}
</script>

<template>
    <DashboardLayout>
        <UDashboardPage>
            <UDashboardPanel grow :collapsible="false">
                <UDashboardNavbar title="Categories">
                    <template #right>
                        <UButton @click="newCategoryOpen = true" icon="i-lucide-plus">New Category</UButton>
                    </template>
                </UDashboardNavbar>


                <UModal v-model="newCategoryOpen" prevent-close class="h-full" :ui="{ height: 'h-full sm:h-auto', container: 'items-center'}">
                    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', container: 'w-fit' }">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                    Create New Category
                                </h3>
                                <UButton color="gray" variant="ghost" icon="i-lucide-x" class="-my-1" @click="newCategoryOpen = false" :loading="creatingCategory" />
                            </div>
                        </template>
                        <div class="w-full">
                            <UForm :schema="schema" :state="state" class="w-full grid grid-cols-2 gap-5 max-w-none" :aria-disabled="creatingCategory">
                                <UFormGroup label="Name" name="name">
                                    <UInput v-model="state.name" placeholder="Title, e.g. Example Category" :loading="creatingCategory" />
                                </UFormGroup>
                            </UForm>
                        </div>
                        <template #footer>
                            <div class="w-full flex items-center justify-end">
                                <UButton @click="save()" :loading="creatingCategory" >Create Category</UButton>
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
                </UTable>
            </UDashboardPanel>
        </UDashboardPage>
    </DashboardLayout>
</template>

<style scoped>

</style>