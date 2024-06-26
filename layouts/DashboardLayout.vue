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

const selected = ref(null)

const isOpen = computed({
    get () {
        return !!selected.value
    },
    set (value: boolean) {
        if (!value) {
            selected.value = null
        }
    }
})
</script>

<template>
    <UDashboardLayout>
        <UDashboardPanel side="left" class="max-w-56 desktop:max-w-80 border-r-[1px]">
            <UDashboardNavbar title="SHUL Dashboard" class="!border-transparent"/>
            <UDashboardSidebar>
                <template #header>

                </template>
                <UDashboardSidebarLinks :links="links"/>
            </UDashboardSidebar>
        </UDashboardPanel>
        <slot/>
        <UDashboardSlideover v-model="isOpen" title="Notifications" />
    </UDashboardLayout>
</template>

<style scoped>
div, main {
    font-family: Inter, sans-serif;
}
</style>