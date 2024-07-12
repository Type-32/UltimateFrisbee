<template>
    <div>
        <NuxtLayout>
            <NuxtLoadingIndicator/>
            <NuxtPage/>
        </NuxtLayout>
        <UNotifications/>
    </div>
</template>
<script setup lang="ts">
useSeoMeta({
    title: "Ultimate Frisbee",
    ogTitle: "Ultimate Frisbee",
    description: "A platform for organized competition between south China high schools and improve opportunities for female high school students in China to do sports.",
    ogDescription: "A platform for organized competition between south China high schools and improve opportunities for female high school students in China to do sports.",
    ogImage: '/shul-logo.jpg',
    twitterCard: 'summary_large_image',
})

useHead({
    title: 'Ultimate Frisbee',
    meta: [
        { name: 'description', content: "A platform for organized competition between south China high schools and improve opportunities for female high school students in China to do sports." }
    ],
    link: [
        { rel: 'icon', type: 'image/png', href: '/shul-logo.jpg' }
    ]
})
</script>