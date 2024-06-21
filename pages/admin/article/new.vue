<script setup lang="ts">

import DashboardLayout from "~/layouts/DashboardLayout.vue";
import {z} from "zod";
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

const schema = z.object({
    title: z.string().max( 255, 'Cannot be over 255 characters'),
    description: z.ostring(),
    slug: z.string().max( 255, 'Cannot be over 255 characters').toLowerCase(),
    content: z.ostring()
})
type Schema = z.output<typeof schema>

const state = reactive({
    title: undefined,
    description: undefined,
    slug: undefined,
    content: undefined,
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
    // Do something with data
    console.log(event.data)
    await save(false)
}

async function save(saveAsDraft: boolean) {
    try {
        loadingPage.value = true
        // console.log(useCookie('session_token').value)
        const data = await $util.newArticle(state.slug as any as string, state.title as any as string, state.description as any as string || '', state.content as any as string || '', saveAsDraft, useCookie('session_token').value as any as string)
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
        <div class="w-full">
            <div class="h-full flex flex-col px-10 w-full gap-5 py-10">
                <div class="text-2xl font-bold">Create Article</div>
                <UForm :schema="schema" :state="state" class="grid grid-cols-2 gap-5" @submit="onSubmit" :aria-disabled="loadingPage">
                    <UFormGroup label="Title" name="title">
                        <UInput v-model="state.title" placeholder="Title, e.g. Example Article" :disabled="loadingPage" />
                    </UFormGroup>
                    <UFormGroup label="Slug" name="slug">
                        <UInput v-model="state.slug" placeholder="Slug, e.g. example-article" :disabled="loadingPage"  />
                    </UFormGroup>
                    <UFormGroup label="Description" name="description" class="col-span-2">
                        <UInput v-model="state.description" placeholder="Description, e.g. This is an example article" :disabled="loadingPage"  />
                    </UFormGroup>
                    <UFormGroup label="Content" name="content" class="col-span-2">
                        <TiptapEditor class="col-span-2" v-model="state.content" :disabled="loadingPage" />
                    </UFormGroup>
                </UForm>
            </div>
            <div class="bottom-0 justify-end flex flex-row gap-5 sticky ring-1 ring-black/10 -mt-14 p-3">
                <UButton variant="outline" to="/admin/articles" :disabled="loadingPage" >Cancel</UButton>
                <UButton variant="outline" @click="save(false)" :disabled="loadingPage" >Save Draft</UButton>
                <UButton @click="save(true)" :disabled="loadingPage" >Publish Draft</UButton>
            </div>
        </div>
    </DashboardLayout>
</template>

<style scoped>

</style>