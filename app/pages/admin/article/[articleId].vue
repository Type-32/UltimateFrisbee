<script setup lang="ts">

import DashboardLayout from "~/layouts/DashboardLayout.vue";
import {any, z} from "zod";
import type {FormSubmitEvent} from "#ui/types";

definePageMeta({
    middleware: ['check-auth']
})

const $route = useRoute(), $util = useArticles(), $toast = useToast(), loadingPage = ref(false)
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
    <DashboardLayout>
        <UDashboardPage>
            <UDashboardPanel grow>
                <UDashboardNavbar title="Edit Article">
                    <template #right>
                        <UButton variant="outline" to="/admin/articles" :disabled="loadingPage" >Cancel</UButton>
                        <UButton @click="edit()" :disabled="loadingPage" >Save Changes</UButton>
                    </template>
                </UDashboardNavbar>
                <UDashboardPanelContent class="h-full flex flex-col px-10 w-full gap-5 py-10">
                    <UForm :schema="schema" :state="state" class="grid grid-cols-1 gap-5" :aria-disabled="loadingPage">
                        <UFormGroup label="Title" name="title">
                            <UInput v-model="state.title" placeholder="Title, e.g. Example Article" :disabled="loadingPage" />
                        </UFormGroup>
                        <UFormGroup label="Description" name="description" class="col-span-2">
                            <UInput v-model="state.description" placeholder="Description, e.g. This is an example article" :disabled="loadingPage" />
                        </UFormGroup>
                        <UFormGroup label="Content" name="content" class="col-span-2">
                            <TiptapEditor class="col-span-2" v-model="state.content" :disabled="loadingPage"/>
                        </UFormGroup>
                    </UForm>
                </UDashboardPanelContent>
            </UDashboardPanel>
        </UDashboardPage>
    </DashboardLayout>
</template>

<style scoped>

</style>