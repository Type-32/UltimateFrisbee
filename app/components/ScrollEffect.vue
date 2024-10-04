<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const sectionRef = ref(null)
const heroTextRef = ref(null)
const carouselRef = ref(null)

const isHeroVisible = ref(false)
const isCarouselVisible = ref(false)

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
}

onMounted(() => {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            isHeroVisible.value = entry.isIntersecting
        })
    }, observerOptions)

    const carouselObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            isCarouselVisible.value = entry.isIntersecting
        })
    }, observerOptions)

    if (heroTextRef.value) heroObserver.observe(heroTextRef.value)
    if (carouselRef.value) carouselObserver.observe(carouselRef.value)

    onUnmounted(() => {
        if (heroTextRef.value) heroObserver.unobserve(heroTextRef.value)
        if (carouselRef.value) carouselObserver.unobserve(carouselRef.value)
    })
})
</script>

<template>
    <section ref="sectionRef" class="relative w-full min-h-[200vh]">
        <div
            ref="heroTextRef"
            :class="[
        'p-8 transition-all duration-500 ease-in-out fade-in-from-top',
        { 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white': isHeroVisible }
      ]"
        >
            <slot name="hero-text" />
        </div>
        <div
            ref="carouselRef"
            :class="[
        'min-h-screen transition-opacity duration-500 ease-in-out fade-in-from-bottom',
        { 'opacity-100 bg-black bg-opacity-80': isCarouselVisible, 'opacity-0': !isCarouselVisible }
      ]"
        >
            <slot name="carousel" />
        </div>
    </section>
</template>