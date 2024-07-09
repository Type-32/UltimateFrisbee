<script setup lang="ts">
useSeoMeta({
    title: "Ultimate Frisbee",
    ogTitle: "Ultimate Frisbee",
    description: "A platform for organized competition between south China high schools and improve opportunities for female high school students in China to do sports.",
    ogDescription: "A platform for organized competition between south China high schools and improve opportunities for female high school students in China to do sports."
})

import MainLayout from "~/layouts/MainLayout.vue";
import img1 from "~/assets/images/asset1.jpg"
import img2 from "~/assets/images/asset2.jpg"
import img3 from "~/assets/images/asset3.jpg"
import LandingSection from "~/layouts/LandingSection.vue";

const carouselRef = ref()
const items = [
    img1,
    img2,
    img3
]

onMounted(() => {
    setInterval(() => {
        if (!carouselRef.value) return

        if (carouselRef.value.page === carouselRef.value.pages) {
            return carouselRef.value.select(0)
        }

        carouselRef.value.next()
    }, 5000)
})
</script>

<template>
    <MainLayout>
        <div class="flex flex-col gap-20">
            <LandingSection>
                <ULandingHero
                    icon="i-heroicons-rocket-launch"
                    title="South China High School Ultimate Frisbee League"
                    description="A platform for organized competition between south China high schools and improve opportunities for female high school students in China to do sports."
                >
                    <UCard>
                        <UCarousel ref="carouselRef" indicators :items="items" v-slot="{item}" class="w-full">
                            <div class="h-[90svh] items-center flex justify-center relative overflow-hidden">
                                <img :src="item" alt="img" class="h-full object-cover"/>
                            </div>
                        </UCarousel>
                    </UCard>
                </ULandingHero>
            </LandingSection>
            <UDivider/>
            <LandingSection>
                <div class="font-bold text-center text-3xl">About Us</div>
                <ULandingTestimonial
                    icon="i-heroicons-academic-cap"
                    quote="In September 2023, Henry Zhu from BIPH, Chloe Man from SCIE, and Yuta from VMA co-founded South China High School Ultimate Frisbee League (SHUL) to provide a platform for organized competition between south China high schools and improve opportunities for female high school students in China to do sports."
                    :author="{name: 'Henry Zhu, Chloe Man, Yuta', description: 'Founders of SHUL'}"
                    class="w-3/4"
                />
            </LandingSection>
            <UDivider/>
            <LandingSection>
                <div class="font-bold text-center text-3xl">Recruitments</div>
                <div class="col-span-3 tablet:col-span-1 text-center text-primary font-bold">Since September 2023, SHUL has hosted more than 36 hours of competition.</div>
                <ULandingGrid class="grid grid-cols-3 laptop:grid-cols-2 tablet:grid-cols-1 gap-5 w-5/6">
                    <ULandingCard
                        title="BASIS International School Park Lane Harbor (Huizhou)"
                        orientation="vertical"
                    >
                        <img src="/assets/images/hero/biph_hero.png" class="w-full rounded-md"/>
                    </ULandingCard>
                    <ULandingCard
                        title="Shenzhen College of International Education (SZ)"
                        orientation="vertical"
                    >
                        <img src="/assets/images/hero/scie_hero.png" class="w-full rounded-md"/>
                    </ULandingCard>
                    <ULandingCard
                        title="Vanke Meisha Academy (Shenzhen)"
                        orientation="vertical"
                    >
                        <img src="/assets/images/hero/vanke_hero.png" class="w-full rounded-md"/>
                    </ULandingCard>
                    <ULandingCard
                        title="Nanshan College Preparatory Academy (Guangzhou)"
                        orientation="vertical"
                    >
                        <img src="/assets/images/hero/ncpa_hero.png" class="w-full rounded-md"/>
                    </ULandingCard>
                    <ULandingCard
                        title="BASIS Bilingual School Shenzhen (Futian)"
                        orientation="vertical"
                    >
                        <img src="/assets/images/hero/bbsz_hero.png" class="w-full rounded-md"/>
                    </ULandingCard>
                    <ULandingCard
                        title="ULink College (Guangzhou)"
                        orientation="vertical"
                    >
                        <img src="/assets/images/hero/ulc_hero.png" class="w-full rounded-md"/>
                    </ULandingCard>
                    <ULandingCard
                        title="BASIS International School Shenzhen (Shekou)"
                        orientation="vertical"
                    >
                        <img src="/assets/images/hero/bisz_hero.png" class="w-full rounded-md"/>
                    </ULandingCard>
                    <ULandingCard
                        title="Tsinglan School (Dongguan)"
                        orientation="vertical"
                    >
                        <img src="/assets/images/hero/tsing_hero.png" class="w-full rounded-md"/>
                    </ULandingCard>
                    <ULandingCard
                        description="More to come...."
                        orientation="vertical"
                        class="laptop:col-span-2"
                    />
                </ULandingGrid>
            </LandingSection>
        </div>
    </MainLayout>
</template>

<style scoped>

</style>