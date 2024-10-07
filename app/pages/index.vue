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
    img12
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

let more: string = "There’s a reason why it’s called ultimate frisbee: ultimate frisbee embraces all genders in the same game, ultimate frisbee is a game unto itself, ultimate frisbee is an a priori thing, ultimate frisbee is a self-aware existentialist, ultimate frisbee is a rebellious, subversive way of life that verges on the global skeptic but tilts enough to be hopeful and constructive. The most important thing is that ultimate frisbee is the Spirit of The Game. \n" +
    "\n" +
    "What ultimate frisbee is depends on who the players are. The core of ultimate frisbee are an invitation to define the ethical concept of Sprit Of The Game and a simultaneous respect for rules — that it is, by design or not, not the case that, as in other sports, the more adequately one understands the rules, the more advantageous it is for one. Not on the player who knows the rules best, but on the player who knows the rules less. The rulebook defines no punishment for false calls.  There is no referee: the very fact of the referee introduces an authority above the rules. The referee de-democratize rules and centralizes power. With referee, play is no longer rule-oriented, but referee-oriented: that a play is not truly a foul play if not seen by the referee. Ultimate frisbee is a duality of knowledge and ethics. A player who knows the rules less might genuinely think that an opponent does a violation and calls when the rulebook and an objective, omniscient observer would indicate not. A player with an established credibility of knowing the rules well might lie to opponents and get away with it. Like how logical relations are true, calls make a difference: the game necessarily pauses. This asks the question: what is causation? Players can have different attitudes towards false calls. False-callers can have different attitudes in response to false calls. Ultimate frisbee is an ultimate style that goes further than toleration. Ultimate frisbee is an ongoing interaction between intentionality and factuality.\n" +
    "\n" +
    "Ultimate frisbee is an idealistic sport that promises nothing and hopes for Spirit Of The Game and a respect of rules as almost metaphysically queer yet accessible entities of ethics.\n" +
    "\n" +
    "One must establish what Spirit of the Game means to them: when the opponent unfairly uses the rules to gain advantages (most often easily by a lack of officiators), do we do the same? Playing ultimate frisbee is a quest of what it means to be ethical and what this quest itself is. Ultimate frisbee thus is a philosophical gesture.\n" +
    "\n" +
    "And, by the way, if you’ve never tried ultimate frisbee — here’s a glimpse of what it looks like, from my eyes:\n" +
    "\n" +
    "Ultimate frisbee.\n" +
    "\n" +
    "O I cannot begin. I can’t help savoring and re-imagining throws and re-iterating hypothetical cuts, or practice backhand moves, pretending to hold a disc, again and again waiting for class to begin. The singing, stinging, literal thrill of an upcoming scrimmage or inter-school game takes my breath away. When I step on the field, the world stops.\n" +
    "\n" +
    "The most beautiful part is the wait. The infinitely long superposition of success and failure, battle between attempt and luck. How the disc absorbs you into it. How a parent looks on as the child leaves home. The wait is beautiful because it’s a process of realization. A process of proof of your mental conjecture, construction of your bodily architecture, unfolding in front of you. It is when your intention morphs into reality right in front of you. \n" +
    "\n" +
    "The wait is the unleashing of the unconsciousness. Sometimes, the wind blows really hard, thus of course usually unfit for a huck. Yet sometimes one should throw it, when one feels the call of the disk. Oftentimes the wind will decide to help, or at least the human brain so perfectly automatically predicts the random, wild wind. Oftentimes the defender stands between me and my teammate, and the wind is blowing. I for some reason throw it lower than usual, and exactly when the defender confidently jumps for it, the wind lifts it up, perfectly avoiding the defender, then gently the wind brings the plate down into the hands of the teammate. \n" +
    "\n" +
    "Sometimes, the disc has consciousness. Throwing becomes involuntary — you don’t know where to and how you want to throw. But the disc knows, and exactly so. All you’re doing is letting go. \n" +
    "Ultimate frisbee does not belong. Ultimate frisbee is not basketball, soccer, running. Ultimate frisbee is not beanbag-tossing, hopscotching, or tug-of-war. Ultimate frisbee is proud of being a second place.\n" +
    " \n" +
    "When I was writing this, I struggled to pick between “ultimate” and “ultimate frisbee” to refer to the sport. On the one hand, “ultimate” is code for “I know the sport” and “ultimate frisbee” the non-ultimate term. One the other hand, when you say “I play ultimate” at a family gathering, people don’t understand what you’re talking about. When you say “I play ultimate frisbee”, ultimate players think that you don’t play ultimate frisbee. Adding to that is the further fact that the leading professional league, the American Ultimate Disc League, renamed itself the Ultimate Frisbee Association last April. There are two things about the sport’s name.\n" +
    "\n" +
    "Thus ultimate frisbee is ultimately always unraveling itself as constant dialectic.\n" +
    "\n" +
    "There are two things, let’s ultimately frisbee."
</script>

<template>
    <MainLayout>
        <div class="flex flex-col gap-20">
            <LandingSection class="min-h-screen items-center justify-center align-middle">
                <span class="font-bold text-7xl text-pretty text-center text-transparent bg-[#4E88CF] bg-clip-text fade-in-from-top">SHUL is Back</span>
                <div class="flex flex-col items-center justify-center">
                    <img src="~/assets/cap.png" class="object-contain size-96 hover:scale-105 active:scale-95 duration-200 hover:cursor-pointer" alt="billed cap"/>
                    <span class="text-right w-full fade-in-from-bottom">...with our first-ever Hat.</span>
                </div>
            </LandingSection>
            <LandingSection class="px-0 relative w-full h-fit">
                <UCarousel ref="carouselRef" indicators :items="items" v-slot="{item}" class="w-full h-full">
                    <img :src="item" alt="img" class="w-full object-cover container"/>
                </UCarousel>
                <div class="absolute inset-0 bg-black bg-opacity-65 flex flex-col items-center justify-center p-8">
                    <ULandingHero
                        class="inset-0 relative"
                        icon="i-lucide-rocket"
                        :ui="{title: 'text-5xl font-bold tracking-tight text-white sm:text-7xl', description: 'mt-6 text-lg tracking-tight text-gray-300'}"
                        title="South China's Largest Ultimate Frisbee League"
                        description="A platform for organized competition between south China high schools and improve opportunities for female high school students in China to do sports."
                    />
                </div>
            </LandingSection>
            <LandingSection>
                <div class="font-bold text-center text-3xl">More Than a Game</div>
                <article class="prose max-w-none w-3/4">
                    <ProseBlockquote>
                        "Is that the thing you play with dogs?"
                    </ProseBlockquote>
                    <ProseP>
                        Ultimate Frisbee, or, as "insiders" prefer, Ultimate, bears the burden of its name — a hyperbolic adjective followed by a silly-sounding noun — like “fabulous foosball.” Understandably, whenever I tell someone that I “train for frisbee”, many are confused at the apparent oxymoron.
                    </ProseP>
                    <ProseP>
                        There’s a reason why it’s called ultimate frisbee: ultimate frisbee embraces all genders in the same game, ultimate frisbee is a game unto itself, ultimate frisbee is an a priori thing, ultimate frisbee is a self-aware existentialist, ultimate frisbee is a rebellious, subversive way of life that verges on the global skeptic but tilts enough to be hopeful and constructive. The most important thing is that ultimate frisbee is the Spirit of The Game.
                    </ProseP>
                    <ProseP>
                        What ultimate frisbee is depends on who the players are. The core of ultimate frisbee are an invitation to define the ethical concept of Sprit Of The Game and a simultaneous respect for rules — that it is, by design or not, not the case that, as in other sports, the more adequately one understands the rules, the more advantageous it is for one. Not on the player who knows the rules best, but on the player who knows the rules less. The rulebook defines no punishment for false calls.  There is no referee: the very fact of the referee introduces an authority above the rules. The referee de-democratize rules and centralizes power. With referee, play is no longer rule-oriented, but referee-oriented: that a play is not truly a foul play if not seen by the referee. Ultimate frisbee is a duality of knowledge and ethics. A player who knows the rules less might genuinely think that an opponent does a violation and calls when the rulebook and an objective, omniscient observer would indicate not. A player with an established credibility of knowing the rules well might lie to opponents and get away with it. Like how logical relations are true, calls make a difference: the game necessarily pauses. This asks the question: what is causation? Players can have different attitudes towards false calls. False-callers can have different attitudes in response to false calls. Ultimate frisbee is an ultimate style that goes further than toleration. Ultimate frisbee is an ongoing interaction between intentionality and factuality.
                    </ProseP>
                    <ProseP>
                        Ultimate frisbee is an idealistic sport that promises nothing and hopes for Spirit Of The Game and a respect of rules as almost metaphysically queer yet accessible entities of ethics.
                    </ProseP>
                    <ProseP>
                        One must establish what Spirit of the Game means to them: when the opponent unfairly uses the rules to gain advantages (most often easily by a lack of officiators), do we do the same? Playing ultimate frisbee is a quest of what it means to be ethical and what this quest itself is. Ultimate frisbee thus is a philosophical gesture.
                    </ProseP>
                    <ProseP>
                        And, by the way, if you’ve never tried ultimate frisbee — here’s a glimpse of what it looks like, from my eyes:
                    </ProseP>
                    <ProseP>
                        Ultimate frisbee.
                    </ProseP>
                    <ProseP class="italic">
                        O I cannot begin. I can’t help savoring and re-imagining throws and re-iterating hypothetical cuts, or practice backhand moves, pretending to hold a disc, again and again waiting for class to begin. The singing, stinging, literal thrill of an upcoming scrimmage or inter-school game takes my breath away. When I step on the field, the world stops.
                    </ProseP>
                    <ProseP class="italic">
                        The most beautiful part is the wait. The infinitely long superposition of success and failure, battle between attempt and luck. How the disc absorbs you into it. How a parent looks on as the child leaves home. The wait is beautiful because it’s a process of realization. A process of proof of your mental conjecture, construction of your bodily architecture, unfolding in front of you. It is when your intention morphs into reality right in front of you.
                    </ProseP>
                    <ProseP class="italic">
                        The wait is the unleashing of the unconsciousness. Sometimes, the wind blows really hard, thus of course usually unfit for a huck. Yet sometimes one should throw it, when one feels the call of the disk. Oftentimes the wind will decide to help, or at least the human brain so perfectly automatically predicts the random, wild wind. Oftentimes the defender stands between me and my teammate, and the wind is blowing. I for some reason throw it lower than usual, and exactly when the defender confidently jumps for it, the wind lifts it up, perfectly avoiding the defender, then gently the wind brings the plate down into the hands of the teammate.
                    </ProseP>
                    <ProseP class="italic">
                        Sometimes, the disc has consciousness. Throwing becomes involuntary — you don’t know where to and how you want to throw. But the disc knows, and exactly so. All you’re doing is letting go.
                        Ultimate frisbee does not belong. Ultimate frisbee is not basketball, soccer, running. Ultimate frisbee is not beanbag-tossing, hopscotching, or tug-of-war. Ultimate frisbee is proud of being a second place.
                    </ProseP>
                    <ProseP class="italic">
                        When I was writing this, I struggled to pick between “ultimate” and “ultimate frisbee” to refer to the sport. On the one hand, “ultimate” is code for “I know the sport” and “ultimate frisbee” the non-ultimate term. One the other hand, when you say “I play ultimate” at a family gathering, people don’t understand what you’re talking about. When you say “I play ultimate frisbee”, ultimate players think that you don’t play ultimate frisbee. Adding to that is the further fact that the leading professional league, the American Ultimate Disc League, renamed itself the Ultimate Frisbee Association last April. There are two things about the sport’s name.
                    </ProseP>
                    <ProseP class="italic">
                        Thus ultimate frisbee is ultimately always unraveling itself as constant dialectic.
                    </ProseP>
                    <ProseP class="italic">
                        There are two things, let’s ultimately frisbee.
                    </ProseP>
                    <ProseP class="italic font-bold">
                        - Henry Zhu, co-founder of SHUL
                    </ProseP>
                </article>
            </LandingSection>
            <UDivider/>
            <LandingSection>
                <div class="font-bold text-center text-3xl">About Us</div>
                <ULandingTestimonial
                    icon="i-lucide-medal"
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
            <UDivider/>
            <LandingSection>
                <div class="font-bold text-center text-3xl">Partners & Sponsors</div>
                <div class="items-center justify-center w-full grid grid-cols-3 grid-rows-2 gap-x-20">
                    <div class="w-full h-64 flex items-center justify-center rounded-lg border-[2px] hover:shadow-lg hover:border-primary transition-all duration-400 backdrop-blur-lg p-3">
                        <img src="~/assets/images/rela1.png" class="w-full rounded-md object-cover"/>
                    </div>
                    <div class="w-full h-64 flex items-center justify-center rounded-lg border-[2px] hover:shadow-lg hover:border-primary transition-all duration-400 backdrop-blur-lg p-3">
                        <img src="~/assets/images/rela4.jpg" class="rounded-md object-cover h-full"/>
                    </div>
                    <div class="w-full h-64 flex items-center justify-center rounded-lg border-[2px] hover:shadow-lg hover:border-primary transition-all duration-400 backdrop-blur-lg p-3">
                        <img src="~/assets/images/rela3.png" class="w-full rounded-md object-cover"/>
                    </div>
                    <div class="w-full h-full flex flex-col items-center justify-start prose">
                        <prose-h2>WFDF</prose-h2>
                        <prose-p>
                            The World Flying Disc Federation (WFDF) is the international governing body for flying disc
                            sports, including Ultimate and Disc Golf.
                        </prose-p>
                        <div/>
                    </div>
                    <div class="w-full h-full flex flex-col items-center justify-start prose">
                        <prose-h2>SFDA</prose-h2>
                        <prose-p>
                            The Shenzhen Flying Disc Association (SFDA) is a prominent organization dedicated to promoting
                            flying disc sports, particularly Ultimate Frisbee, within Shenzhen, China. Established in 2013,
                            the SFDA plays a crucial role in fostering a vibrant community of enthusiasts and athletes.
                        </prose-p>
                        <div/>
                    </div>
                    <div class="w-full h-full flex flex-col items-center justify-start prose">
                        <prose-h2>X-COM</prose-h2>
                        <prose-p>
                            X-COM is China’s first professional frisbee line, with its 145g youth frisbees and 175g
                            competition discs widely recognized and certified by the WFDF and USAU for championship use.
                            Ike dominates the domestic market and exports globally. The company has also forged strategic
                            partnerships with various regional frisbee associations and the CUUA to promote the sport across China.
                            Beyond business, Ike is committed to corporate social responsibility, partnering with "Teach For China"
                            to introduce frisbee to children in underprivileged areas.
                        </prose-p>
                        <div/>
                    </div>
                </div>
            </LandingSection>
            <div/>
        </div>
    </MainLayout>
</template>

<style scoped>
</style>