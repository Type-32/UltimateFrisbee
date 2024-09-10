<script setup lang="ts">
useSeoMeta({
    title: "Ultimate Frisbee",
    ogTitle: "Ultimate Frisbee",
    description: "A platform for organized competition between south China high schools and improve opportunities for female high school students in China to do sports.",
    ogDescription: "A platform for organized competition between south China high schools and improve opportunities for female high school students in China to do sports."
})

import MainLayout from "~/layouts/MainLayout.vue";
import img1 from "~/assets/images/caro/img1.jpg"
import img2 from "~/assets/images/caro/img2.jpg"
import img3 from "~/assets/images/caro/img3.jpg"
import img4 from "~/assets/images/caro/img4.jpg"
import img5 from "~/assets/images/caro/img5.jpg"
import img6 from "~/assets/images/caro/img6.jpg"
import img7 from "~/assets/images/caro/img7.jpg"
import img8 from "~/assets/images/caro/img8.jpg"
import img9 from "~/assets/images/caro/img9.jpg"
import img10 from "~/assets/images/caro/img10.jpg"
import img11 from "~/assets/images/caro/img11.jpg"
import img12 from "~/assets/images/caro/img12.jpg"
import img13 from "~/assets/images/caro/img13.jpg"

import school1 from "~/assets/images/hero/biph_hero.jpg"
import school2 from "~/assets/images/hero/scie_hero.jpg"
import school3 from "~/assets/images/hero/vanke_hero.jpg"
import school4 from "~/assets/images/hero/ncpa_hero.jpg"
import school5 from "~/assets/images/hero/bbsz_hero.jpg"
import school6 from "~/assets/images/hero/ulc_hero.jpg"
import school7 from "~/assets/images/hero/bisz_hero.jpg"
import school8 from "~/assets/images/hero/tsing_hero.jpg"
import school9 from "~/assets/images/hero/qifu_hero.jpg"

import LandingSection from "~/layouts/LandingSection.vue";

const carouselRef = ref()
const items = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13
]

const landingItems = [
    {
        title: 'BASIS International School Park Lane Harbor (Huizhou)',
        desc: 'BASIS International School Park Lane Harbour is a prestigious international boarding school located in a ' +
            'picturesque coastal setting in Huizhou, China, about an hour\'s drive northeast of Shenzhen. Established in ' +
            '2018, the school offers a rigorous, world-class curriculum for students in grades 5-12.',
        img: school1
    },
    {
        title: 'Shenzhen College of International Education (SZ)',
        desc: 'Shenzhen College of International Education (SCIE) is a leading international high school located in the ' +
            'Futian District of Shenzhen, China. Established in 2003, SCIE was the first institution in Shenzhen to ' +
            'offer an international curriculum, providing students aged 14-18 with a rigorous education based on the ' +
            'Cambridge Assessment International Education (CAIE) system, including IGCSE and A-Level courses.',
        img: school2
    },
    {
        title: 'Vanke Meisha Academy (Shenzhen)',
        desc: 'Vanke Meisha Academy (VMA) is a distinguished private international bilingual boarding high school ' +
            'located in the scenic Dameisha area of Shenzhen, China. Established with a mission to cultivate respectful ' +
            'and responsible leaders, VMA offers a comprehensive educational experience that emphasizes academic ' +
            'excellence, emotional growth, and community engagement.',
        img: school3
    },
    {
        title: 'Nanshan College Preparatory Academy (Guangzhou)',
        desc: 'Nansha College Preparatory Academy (NCPA) is a premier American-style international high school located ' +
            'in the Nansha District of Guangzhou, China. Founded in 2012, NCPA offers a unique educational experience ' +
            'designed to prepare Chinese students for success in Western universities through an immersive English ' +
            'language environment.',
        img: school4
    },
    {
        title: 'BASIS Bilingual School Shenzhen (Futian)',
        desc: 'BASIS Bilingual School Shenzhen, located in the Futian District, is the first bilingual school ' +
            'established by BASIS in China, opening its doors in September 2020. The school caters to students from ' +
            'Pre-Kindergarten through Grade 12, offering a unique blend of the BASIS Curriculum alongside traditional ' +
            'Chinese language, history, culture, and values.',
        img: school5
    },
    {
        title: 'ULink College (Guangzhou)',
        desc: 'ULink College Guangzhou is a prominent private, weekly-boarding international school located in the ' +
            'Nansha District of Guangzhou, China. Founded in 2004 in collaboration with South China Normal University, ' +
            'the school caters to students in grades 9 to 12 and currently enrolls approximately 560 students.',
        img: school6
    },
    {
        title: 'BASIS International School Shenzhen (Shekou)',
        desc: 'BASIS International School Shenzhen, located in the vibrant Shekou area, is a premier international ' +
            'school that opened in 2015 as the first BASIS Curriculum school outside the United States. The school ' +
            'provides a rigorous academic program for students from Pre-Kindergarten to Grade 12, emphasizing critical ' +
            'thinking, creativity, and a passion for learning.',
        img: school7
    },
    {
        title: 'Tsinglan School (Dongguan)',
        desc: 'Tsinglan School is a private bilingual international school located in Dongguan, China, strategically ' +
            'positioned between Guangzhou and Shenzhen in the Greater Bay Area. ',
        img: school8
    },
    {
        title: 'Clifford School',
        desc: 'Clifford School is a private international school located in Guangzhou, China.',
        img: school9
    }
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
                <div class="font-bold text-center text-3xl">Member Schools</div>
                <div class="col-span-1 text-center text-primary font-bold">Since September 2023, SHUL has hosted more than 72 games.</div>
                <div class="flex flex-col gap-5 w-5/6">
                    <ULandingCard
                        v-for="(img, index) in landingItems" :key="index"
                        :title="img.title"
                        :description="img.desc"
                        orientation="horizontal"
                    >
                        <img :src="img.img" class="w-full rounded-md h-64 object-cover"/>
                    </ULandingCard>
                </div>
                <div>More to come.</div>
            </LandingSection>
        </div>
    </MainLayout>
</template>

<style scoped>

</style>