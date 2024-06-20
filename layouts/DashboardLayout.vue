<script setup lang="ts">
const links = [
    {
        label: 'Articles',
        icon: 'i-heroicons-home',
        to: '/admin/articles'
    },
    {
        label: 'Matches',
        icon: 'i-heroicons-chart-bar',
        to: `/admin/matches`
    },
    {
        label: 'Teams',
        icon: 'i-heroicons-users',
        to: '/admin/teams'
    },
    {
        label: 'Users',
        icon: 'i-heroicons-command-line',
        to: '/admin/users'
    }
]
</script>

<template>
    <div class="min-h-screen w-full flex flex-row">
        <UDashboardPanel :width="300" :resizable="{ min: 200, max: 400 }">
            <UDashboardNavbar>
                <template #left>
                    <div class="text-primary">SHUL Admin</div>
                </template>
            </UDashboardNavbar>

            <UDashboardSidebar>
                <UDashboardSidebarLinks :links="links"/>
            </UDashboardSidebar>
        </UDashboardPanel>
        <slot/>
    </div>
</template>

<style scoped>
div, main {
    font-family: Inter, sans-serif;
}
</style>