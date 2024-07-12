<script setup lang="ts">
import type {PropType} from "vue";

const columns = [
    {
        key: 'fileName',
        label: 'Name',
        sortable: true,
    },
    {
        key: 'createdAt',
        label: 'Created At'
    }
]

const emits = defineEmits<{
    (e: 'onforwards', fordir: string, forPseudo: string): void
}>()

const props = defineProps({
    modelValue: {
        type: Array,
        default: null
    },
    rows: {
        type: Array as PropType<{ [key: string]: any }[]>,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    },
    routeForwards: {
        type: Boolean,
        default: true
    }
})

const handleForwards = async (fordir: string, forPseudo: string) => {
    emits('onforwards', fordir, forPseudo)
    if(props.routeForwards) {
        await navigateTo(`/admin${fordir}`)
    }
}

function joinUrl(str: string): string{
    const runtimeConfig = useRuntimeConfig()
    return runtimeConfig.public.siteUrl + str
}

function select (row: any) {
    //@ts-ignore
    const index = props.modelValue.findIndex((item) => item.id === row.id)
    if (index === -1) {
        props.modelValue.push(row as never)
    } else {
        props.modelValue.splice(index, 1)
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
    <UTable :columns="columns" v-model="props.modelValue" :rows="props.rows" :loading="props.loading" @select="select">
        <template #fileName-data="{row}">
            <div class="flex flex-row gap-3 items-center">
                <span v-if="!row.isFolder" class="flex flex-row gap-3 items-center"><UTooltip text="Click to preview"><nuxt-img @click="navigateTo(joinUrl(row.url), {external: true})" v-if="row.url.endsWith('.png') || row.url.endsWith('.jpg') || row.url.endsWith('.jpeg')" :src="joinUrl(row.url)" alt="preview" class="object-contain size-8"/></UTooltip> {{row.fileName}}</span>
                <span v-else><UButton icon="i-mdi-folder" @click="handleForwards(row.url, row.pseudoDirectory)" :label="row.fileName"/></span>
            </div>
        </template>
        <template #updatedAt-data="{ row }">
            <span>{{ parseAndFormatDate(row.updatedAt) }}</span>
        </template>
        <template #createdAt-data="{ row }">
            <span>{{ parseAndFormatDate(row.updatedAt) }}</span>
        </template>
    </UTable>
</template>

<style scoped>

</style>