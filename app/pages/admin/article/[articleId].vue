<script setup lang="ts">

import DashboardLayout from "~/layouts/DashboardLayout.vue";
import {any, z} from "zod";
import type {FormSubmitEvent} from "#ui/types";

definePageMeta({
    middleware: ['check-auth']
})

const $route = useRoute(), $util = useArticles(), $toast = useToast(), loadingPage = ref(false), settingsModal = ref(false)
const dataRef = ref({
    title: undefined,
    description: undefined,
    slug: undefined,
    content: undefined,
})
const articleId = parseInt($route.params.articleId as string);
console.log(articleId)
const articlePublished = ref(false)

onMounted(async () => {
    try {
        loadingPage.value = true
        const data = await $util.getArticlesByIDs([articleId])
        articlePublished.value = data.at(0)?.published as any as boolean
        if(data.length == 0)
            throw new Error("Article not found.")
        dataRef.value.title = data.at(0)?.title as any
        dataRef.value.description = data.at(0)?.description as any
        dataRef.value.slug = data.at(0)?.slug as any
        dataRef.value.content = data.at(0)?.content as any

        loadingPage.value = false
    } catch (e: any) {
        $toast.add({description: e.message, color: "red"})
        await navigateTo('/admin/articles')
    }
})

const content = ref('<p></p>')

const schema = z.object({
    title: z.string().max( 255, 'Cannot be over 255 characters'),
    description: z.ostring(),
    content: z.ostring()
})
type Schema = z.output<typeof schema>

const state = reactive(dataRef.value)

async function onSubmit (event: FormSubmitEvent<Schema>) {
    await edit()
}

async function edit() {
    try {
        loadingPage.value = true
        const data = await $util.editArticle(articleId, state.title as any as string, state.description as any as string, state.content as any as string, articlePublished.value, useCookie('session_token').value as any as string)
        if(!data)
            throw new Error("Edit unsuccessful. Please try again later.")
        await navigateTo('/admin/articles')
    } catch (e: any){
        $toast.add({description: e.statusMessage || e.message, color: "red"})
    }
    loadingPage.value = false
}
</script>

<template>
    <UDashboardPage>
        <UDashboardPanel grow>
            <UDashboardNavbar title="Edit Article" class="top-0 sticky z-10 bg-transparent backdrop-blur-sm bg-white/50">
                <template #right>
                    <UButton variant="ghost" @click="settingsModal = true" icon="i-lucide-settings"/>
                    <UButton variant="outline" to="/admin/articles" :disabled="loadingPage" >Cancel</UButton>
                    <UButton @click="edit()" :disabled="loadingPage" >Save Changes</UButton>
                </template>
            </UDashboardNavbar>
            <UDashboardPanelContent class="h-full flex flex-col w-full gap-5 p-0">
                <UForm :schema="schema" :state="state" class="grid grid-cols-1 gap-5" :aria-disabled="loadingPage">
                    <UFormGroup label="" name="content">
                        <TiptapEditor full v-model="state.content" :disabled="loadingPage"/>
                    </UFormGroup>
                </UForm>
            </UDashboardPanelContent>

            <UModal v-model="settingsModal" class="h-full" :ui="{ height: 'h-full sm:h-auto', container: 'items-center'}">
                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', container: 'w-fit p-5' }">
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                Article Properties
                            </h3>
                            <UButton color="gray" variant="ghost" icon="i-lucide-x" class="-my-1" @click="settingsModal = false" :loading="loadingPage" />
                        </div>
                    </template>
                    <div class="w-full">
                        <UForm :schema="schema" :state="state" class="grid grid-cols-1 gap-5" :aria-disabled="loadingPage">
                            <UFormGroup label="Title" name="title">
                                <UInput v-model="state.title" placeholder="Title, e.g. Example Article" :disabled="loadingPage" />
                            </UFormGroup>
                            <UFormGroup label="Description" name="description">
                                <UInput v-model="state.description" placeholder="Description, e.g. This is an example article" :disabled="loadingPage" />
                            </UFormGroup>
                        </UForm>
                    </div>
                </UCard>
            </UModal>
        </UDashboardPanel>
    </UDashboardPage>
</template>

<style scoped>

</style>