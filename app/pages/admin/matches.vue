<script setup lang="ts">

import DashboardLayout from "~/layouts/DashboardLayout.vue";
import {z} from "zod";
import {timeout} from "ioredis/built/utils";
import useMatches from "~/composables/useMatches";
import type {Team} from "@prisma/client";
const loadingPage = ref(false), creatingMatch = ref(false)
const $util = useMatches(), $toast = useToast(), $team = useTeams()
const newMatchOpen = ref(false)
const page = ref(1)
const pageCount = 9

definePageMeta({
    middleware: ['check-auth']
})

const columns = [
    {
        key: 'home',
        label: 'Home Team'
    },
    {
        key: 'guest',
        label: 'Guest Team'
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
            await navigateTo(`/admin/match/${row.id as any as number}`)
        }
    }], [{
        label: 'Delete',
        icon: 'i-lucide-trash',
        click: async () => {
            const data = await $util.deleteMatch(row.id as any as number, useCookie('session_token').value as any as string)
            if(!data)
                $toast.add({description: 'Unable to delete article. Please Try again.', color: 'red'})
            else
                $toast.add({description: 'Match is successfully deleted!', color: 'green'})

            await refreshPage()
        }
    }]
]

const rows = ref([] as any[])

const teamItem = ref([] as any[])

const teamsData = ref([] as any[])

onMounted(async () => {
    await refreshPage()
})

onBeforeMount(async () => {
    let teams = await $team.getTeams()
    teamsData.value = teams;
    teams.forEach((item: any) => {
        teamItem.value.push({
            label: item.team_name,
            value: item.id as any as number,
        })
    })
})

async function refreshPage(){
    loadingPage.value = true
    rows.value = await $util.getMatches() as any[]
    loadingPage.value = false
}

const dataRef = ref({
    homeTeamId: undefined,
    guestTeamId: undefined
})

const schema = z.object({
    homeTeamId: z.string(),
    guestTeamId: z.string()
})
type Schema = z.output<typeof schema>

const state = reactive(dataRef.value)

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
        // console.log(state.homeTeamId)
        // return;
        creatingMatch.value = true
        const data = await $util.newMatch(parseInt(state.homeTeamId as any as string), parseInt(state.guestTeamId as any as string), useCookie('session_token').value as any as string)
        if(!data)
            throw new Error("Unable to create new Match. Please try again later.")

        timeout(() => {}, 1000)
        await navigateTo(`/admin/match/${data.id}`)
    } catch (e: any){
        $toast.add({description: e.statusMessage || e.message, color: "red"})
    }

    creatingMatch.value = false
}

function getTeamNameWithId(index: number){
    // console.log(index)
    for(let i = 0; i < teamItem.value.length; i++){
        if(teamItem.value[i].value == index){
            return teamItem.value[i].label
        }
    }
}
</script>

<template>
    <DashboardLayout>
        <UDashboardPage>

            <UDashboardPanel grow :collapsible="false">
                <UDashboardNavbar title="Matches">
                    <template #right>
                        <UButton @click="newMatchOpen = true" icon="i-lucide-plus">New Match</UButton>
                    </template>
                </UDashboardNavbar>


                <UModal v-model="newMatchOpen" prevent-close class="h-full" :ui="{ height: 'h-full sm:h-auto', container: 'items-center'}">
                    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', container: 'w-fit' }">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                    Create New Match
                                </h3>
                                <UButton color="gray" variant="ghost" icon="i-lucide-x" class="-my-1" @click="newMatchOpen = false" />
                            </div>
                        </template>
                        <div class="w-full">
                            <UForm :schema="schema" :state="state" class="w-full grid grid-cols-2 gap-5 max-w-none" :aria-disabled="creatingMatch">
                                <UFormGroup label="Home Team" name="homeTeamId">
                                    <USelect :options="teamItem" v-model="state.homeTeamId" placeholder="Home Team" :disabled="creatingMatch" />
                                </UFormGroup>
                                <UFormGroup label="Guest Team" name="guestTeamId">
                                    <USelect :options="teamItem" v-model="state.guestTeamId" placeholder="Guest Team" :disabled="creatingMatch"  />
                                </UFormGroup>
                            </UForm>
                        </div>
                        <template #footer>
                            <div class="w-full flex items-center justify-end">
                                <UButton @click="save()" :disabled="creatingMatch" >Create Match</UButton>
                            </div>
                        </template>
                    </UCard>
                </UModal>

                <UTable
                    :rows="rows"
                    :loading="loadingPage"
                    :columns="columns"
                    :loading-state="{ icon: 'i-lucide-arrow-cw', label: 'Loading...' }"
                    :progress="{ color: 'primary', animation: 'carousel' }"
                    class="w-full"
                    :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
                >
                    <template #home-data="{ row }">
                        <span>{{ getTeamNameWithId(row.homeTeamId) }}</span>
                    </template>
                    <template #guest-data="{ row }">
                        <span>{{ getTeamNameWithId(row.guestTeamId) }}</span>
                    </template>
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