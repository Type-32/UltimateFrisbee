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
            <UDashboardPanel grow>
                <UDashboardNavbar title="Home"/>

                <UDashboardPanelContent>
                    <div class="flex items-center justify-center">
                        Check the sidebar and select the pages.
                    </div>
                </UDashboardPanelContent>
            </UDashboardPanel>
        </UDashboardPage>
    </DashboardLayout>
</template>

<style scoped>

</style>