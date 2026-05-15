"use client";

import { motion } from "framer-motion";
import { Leaf, Heart, Award, Users } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const values = [
    {
        icon: Leaf,
        title: "100% Natural",
        description: "Every ingredient is sourced from nature, ensuring purity and effectiveness.",
    },
    {
        icon: Heart,
        title: "Made with Love",
        description: "Each product is crafted with care and passion for holistic beauty.",
    },
    {
        icon: Award,
        title: "Quality First",
        description: "We never compromise on quality, using only the finest herbs and oils.",
    },
    {
        icon: Users,
        title: "Community Focused",
        description: "We believe in empowering our community through natural wellness.",
    },
];

const timeline = [
    {
        year: "2021",
        title: "The Beginning",
        description: "V Stories was born from a passion for ancient herbal remedies.",
    },
    {
        year: "2022",
        title: "First Products",
        description: "Launched our signature Herbal Hair Oil, now a bestseller.",
    },
    {
        year: "2023",
        title: "Growing Family",
        description: "Expanded to skin care and built a community of 10,000+ customers.",
    },
    {
        year: "2024",
        title: "New Horizons",
        description: "Introducing new product lines and B2B partnerships.",
    },
];

function ValueOrb({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
    return (
        <FadeIn delay={delay} className="flex flex-col items-center">
            <div className="relative w-[150px] h-[150px] mb-8">
                {/* Golden Gradient Circle */}
                <div className="absolute inset-0 rounded-full bg-[linear-gradient(231.77deg,#CBA45A_16.84%,#FFEAC3_54.23%,#C39641_91.63%)] animate-pulse-gentle" />
                
                {/* Inner Dark Green Circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] bg-[#1D3B29] rounded-full shadow-[0px_4px_20px_rgba(0,0,0,0.25)] flex items-center justify-center z-10 transition-transform duration-500 group-hover:scale-110">
                    {icon}
                </div>
            </div>
            
            <div className="text-center max-w-[207px]">
                <h3 className="text-2xl font-semibold font-inter text-[#2E2E2E] mb-3">
                    {title}
                </h3>
                <p className="text-base font-inter font-normal text-[#2E2E2E] leading-[19px]">
                    {description}
                </p>
            </div>
        </FadeIn>
    );
}

export default function AboutContent() {
    return (
        <div className="bg-[var(--background)]">


            {/* Founder Section */}
            <section className="section-padding bg-[var(--background)] relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--secondary)]/5 rounded-full blur-[100px] -z-10" />

                <div className="container-premium">
                    <FadeIn delay={0.1}>
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                            {/* Image Column */}
                            <FadeIn direction="left" delay={0.2} className="w-full lg:w-1/2 relative">
                                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl">
                                    {/* Use the same founder image as home page or a specific one if available */}
                                    <img
                                        src="/images/founder.png"
                                        alt="Fathima Nowra M - Founder of V Stories"
                                        className="object-cover w-full h-full"
                                    />
                                    {/* Founder Name Overlay - Bottom Left */}
                                    <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-[var(--primary)]/90 to-transparent pt-32">
                                        <h3 className="text-3xl md:text-4xl text-white font-semibold mb-2" style={{ fontFamily: "var(--font-peachi)" }}>
                                            Fathima Nowra M
                                        </h3>
                                        <p className="text-white/95 text-base tracking-[0.2em] uppercase font-semibold">
                                            FOUNDER AT V STORIES
                                        </p>
                                    </div>
                                </div>
                            </FadeIn>

                            {/* Text Column */}
                            <FadeIn direction="right" delay={0.3} className="w-full lg:w-1/2 text-left">
                                <h2 className="text-4xl md:text-5xl font-medium text-[var(--secondary)] mb-8" style={{ fontFamily: "var(--font-peachi)" }}>
                                    Founder’s Note
                                </h2>

                                <div className="mb-8">
                                    <span className="text-6xl text-[var(--secondary)]/20 font-serif block mb-4">“</span>
                                    <h3
                                        className="text-2xl md:text-4xl font-medium text-[var(--secondary)] mb-6 leading-tight"
                                        style={{ fontFamily: "var(--font-peachi)" }}
                                    >
                                        My late mother is the reason behind this brand
                                    </h3>
                                </div>

                                <div className="space-y-6 text-lg text-[var(--text-secondary)] leading-relaxed font-light">
                                    <p>
                                        My mother had sensitive skin and suffered with skin problems for more
                                        than a decade. The products she used on her skin made the condition
                                        even worse.
                                    </p>
                                    <p>
                                        My late mother is the reason behind this brand and inspired me to
                                        do what I do today with V Stories.
                                    </p>
                                </div>

                                <div className="mt-10">
                                    <a href="/shop/bestsellers" className="btn-primary" style={{ backgroundColor: 'var(--secondary)', color: 'white' }}>
                                        Discover Fathima's Favourites
                                    </a>
                                </div>
                            </FadeIn>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Values Section - High Fidelity "Hanging" Design */}
            <section className="relative bg-[#FCFAF4] overflow-hidden pt-24 pb-40">
                <div className="container-premium relative">
                    {/* Header Group */}
                    <div className="flex flex-col items-center justify-center mb-32 text-center">
                        <FadeIn delay={0.1} className="flex items-center gap-6 mb-4">
                            <div className="text-[#1D3B29] -rotate-[18.46deg]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.67806 0.393273C3.33698 0.746016 3.86524 1.26031 4.27352 1.86988C4.93665 2.86007 5.32531 4.08777 5.64054 5.36694C6.27084 7.92543 6.64437 10.715 7.77326 12.1466C8.83291 13.4904 10.0172 14.1032 11.144 14.2227C11.6287 14.2742 12.107 14.2325 12.5642 14.1104C12.5917 10.6285 11.032 6.71738 8.37049 4.61054C11.4761 6.14733 13.7451 9.27599 14.257 13.1784L13.89 13.4892C14.0091 13.4058 14.1242 13.3167 14.2348 13.2224C15.98 11.7396 16.8379 8.81822 14.9913 5.57157C14.1428 4.07991 12.3091 2.18967 9.91609 1.04988C7.84587 0.0639353 5.3733 -0.379387 2.67804 0.393385L2.67806 0.393273ZM19.3181 4.63049C19.4716 5.22489 19.4715 5.83468 19.3522 6.42831C19.1435 7.46589 18.6174 8.47483 18.0145 9.46774C16.8086 11.4535 15.3099 13.4204 15.1202 14.9811C14.9406 16.4594 15.288 17.553 15.9002 18.3107C16.1619 18.6351 16.4825 18.9075 16.8453 19.114C19.0068 16.963 20.4558 13.5914 20.1231 10.6547C21.0827 13.5168 20.5478 16.8457 18.4592 19.5823C20.4194 19.7039 22.7021 18.4343 23.5656 15.3296C23.9656 13.8911 24.0093 11.5905 23.2428 9.41464C22.5922 7.56759 21.3813 5.80863 19.3182 4.63062L19.3181 4.63049ZM-1.99875e-05 15.0004C0.277852 17.3556 1.42587 19.1575 2.87451 20.4786C4.58089 22.0347 6.72078 22.8962 8.20421 23.0928C11.4058 23.5172 13.47 21.9199 14.1261 20.0736C10.7839 20.9173 7.50419 20.1036 5.24087 18.1012C7.81924 19.5575 11.4967 19.5496 14.3277 18.4088C14.2799 17.995 14.1546 17.594 13.9582 17.2267C13.4992 16.368 12.6247 15.6205 11.1908 15.2059C9.67724 14.7684 7.27655 15.3731 4.97243 15.7013C3.82046 15.8656 2.68427 15.9536 1.64553 15.7383C1.0509 15.6151 0.488478 15.3744 9.28297e-05 15.0005L-1.99875e-05 15.0004Z" fill="currentColor"/>
                                </svg>
                            </div>
                            <span className="text-2xl font-playfair text-black">Our Values</span>
                            <div className="text-[#1D3B29] scale-x-[-1] -rotate-[18.46deg]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.67806 0.393273C3.33698 0.746016 3.86524 1.26031 4.27352 1.86988C4.93665 2.86007 5.32531 4.08777 5.64054 5.36694C6.27084 7.92543 6.64437 10.715 7.77326 12.1466C8.83291 13.4904 10.0172 14.1032 11.144 14.2227C11.6287 14.2742 12.107 14.2325 12.5642 14.1104C12.5917 10.6285 11.032 6.71738 8.37049 4.61054C11.4761 6.14733 13.7451 9.27599 14.257 13.1784L13.89 13.4892C14.0091 13.4058 14.1242 13.3167 14.2348 13.2224C15.98 11.7396 16.8379 8.81822 14.9913 5.57157C14.1428 4.07991 12.3091 2.18967 9.91609 1.04988C7.84587 0.0639353 5.3733 -0.379387 2.67804 0.393385L2.67806 0.393273ZM19.3181 4.63049C19.4716 5.22489 19.4715 5.83468 19.3522 6.42831C19.1435 7.46589 18.6174 8.47483 18.0145 9.46774C16.8086 11.4535 15.3099 13.4204 15.1202 14.9811C14.9406 16.4594 15.288 17.553 15.9002 18.3107C16.1619 18.6351 16.4825 18.9075 16.8453 19.114C19.0068 16.963 20.4558 13.5914 20.1231 10.6547C21.0827 13.5168 20.5478 16.8457 18.4592 19.5823C20.4194 19.7039 22.7021 18.4343 23.5656 15.3296C23.9656 13.8911 24.0093 11.5905 23.2428 9.41464C22.5922 7.56759 21.3813 5.80863 19.3182 4.63062L19.3181 4.63049ZM-1.99875e-05 15.0004C0.277852 17.3556 1.42587 19.1575 2.87451 20.4786C4.58089 22.0347 6.72078 22.8962 8.20421 23.0928C11.4058 23.5172 13.47 21.9199 14.1261 20.0736C10.7839 20.9173 7.50419 20.1036 5.24087 18.1012C7.81924 19.5575 11.4967 19.5496 14.3277 18.4088C14.2799 17.995 14.1546 17.594 13.9582 17.2267C13.4992 16.368 12.6247 15.6205 11.1908 15.2059C9.67724 14.7684 7.27655 15.3731 4.97243 15.7013C3.82046 15.8656 2.68427 15.9536 1.64553 15.7383C1.0509 15.6151 0.488478 15.3744 9.28297e-05 15.0005L-1.99875e-05 15.0004Z" fill="currentColor"/>
                                </svg>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <h2 className="text-4xl md:text-5xl lg:text-[48px] font-semibold font-playfair text-[#2E2E2E]">
                                What We Stand For
                            </h2>
                        </FadeIn>
                    </div>

                    {/* Values Grid - Staggered Hanging Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 relative min-h-[600px]">
                        {/* Value 1: 100% Natural */}
                        <div className="flex flex-col items-center lg:mt-[-100px] group">
                            <div className="w-[1px] h-[300px] bg-[#1D3B29] transition-all duration-700 group-hover:h-[320px]" />
                            <ValueOrb 
                                icon={<Leaf className="w-8 h-8 text-[#F4F0EC]" />}
                                title="100% Natural"
                                description="Every ingredient is sourced from nature, ensuring purity and effectiveness."
                                delay={0.3}
                            />
                        </div>

                        {/* Value 2: Made with Love */}
                        <div className="flex flex-col items-center lg:mt-[150px] group">
                            <div className="w-[1px] h-[400px] bg-[#1D3B29] transition-all duration-700 group-hover:h-[420px]" />
                            <ValueOrb 
                                icon={<Heart className="w-8 h-8 text-[#F4F0EC]" />}
                                title="Made with Love"
                                description="Each product is crafted with care and passion for holistic beauty."
                                delay={0.4}
                            />
                        </div>

                        {/* Value 3: Community Focused */}
                        <div className="flex flex-col items-center lg:mt-[150px] group">
                            <div className="w-[1px] h-[400px] bg-[#1D3B29] transition-all duration-700 group-hover:h-[420px]" />
                            <ValueOrb 
                                icon={<Users className="w-8 h-8 text-[#F4F0EC]" />}
                                title="Community Focused"
                                description="We believe in empowering our community through natural wellness."
                                delay={0.5}
                            />
                        </div>

                        {/* Value 4: Quality First */}
                        <div className="flex flex-col items-center lg:mt-[20px] group">
                            <div className="w-[1px] h-[235px] bg-[#1D3B29] transition-all duration-700 group-hover:h-[255px]" />
                            <ValueOrb 
                                icon={<Award className="w-8 h-8 text-[#F4F0EC]" />}
                                title="Quality First"
                                description="We never compromise on quality, using only the finest herbs and oils."
                                delay={0.6}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Journey Section (Growing Together) */}
            <section className="relative py-24 bg-[#1D3B29] overflow-hidden min-h-[645px] mt-20">
                <div className="container-premium px-[100px]">
                    {/* Headers */}
                    <FadeIn className="text-center mb-24">
                        <div className="flex items-center justify-center gap-6 mb-4">
                            <div className="text-[#F7EDE2] -rotate-[18.46deg]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.67806 0.393273C3.33698 0.746016 3.86524 1.26031 4.27352 1.86988C4.93665 2.86007 5.32531 4.08777 5.64054 5.36694C6.27084 7.92543 6.64437 10.715 7.77326 12.1466C8.83291 13.4904 10.0172 14.1032 11.144 14.2227C11.6287 14.2742 12.107 14.2325 12.5642 14.1104C12.5917 10.6285 11.032 6.71738 8.37049 4.61054C11.4761 6.14733 13.7451 9.27599 14.257 13.1784L13.89 13.4892C14.0091 13.4058 14.1242 13.3167 14.2348 13.2224C15.98 11.7396 16.8379 8.81822 14.9913 5.57157C14.1428 4.07991 12.3091 2.18967 9.91609 1.04988C7.84587 0.0639353 5.3733 -0.379387 2.67804 0.393385L2.67806 0.393273ZM19.3181 4.63049C19.4716 5.22489 19.4715 5.83468 19.3522 6.42831C19.1435 7.46589 18.6174 8.47483 18.0145 9.46774C16.8086 11.4535 15.3099 13.4204 15.1202 14.9811C14.9406 16.4594 15.288 17.553 15.9002 18.3107C16.1619 18.6351 16.4825 18.9075 16.8453 19.114C19.0068 16.963 20.4558 13.5914 20.1231 10.6547C21.0827 13.5168 20.5478 16.8457 18.4592 19.5823C20.4194 19.7039 22.7021 18.4343 23.5656 15.3296C23.9656 13.8911 24.0093 11.5905 23.2428 9.41464C22.5922 7.56759 21.3813 5.80863 19.3182 4.63062L19.3181 4.63049ZM-1.99875e-05 15.0004C0.277852 17.3556 1.42587 19.1575 2.87451 20.4786C4.58089 22.0347 6.72078 22.8962 8.20421 23.0928C11.4058 23.5172 13.47 21.9199 14.1261 20.0736C10.7839 20.9173 7.50419 20.1036 5.24087 18.1012C7.81924 19.5575 11.4967 19.5496 14.3277 18.4088C14.2799 17.995 14.1546 17.594 13.9582 17.2267C13.4992 16.368 12.6247 15.6205 11.1908 15.2059C9.67724 14.7684 7.27655 15.3731 4.97243 15.7013C3.82046 15.8656 2.68427 15.9536 1.64553 15.7383C1.0509 15.6151 0.488478 15.3744 9.28297e-05 15.0005L-1.99875e-05 15.0004Z" fill="currentColor"/>
                                </svg>
                            </div>
                            <span className="font-playfair text-2xl text-[#F7EDE2]">Our Journey</span>
                            <div className="text-[#F7EDE2] scale-x-[-1] -rotate-[18.46deg]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.67806 0.393273C3.33698 0.746016 3.86524 1.26031 4.27352 1.86988C4.93665 2.86007 5.32531 4.08777 5.64054 5.36694C6.27084 7.92543 6.64437 10.715 7.77326 12.1466C8.83291 13.4904 10.0172 14.1032 11.144 14.2227C11.6287 14.2742 12.107 14.2325 12.5642 14.1104C12.5917 10.6285 11.032 6.71738 8.37049 4.61054C11.4761 6.14733 13.7451 9.27599 14.257 13.1784L13.89 13.4892C14.0091 13.4058 14.1242 13.3167 14.2348 13.2224C15.98 11.7396 16.8379 8.81822 14.9913 5.57157C14.1428 4.07991 12.3091 2.18967 9.91609 1.04988C7.84587 0.0639353 5.3733 -0.379387 2.67804 0.393385L2.67806 0.393273ZM19.3181 4.63049C19.4716 5.22489 19.4715 5.83468 19.3522 6.42831C19.1435 7.46589 18.6174 8.47483 18.0145 9.46774C16.8086 11.4535 15.3099 13.4204 15.1202 14.9811C14.9406 16.4594 15.288 17.553 15.9002 18.3107C16.1619 18.6351 16.4825 18.9075 16.8453 19.114C19.0068 16.963 20.4558 13.5914 20.1231 10.6547C21.0827 13.5168 20.5478 16.8457 18.4592 19.5823C20.4194 19.7039 22.7021 18.4343 23.5656 15.3296C23.9656 13.8911 24.0093 11.5905 23.2428 9.41464C22.5922 7.56759 21.3813 5.80863 19.3182 4.63062L19.3181 4.63049ZM-1.99875e-05 15.0004C0.277852 17.3556 1.42587 19.1575 2.87451 20.4786C4.58089 22.0347 6.72078 22.8962 8.20421 23.0928C11.4058 23.5172 13.47 21.9199 14.1261 20.0736C10.7839 20.9173 7.50419 20.1036 5.24087 18.1012C7.81924 19.5575 11.4967 19.5496 14.3277 18.4088C14.2799 17.995 14.1546 17.594 13.9582 17.2267C13.4992 16.368 12.6247 15.6205 11.1908 15.2059C9.67724 14.7684 7.27655 15.3731 4.97243 15.7013C3.82046 15.8656 2.68427 15.9536 1.64553 15.7383C1.0509 15.6151 0.488478 15.3744 9.28297e-05 15.0005L-1.99875e-05 15.0004Z" fill="currentColor"/>
                                </svg>
                            </div>
                        </div>
                        <h2 className="font-playfair text-[48px] font-semibold text-[#F4F0EC] mb-4">
                            Growing Together
                        </h2>
                        <p className="font-inter text-2xl text-[#F4F0EC] max-w-[529px] mx-auto opacity-90">
                            Natural, effective & made for indian skin & hair.
                        </p>
                    </FadeIn>

                    <div className="relative mt-32">
                        {/* Timeline rail (Golden Gradient) */}
                        <div className="absolute bottom-[-40px] left-0 w-full h-[12px] bg-[linear-gradient(231.77deg,#CBA45A_16.84%,#FFEAC3_54.23%,#C39641_91.63%)] rounded-full z-10" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-[24px]">
                            {timeline.map((item, index) => (
                                <FadeIn key={item.year} delay={index * 0.15} className="relative group">
                                    {/* Year Orb (Overlapping) */}
                                    <div className="absolute -top-[50px] left-1/2 -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-[linear-gradient(231.77deg,#CBA45A_16.84%,#FFEAC3_54.23%,#C39641_91.63%)] flex items-center justify-center z-30 shadow-[0px_4px_20px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-110">
                                        <span className="font-inter text-2xl text-[#1D3B29] font-normal">{item.year}</span>
                                    </div>

                                    {/* Content Card (Cream) */}
                                    <div className="bg-[#F3EEE9] rounded-[24px] w-full h-[177px] flex flex-col items-center justify-center text-center p-6 pt-12 relative z-20 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
                                        <h3 className="font-inter text-2xl font-semibold text-[#1D3B29] mb-3">
                                            {item.title}
                                        </h3>
                                        <p className="font-inter text-base text-[#1D3B29] leading-[19px] max-w-[195px] opacity-90">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Timeline Node (Nested Circles) */}
                                    <div className="absolute bottom-[-52px] left-1/2 -translate-x-1/2 z-30">
                                        <div className="w-6 h-6 rounded-full bg-[#E8BF72] flex items-center justify-center">
                                            <div className="w-4 h-4 rounded-full bg-[#1D3B29]" />
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-[var(--secondary)] dark-section">
                <div className="container-premium text-center">
                    <h2
                        className="text-2xl md:text-3xl font-semibold text-white mb-4"
                        style={{ fontFamily: "var(--font-peachi)" }}
                    >
                        Ready to Experience the V Stories Difference?
                    </h2>
                    <p className="text-white/80 mb-8 max-w-md mx-auto">
                        Join thousands of customers who&apos;ve discovered the power of natural beauty.
                    </p>
                    <a href="/shop" className="btn-highlight">
                        Shop Our Collection
                    </a>
                </div>
            </section>
        </div>
    );
}
