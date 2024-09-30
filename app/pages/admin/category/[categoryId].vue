<script setup lang="ts">

import DashboardLayout from "~/layouts/DashboardLayout.vue";
import {ref} from "vue";
import {z} from "zod";
import type {FormSubmitEvent} from "#ui/types";
import type {Category, Gallery} from "@prisma/client";

definePageMeta({
    middleware: ['check-auth']
})

const $route = useRoute(), $util = useCategories(), $toast = useToast(), loadingPage = ref(false), settingsModal = ref(false)
const rows = ref([]), $gallery = useGalleries()

const dataRef = ref({
    name: undefined
})

const categoryId = parseInt($route.params.categoryId as string);
console.log(categoryId)
const selected = ref<Gallery[]>()

onMounted(async () => {
    try {
        loadingPage.value = true

        const data = await $util.getCategory([categoryId])
        if(data.length == 0)
            throw new Error("Category not found.")
        dataRef.value.name = data.at(0)?.name as any
        rows.value = await $gallery.getGalleries()
        selected.value = await $util.getCategoryGalleries(categoryId)

        loadingPage.value = false
    } catch (e: any) {
        $toast.add({description: e.message, color: "red"})
        await navigateTo('/admin/categories')
    }
})

const schema = z.object({
    name: z.string()
})
type Schema = z.output<typeof schema>

const state = reactive(dataRef.value)

async function onSubmit (event: FormSubmitEvent<Schema>) {
    await edit()
}

async function edit() {
    try {
        loadingPage.value = true
        const data = await $util.editCategory(categoryId, state.name as any as string, selected.value?.map(m => m.id) as any as number[], useCookie('session_token').value as any as string)
        if(!data)
            throw new Error("Edit unsuccessful. Please try again later.")
        await navigateTo('/admin/categories')
    } catch (e: any){
        $toast.add({description: e.statusMessage || e.message, color: "red"})
    }
    loadingPage.value = false
}

const columns = [
    {
        key: 'id',
        label: 'ID'
    },
    {
        key: 'name',
        label: 'Galleries'
    },
    {
        key: 'updatedAt',
        label: 'Updated At'
    }
]

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
    <DashboardLayout>
        <UDashboardPage>
            <UDashboardPanel grow>
                <UDashboardNavbar title="Edit Galleries in Category">
                    <template #right>
                        <UButton variant="ghost" @click="settingsModal = true" icon="i-lucide-settings"/>
                        <UButton variant="outline" to="/admin/categories" :disabled="loadingPage" >Cancel</UButton>
                        <UButton @click="edit()" :disabled="loadingPage" >Save Changes</UButton>
                    </template>
                </UDashboardNavbar>
                <UDashboardPanelContent class="h-full flex flex-col p-0 w-full gap-5">
                    <UTable
                        :rows="rows"
                        :loading="loadingPage"
                        :columns="columns"
                        :loading-state="{ icon: 'i-lucide-rotate-cw', label: 'Loading...' }"
                        :progress="{ color: 'primary', animation: 'carousel' }"
                        class="w-full"
                        :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
                        v-model="selected"
                    >
                        <template #updatedAt-data="{ row }">
                            <span>{{ parseAndFormatDate(row.updatedAt) }}</span>
                        </template>
                    </UTable>
                </UDashboardPanelContent>
                <UModal v-model="settingsModal" class="h-full" :ui="{ height: 'h-full sm:h-auto', container: 'items-center'}">
                    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', container: 'w-fit p-5' }">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                    Category Properties
                                </h3>
                                <UButton color="gray" variant="ghost" icon="i-lucide-x" class="-my-1" @click="settingsModal = false" :loading="loadingPage" />
                            </div>
                        </template>
                        <div class="w-full">
                            <UForm :schema="schema" :state="state" class="grid grid-cols-1 gap-5" :aria-disabled="loadingPage">
                                <UFormGroup label="Name" name="name">
                                    <UInput v-model="state.name" placeholder="Name, e.g. My Category" :disabled="loadingPage" />
                                </UFormGroup>
                            </UForm>
                        </div>
                    </UCard>
                </UModal>
            </UDashboardPanel>
        </UDashboardPage>
    </DashboardLayout>
</template>

<style scoped>

</style>