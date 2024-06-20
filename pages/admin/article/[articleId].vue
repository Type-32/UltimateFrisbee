<script setup lang="ts">

import DashboardLayout from "~/layouts/DashboardLayout.vue";
import TiptapEditor from "~/components/TiptapEditor.vue";
</script>

<template>
    <DashboardLayout>
        <div class="h-full flex flex-col px-10 w-full gap-5 py-10">
            <div class="text-2xl font-bold">Create Article</div>
            <div class="w-full grid grid-cols-2">
                <div>

                </div>
                <TiptapEditor class="col-span-2"/>
            </div>
        </div>
    </DashboardLayout>
</template>

<style scoped>

</style>