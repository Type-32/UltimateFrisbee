<script setup lang="ts">

import MainLayout from "~/layouts/MainLayout.vue";
import type {Match, Team} from "@prisma/client";

const $util = useMatches(), $team = useTeams()
const loadingPage = ref(false), matches = ref<Match[]>([] as any[]), teams = ref<Team[]>([] as any[])

onMounted(async () =>{
    loadingPage.value = true
    matches.value = await $util.getMatches()
    matches.value = matches.value.reverse()
    teams.value = await $team.getTeams()
    loadingPage.value = false
})

function getTeamDataWithId(index: number){
    // console.log(index)
    for(let i = 0; i < teams.value.length; i++){
        if(teams.value[i].id == index){
            return teams.value[i]
        }
    }
}
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
    <MainLayout>
        <UContainer>
            <UPage>
                <UPageHeader
                    title="Matches"
                    description="A list of all of our past matches."
                />
                <UPageBody>
                    <div class="grid desktop:grid-cols-2 grid-cols-1 gap-5">
                        <UCard v-for="(match, index) in matches" :key="index">
                            <template #header>
                                <div class="grid grid-cols-3">
                                    <UBadge color="green" variant="subtle" size="lg" class="w-fit justify-self-center">Home</UBadge>
                                    <span class="text-sm opacity-70 text-center items-center align-middle justify-self-center">Match on {{parseAndFormatDate((match.createdAt as any))}}</span>
                                    <UBadge color="blue" variant="subtle" size="lg" class="w-fit justify-self-center">Guest</UBadge>
                                </div>
                            </template>
                            <div class="grid grid-cols-3">
                                <div :class="`text-8xl text-center ${match.home_score > match.guest_score ? 'font-bold' : ''}`">{{match.home_score}}</div>
                                <UDivider label="VS" orientation="vertical"/>
                                <div :class="`text-8xl text-center ${match.guest_score > match.home_score ? 'font-bold' : ''}`">{{match.guest_score}}</div>
                            </div>
                            <template #footer>
                                <div class="grid grid-cols-3">
                                    <UBadge color="green" variant="soft" size="sm" class="w-fit justify-self-center">{{getTeamDataWithId(match.homeTeamId)?.team_name}}</UBadge>
                                    <div/>
                                    <UBadge color="blue" variant="soft" size="sm" class="w-fit justify-self-center">{{getTeamDataWithId(match.guestTeamId)?.team_name}}</UBadge>
                                </div>
                            </template>
                        </UCard>
                    </div>
                </UPageBody>
            </UPage>
        </UContainer>
    </MainLayout>
</template>

<style scoped>

</style>