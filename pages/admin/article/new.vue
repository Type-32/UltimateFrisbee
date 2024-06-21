<script setup lang="ts">

import DashboardLayout from "~/layouts/DashboardLayout.vue";
import {z} from "zod";
import type {FormSubmitEvent} from "#ui/types";

const content = ref('<p></p>')

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
}
</script>

<template>
    <DashboardLayout>
        <div class="w-full">
            <div class="h-full flex flex-col px-10 w-full gap-5 py-10">
                <div class="text-2xl font-bold">Create Article</div>
                <UForm :schema="schema" :state="state" class="grid grid-cols-2 gap-5" @submit="onSubmit">
                    <UFormGroup label="Title" name="title">
                        <UInput v-model="state.title" placeholder="Title, e.g. Example Article" />
                    </UFormGroup>
                    <UFormGroup label="Slug" name="slug">
                        <UInput v-model="state.slug" placeholder="Slug, e.g. example-article" />
                    </UFormGroup>
                    <UFormGroup label="Description" name="description" class="col-span-2">
                        <UInput v-model="state.description" placeholder="Description, e.g. This is an example article" />
                    </UFormGroup>
                    <UFormGroup label="Content" name="content" class="col-span-2">
                        <TiptapEditor class="col-span-2" v-model="content"/>
                    </UFormGroup>
                </UForm>
            </div>
            <div class="bottom-0 justify-end flex flex-row gap-5 sticky ring-1 ring-black/10 -mt-14 p-3">
                <UButton variant="outline">Cancel</UButton>
                <UButton variant="outline">Save Draft</UButton>
                <UButton>Publish Draft</UButton>
            </div>
        </div>
    </DashboardLayout>
</template>

<style scoped>

</style>