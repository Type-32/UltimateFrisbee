<template>
    <div class="h-fit rounded-2xl ring-1 ring-black/10">
        <div class="p-3">
            <div v-if="editor" class="flex flex-row items-center gap-2 container">
                <UButton
                    @click="editor.chain().focus().toggleBold().run()"
                    :disabled="!editor.can().chain().focus().toggleBold().run()"
                    :class="{ 'is-active': editor.isActive('bold') }"
                    :variant="editor.isActive('bold') ? 'solid' : 'ghost'"
                    icon="i-fa-solid-bold"
                />
                <UButton
                    @click="editor.chain().focus().toggleItalic().run()"
                    :disabled="!editor.can().chain().focus().toggleItalic().run()"
                    :class="{ 'is-active': editor.isActive('italic') }"
                    :variant="editor.isActive('italic') ? 'solid' : 'ghost'"
                    icon="i-fa-solid-italic"
                />
                <UButton
                    @click="editor.chain().focus().toggleStrike().run()"
                    :disabled="!editor.can().chain().focus().toggleStrike().run()"
                    :class="{ 'is-active': editor.isActive('strike') }"
                    :variant="editor.isActive('strike') ? 'solid' : 'ghost'"
                    icon="i-fa-solid-strikethrough"
                />
                <UButton
                    @click="editor.chain().focus().toggleCode().run()"
                    :disabled="!editor.can().chain().focus().toggleCode().run()"
                    :class="{ 'is-active': editor.isActive('code') }"
                    :variant="editor.isActive('code') ? 'solid' : 'ghost'"
                    icon="i-fa-solid-code"
                />
                <UButton
                    @click="editor.chain().focus().unsetAllMarks().run()"
                    variant="outline"
                    icon="i-fa-solid-remove-format"
                />
                <UButton
                    @click="editor.chain().focus().clearNodes().run()"
                    variant="outline"
                    icon="i-fa-solid-brush"
                />
                <UDivider orientation="vertical" class="h-full"/>
                <UButton
                    @click="editor.chain().focus().setParagraph().run()"
                    :class="{ 'is-active': editor.isActive('paragraph') }"
                    :variant="editor.isActive('paragraph') ? 'solid' : 'soft'"
                    icon="i-fa-solid-paragraph"
                />
                <UButton
                    @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
                    :variant="editor.isActive('heading', { level: 1 }) ? 'solid' : 'soft'"
                    icon="i-mdi-format-header-1"
                />
                <UButton
                    @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
                    :variant="editor.isActive('heading', { level: 2 }) ? 'solid' : 'soft'"
                    icon="i-mdi-format-header-2"
                />
                <UButton
                    @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
                    :variant="editor.isActive('heading', { level: 3 }) ? 'solid' : 'soft'"
                    icon="i-mdi-format-header-3"
                />
                <UButton
                    @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
                    :variant="editor.isActive('heading', { level: 4 }) ? 'solid' : 'soft'"
                    icon="i-mdi-format-header-4"
                />
                <!--            <UButton-->
                <!--                @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"-->
                <!--                :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"-->
                <!--                :variant="editor.isActive('') ? 'solid' : 'soft'"-->
                <!--            >-->
                <!--                h5-->
                <!--            </UButton>-->
                <!--            <UButton-->
                <!--                @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"-->
                <!--                :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"-->
                <!--                :variant="editor.isActive('') ? 'solid' : 'soft'"-->
                <!--            >-->
                <!--                h6-->
                <!--            </UButton>-->
                <UButton
                    @click="editor.chain().focus().toggleBulletList().run()"
                    :class="{ 'is-active': editor.isActive('bulletList') }"
                    :variant="editor.isActive('bulletList') ? 'solid' : 'soft'"
                    icon="i-fa-solid-list-ul"
                />
                <UButton
                    @click="editor.chain().focus().toggleOrderedList().run()"
                    :class="{ 'is-active': editor.isActive('orderedList') }"
                    :variant="editor.isActive('orderedList') ? 'solid' : 'soft'"
                    icon="i-fa-solid-list-ol"
                />
                <UButton
                    @click="editor.chain().focus().toggleCodeBlock().run()"
                    :class="{ 'is-active': editor.isActive('codeBlock') }"
                    :variant="editor.isActive('codeBlock') ? 'solid' : 'soft'"
                    icon="i-fa-solid-laptop-code"
                />
                <UButton
                    @click="editor.chain().focus().toggleBlockquote().run()"
                    :class="{ 'is-active': editor.isActive('blockquote') }"
                    :variant="editor.isActive('blockquote') ? 'solid' : 'soft'"
                    icon="i-fa-solid-quote-left"
                />
                <UButton
                    @click="editor.chain().focus().setHorizontalRule().run()"
                    variant="ghost"
                    icon="i-fa-solid-align-left"
                />
                <UButton
                    @click="editor.chain().focus().setHardBreak().run()"
                    variant="ghost"
                    icon="i-fa-solid-window-minimize"
                />
                <UDivider orientation="vertical" class="h-full flex-grow"/>
                <UButton
                    @click="editor.chain().focus().undo().run()"
                    :disabled="!editor.can().chain().focus().undo().run()"
                    variant="ghost"
                    icon="i-fa-solid-undo"
                />
                <UButton
                    @click="editor.chain().focus().redo().run()"
                    :disabled="!editor.can().chain().focus().redo().run()"
                    variant="ghost"
                    icon="i-fa-solid-redo"
                />
            </div>
        </div>
        <UDivider/>
        <div class="p-3">
            <TiptapEditorContent :editor="editor" class="h-full min-h-72" :aria-disabled="disabled"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import Image from '@tiptap/extension-image'
import { onBeforeUnmount, ref, watch } from 'vue'
import {Youtube} from "@tiptap/extension-youtube";

const props = defineProps({
    modelValue: {
        type: String,
        default: '<p></p>'
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
    extensions: [
        TiptapStarterKit,
        Image,
        Youtube.configure({
            controls: false,
            nocookie: true,
        })
    ],
});

watch(
    () => props.modelValue,
    (value) => {
        const isSame = editor.value?.getHTML() === value
        if (isSame) {
            return
        }
        editor.value?.commands.setContent(value, false)
    }
)

onMounted(() => {
    editor.value = new Editor({
        extensions: [StarterKit],
        content: props.modelValue,
        onUpdate: () => {
            emit('update:modelValue', editor.value?.getHTML())
        }
    })
})

onBeforeUnmount(() => {
    unref(editor)?.destroy()
})
</script>

<style>
.tiptap {
    height: 100%;
    min-height: 18rem;
}
.tiptap-thread--selected {}

div[contenteditable=true]:focus {
    outline: none;
    border-color: rgba(158, 202, 237, 0);
    box-shadow:0 0 10px rgba(158, 202, 237, 0);
    height: 100%;
}
</style>