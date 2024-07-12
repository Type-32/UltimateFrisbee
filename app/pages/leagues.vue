<script setup lang="ts">

import MainLayout from "~/layouts/MainLayout.vue";

const columns = [
    {
        key: 'teamName',
        label: 'Team Name'
    },
    {
        key: 'wins',
        label: 'W'
    },
    {
        key: 'draws',
        label: 'D'
    },
    {
        key: 'loses',
        label: 'L'
    },
    {
        key: 'totalPoints',
        label: 'Pts'
    }
]

const {data, pending} = await useFetch('/api/v1/statistics', {lazy: true})

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
                    title="Leagues"
                    description="A place where all information of the teams are listed out in a formatted table."
                />
                <UPageBody>
                    <UTable :columns="columns" :rows="data as any[]" :loading="pending"/>
                </UPageBody>
            </UPage>
        </UContainer>
    </MainLayout>
</template>

<style scoped>

</style>