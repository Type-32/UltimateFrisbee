<script setup lang="ts">

import DashboardLayout from "~/layouts/DashboardLayout.vue";
import {any, z} from "zod";
import type {FormSubmitEvent} from "#ui/types";

definePageMeta({
    middleware: ['check-auth']
})

const $route = useRoute(), $util = useMatches(), $toast = useToast(), loadingPage = ref(false), $team = useTeams()

const teamOptions: any[] = []
const dataRef = ref({
    homeTeamId: undefined,
    guestTeamId: undefined,
    homeTeamScore: undefined,
    guestTeamScore: undefined
})
const matchId = parseInt($route.params.matchId as string);
console.log(matchId)
const matchPublished = ref(false)

onMounted(async () => {
    try {
        loadingPage.value = true
        const data = await $util.getMatchesByIDs([matchId])
        if(data.length == 0)
            throw new Error("Match not found.")
        dataRef.value.homeTeamId = data.at(0)?.homeTeamId as any
        dataRef.value.guestTeamId = data.at(0)?.guestTeamId as any
        dataRef.value.homeTeamScore = data.at(0)?.home_score as any
        dataRef.value.guestTeamScore = data.at(0)?.guest_score as any

        const teams = await $team.getTeams()
        teams.forEach((team: any) => {
            teamOptions.push({
                label: team.team_name,
                value: team.id
            })
        })

        loadingPage.value = false
    } catch (e: any) {
        $toast.add({description: e.message, color: "red"})
        await navigateTo('/admin/matches')
    }
})

const content = ref('<p></p>')

const schema = z.object({
    homeTeamId: z.bigint(),
    guestTeamId: z.bigint(),
    homeTeamScore: z.bigint(),
    guestTeamScore: z.bigint(),
})
type Schema = z.output<typeof schema>

const state = reactive(dataRef.value)

async function onSubmit (event: FormSubmitEvent<Schema>) {
    await edit()
}

async function edit() {
    try {
        loadingPage.value = true
        const data = await $util.editMatch(matchId, state.homeTeamId as any as number, state.guestTeamId as any as number, state.homeTeamScore as any as number, state.guestTeamScore as any as number, useCookie('session_token').value as any as string)
        if(!data)
            throw new Error("Edit unsuccessful. Please try again later.")
        await navigateTo('/admin/matches')
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
                <UDashboardNavbar title="Edit Match">
                    <template #right>
                        <UButton variant="outline" to="/admin/matches" :disabled="loadingPage" >Cancel</UButton>
                        <UButton @click="edit()" :disabled="loadingPage" >Save Changes</UButton>
                    </template>
                </UDashboardNavbar>
                <UDashboardPanelContent class="h-full flex flex-col px-10 w-full gap-5 py-10">
                    <UForm :schema="schema" :state="state" class="flex flex-col gap-5" :aria-disabled="loadingPage">
                        <UFormGroup label="Home Team" name="homeTeamId">
                            <USelect :options="teamOptions" v-model="state.homeTeamId" placeholder="Home Team" :disabled="loadingPage" />
                        </UFormGroup>
                        <UFormGroup label="Guest Team" name="guestTeamId">
                            <USelect :options="teamOptions" v-model="state.guestTeamId" placeholder="Guest Team" :disabled="loadingPage" />
                        </UFormGroup>
                        <UFormGroup label="Home Team Score" name="homeTeamScore">
                            <UInput v-model="state.homeTeamScore" placeholder="Home Team Score" type="number" :disabled="loadingPage" />
                        </UFormGroup>
                        <UFormGroup label="Guest Team Score" name="guestTeamScore">
                            <UInput v-model="state.guestTeamScore" placeholder="Guest Team Score" type="number" :disabled="loadingPage" />
                        </UFormGroup>
                    </UForm>
                </UDashboardPanelContent>
            </UDashboardPanel>
        </UDashboardPage>
    </DashboardLayout>
</template>

<style scoped>

</style>