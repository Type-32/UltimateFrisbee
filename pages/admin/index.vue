<script setup lang="ts">
import DashboardLayout from "~/layouts/DashboardLayout.vue";

definePageMeta({
    middleware: ['check-auth']
})

const route = useRoute()


</script>

<template>
<!--    <aside class="w-64 p-5 flex flex-col items-center shadow-md min-h-screen gap-5">-->
<!--        <div class="text-lg">SHUL Dashboard</div>-->
<!--        <UVerticalNavigation :links="links" class="w-full"/>-->
<!--    </aside>-->
<!--    <main>-->

<!--    </main>-->
    <DashboardLayout>
        <div class="w-full flex items-center justify-center">
            Check the sidebar and select the pages.
        </div>
    </DashboardLayout>
</template>

<style scoped>

</style>