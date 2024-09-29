<script setup lang="ts">

import DashboardLayout from "~/layouts/DashboardLayout.vue";
import {z} from "zod";
import {timeout} from "ioredis/built/utils";
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
        key: 'title',
        label: 'Title'
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
            await navigateTo(`/admin/article/${row.id as any as number}`)
        }
    }], [{
        label: 'Publish',
        icon: 'i-lucide-arrow-right',
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
        icon: 'i-lucide-archive',
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
        icon: 'i-lucide-trash',
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
        creatingArticle.value = true
        // console.log(useCookie('session_token').value)
        const data = await $util.newArticle(state.slug as any as string, state.title as any as string, 'Your Description Here...', 'Your Content Here...', false, useCookie('session_token').value as any as string)
        if(!data)
            throw new Error("Unable to create new Article. Please try again later.")

        timeout(() => {}, 1000)
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
            <UDashboardPanel grow :collapsible="false">
                <UDashboardNavbar title="Articles">
                    <template #right>
                        <UButton @click="newArticleOpen = true" icon="i-lucide-plus">New Article</UButton>
                    </template>
                </UDashboardNavbar>


                <UModal v-model="newArticleOpen" prevent-close class="h-full" :ui="{ height: 'h-full sm:h-auto', container: 'items-center'}">
                    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', container: 'w-fit' }">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                    Create New Article
                                </h3>
                                <UButton color="gray" variant="ghost" icon="i-lucide-x" class="-my-1" @click="newArticleOpen = false" :loading="creatingArticle" />
                            </div>
                        </template>
                        <div class="w-full">
                            <UForm :schema="schema" :state="state" class="w-full grid grid-cols-2 gap-5 max-w-none" :aria-disabled="creatingArticle">
                                <UFormGroup label="Title" name="title">
                                    <UInput v-model="state.title" placeholder="Title, e.g. Example Article" :loading="creatingArticle" />
                                </UFormGroup>
                                <UFormGroup label="Slug" name="slug">
                                    <UInput v-model="state.slug" placeholder="Slug, e.g. example-article" :loading="creatingArticle"  />
                                </UFormGroup>
                            </UForm>
                        </div>
                        <template #footer>
                            <div class="w-full flex items-center justify-end">
                                <UButton @click="save()" :loading="creatingArticle" >Create Article</UButton>
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