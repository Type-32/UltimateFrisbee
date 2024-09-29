<script setup lang="ts">
import type {Media} from "@prisma/client";

const props = defineProps({
    url: {
        type: String
    }
})
const $util = useMedia(), loading = ref(false)

function isImage(){
    return props.url?.endsWith(".jpeg") || props.url?.endsWith(".jpg") || props.url?.endsWith(".png")
}
function isVideo(){
    return props.url?.endsWith(".mp4") || props.url?.endsWith(".mkv") || props.url?.endsWith(".mov")
}
</script>

<template>
    <div class="min-h-64 max-h-72 rounded-lg w-full object-contain container p-4 ring-2 ring-gray-500/50 backdrop-blur-lg dark:bg-gray-800/50">
        <img v-if="isImage()" :src="$util.wrapMediaUrlStump(props.url || '')" class="object-contain w-full h-full rounded-lg" alt="media image"/>
        <video v-if="isVideo()" :src="$util.wrapMediaUrlStump(props.url || '')" class="object-contain w-full h-full rounded-lg"/>
    </div>
</template>

<style scoped>

</style>