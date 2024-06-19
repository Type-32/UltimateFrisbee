<script setup lang="ts">

</script>

<template>
    <div class="w-full top-0 sticky flex items-center justify-center z-10">
        <div class="text-2xl text-primary p-4">Ultimate Frisbee</div>
    </div>
    <main>
        <slot/>
    </main>
</template>

<style scoped>
div, main {
    font-family: Inter, Inter, sans-serif;
}
</style>