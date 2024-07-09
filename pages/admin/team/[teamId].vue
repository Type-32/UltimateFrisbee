<script setup lang="ts">

import DashboardLayout from "~/layouts/DashboardLayout.vue";
import {any, z} from "zod";
import type {FormSubmitEvent} from "#ui/types";

definePageMeta({
    middleware: ['check-auth']
})

const $route = useRoute(), $util = useTeams(), $toast = useToast(), loadingPage = ref(false)
const dataRef = ref({
    name: undefined,
    desc: undefined,
    abbv: undefined
})
const teamId = parseInt($route.params.teamId as string);
console.log(teamId)
const teamPublished = ref(false)

onMounted(async () => {
    try {
        loadingPage.value = true
        const data = await $util.getTeamsByIDs([teamId])
        if(data.length == 0)
            throw new Error("Team not found.")
        dataRef.value.name = data.at(0)?.team_name as any
        dataRef.value.desc = data.at(0)?.team_desc as any
        dataRef.value.abbv = data.at(0)?.team_abbv as any

        loadingPage.value = false
    } catch (e: any) {
        $toast.add({description: e.message, color: "red"})
        await navigateTo('/admin/teams')
    }
})

const content = ref('<p></p>')

const schema = z.object({
    name: z.string().max( 100, 'Cannot be over 100 Characters'),
    desc: z.ostring(),
    abbv: z.string().min(1, "Cannot be under 1 character").max(5, 'Cannot exceed 5 Characters'),
})
type Schema = z.output<typeof schema>

const state = reactive(dataRef.value)

async function onSubmit (event: FormSubmitEvent<Schema>) {
    await edit()
}

async function edit() {
    try {
        loadingPage.value = true
        const data = await $util.editTeam(teamId, state.name as any as string, state.desc as any as string, state.abbv as any as string, useCookie('session_token').value as any as string)
        if(!data)
            throw new Error("Edit unsuccessful. Please try again later.")
        await navigateTo('/admin/teams')
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
                <UDashboardNavbar title="Edit Team">
                    <template #right>
                        <UButton variant="outline" to="/admin/teams" :disabled="loadingPage" >Cancel</UButton>
                        <UButton @click="edit()" :disabled="loadingPage" >Save Changes</UButton>
                    </template>
                </UDashboardNavbar>
                <UDashboardPanelContent class="h-full flex flex-col px-10 w-full gap-5 py-10">
                    <UForm :schema="schema" :state="state" class="flex flex-col gap-5" :aria-disabled="loadingPage">
                        <UFormGroup label="Team Name" name="name">
                            <UInput v-model="state.name" placeholder="Title, e.g. Example Team" :disabled="loadingPage" />
                        </UFormGroup>
                        <UFormGroup label="Team Abbreviation" name="abbv">
                            <UInput v-model="state.abbv" placeholder="Abbreviation, e.g. 'SCIE'" :disabled="loadingPage" />
                        </UFormGroup>
                        <UFormGroup label="Team Description" name="desc" class="col-span-2">
                            <UTextarea v-model="state.desc" placeholder="Description, e.g. This is an example team" :disabled="loadingPage" />
                        </UFormGroup>
                    </UForm>
                </UDashboardPanelContent>
            </UDashboardPanel>
        </UDashboardPage>
    </DashboardLayout>
</template>

<style scoped>

</style>