<script setup lang="ts">

import DashboardLayout from "~/layouts/DashboardLayout.vue";

definePageMeta({
    middleware: ['check-auth']
})

const route = useRoute()


</script>

<template>
    <DashboardLayout>
        <UDashboardPage>
            <UDashboardPanel grow :collapsible="false">
                <UDashboardNavbar title="Home"/>

                <UDashboardPanelContent>
                    <div class="flex items-center justify-center">
                        WIP. Will add user management features in the future.
                    </div>
                </UDashboardPanelContent>
            </UDashboardPanel>
        </UDashboardPage>
    </DashboardLayout>
</template>

<style scoped>

</style>