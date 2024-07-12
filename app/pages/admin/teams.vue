<script setup lang="ts">

import DashboardLayout from "~/layouts/DashboardLayout.vue";
import {z} from "zod";
import {timeout} from "ioredis/built/utils";
const loadingPage = ref(false), creatingTeam = ref(false)
const $util = useTeams(), $toast = useToast()
const newTeamOpen = ref(false)
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
        key: 'team_name',
        label: 'Name'
    },
    {
        key: 'team_abbv',
        label: 'Abbreviation'
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
        icon: 'i-heroicons-pencil-square-20-solid',
        click: async () => {
            await navigateTo(`/admin/team/${row.id as any as number}`)
        }
    }], [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: async () => {
            const data = await $util.deleteTeam(row.id as any as number, useCookie('session_token').value as any as string)
            if(!data)
                $toast.add({description: 'Unable to delete article. Please Try again.', color: 'red'})
            else
                $toast.add({description: 'Team is successfully deleted!', color: 'green'})

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
    rows.value = await $util.getTeams() as any[]
    loadingPage.value = false
}

const dataRef = ref({
    teamName: undefined,
    teamDesc: undefined
})

const schema = z.object({
    teamName: z.string().max(100, "Cannot exceed 100 Characters"),
    teamDesc: z.ostring(),
    teamAbbv: z.string().min(1, "Cannot exceed 1 Characters").max(5, 'Cannot exceed 5 Characters'),
})
type Schema = z.output<typeof schema>

const state = reactive({
    teamName: undefined,
    teamDesc: undefined,
    teamAbbv: undefined
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
        creatingTeam.value = true
        const data = await $util.newTeam(state.teamName as any as string, state.teamDesc as any as string, state.teamAbbv as any as string, useCookie('session_token').value as any as string)
        if(!data)
            throw new Error("Unable to create new Team. Please try again later.")

        timeout(() => {}, 1000)
        await navigateTo(`/admin/team/${data.id}`)
    } catch (e: any){
        $toast.add({description: e.statusMessage || e.message, color: "red"})
    }

    creatingTeam.value = false
}
</script>

<template>
    <DashboardLayout>
        <UDashboardPage>

            <UDashboardPanel grow :collapsible="false">
                <UDashboardNavbar title="Teams">
                    <template #right>
                        <UButton @click="newTeamOpen = true" icon="i-heroicons-plus">New Team</UButton>
                    </template>
                </UDashboardNavbar>


                <UModal v-model="newTeamOpen" prevent-close class="h-full" :ui="{ height: 'h-full sm:h-auto', container: 'items-center'}">
                    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', container: 'w-fit' }">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                    Create New Team
                                </h3>
                                <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="newTeamOpen = false" />
                            </div>
                        </template>
                        <div class="w-full">
                            <UForm :schema="schema" :state="state" class="w-full grid grid-cols-2 px-5 gap-5 max-w-none" :aria-disabled="creatingTeam">
                                <UFormGroup label="Team Name" name="teamName">
                                    <UInput v-model="state.teamName" placeholder="Team Name" :disabled="creatingTeam" />
                                </UFormGroup>
                                <UFormGroup label="Team Abbreviation" name="teamAbbv">
                                    <UInput v-model="state.teamAbbv" placeholder="Team Abbreviation" :disabled="creatingTeam"  />
                                </UFormGroup>
                                <UFormGroup label="Team Description" name="teamDesc" class="col-span-2">
                                    <UTextarea v-model="state.teamDesc" placeholder="Team Description" :disabled="creatingTeam"  />
                                </UFormGroup>
                            </UForm>
                        </div>
                        <template #footer>
                            <div class="w-full flex items-center justify-end">
                                <UButton @click="save()" :disabled="creatingTeam" >Create Team</UButton>
                            </div>
                        </template>
                    </UCard>
                </UModal>

                <UTable
                    :rows="rows"
                    :loading="loadingPage"
                    :columns="columns"
                    :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
                    :progress="{ color: 'primary', animation: 'carousel' }"
                    class="w-full"
                    :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
                >
                    <template #actions-data="{ row }">
                        <UDropdown :items="items(row)">
                            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
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