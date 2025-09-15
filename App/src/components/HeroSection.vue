<template>
    <div>
        <!-- Main Container -->
        <div class="relative z-10 max-w-screen-xl mx-auto px-4 py-6">
            <div class="flex flex-col lg:flex-row justify-between gap-6 mt-9">

                <!-- Text Section -->
                <div class="lg:w-1/2 text-center lg:text-left">

                    <!-- Job Title -->
                    <p
                        class="bg-gradient-to-r from-[#FDC435] to-[#FB923C] bg-clip-text text-transparent font-nunito font-semibold text-lg sm:text-xl md:text-2xl uppercase">
                        Full Stack Developer
                    </p>

                    <!-- Name Heading -->
                    <h1
                        class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-gray-900 mt-4 mb-6">
                        Hello, my name <br> is {{ userInfo.FirstName }} {{ userInfo.LastName }}
                    </h1>

                    <!-- Description -->
                    <p class="text-gray-400 font-nunito text-base sm:text-lg md:text-xl mt-5 mb-7">
                        A passionate web developer crafting modern web applications and innovative digital solutions.
                    </p>

                    <!-- Buttons & Social Links -->
                    <div class="flex flex-wrap justify-center lg:justify-start gap-4 mt-7">

                        <!-- Resume Dropdown Button -->
                        <div class="relative" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                            <!-- Button -->
                            <BaseButton :text="'Resume <i class=\'fa-solid fa-chevron-down ml-2\'></i>'"
                                title="Download Resume"
                                btnClass="px-5 py-2 text-sm sm:text-base  bg-gradient-to-r from-[#FDC435] to-[#FB923C] hover:from-[#FBBF24] hover:to-[#F97316] text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition duration-300" />

                            <!-- Dropdown -->
                            <div v-if="showDropdown"
                                class="absolute z-20 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                                <button @click="downloadResume('en')"
                                    class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                                    Download Resume (EN)
                                </button>
                                <button @click="downloadResume('fr')"
                                    class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                                    Download Resume (FR)
                                </button>
                            </div>
                        </div>

                        <!-- Contact Button -->
                        <BaseButton @click="scrollToSection('contact')" text="Contact me" title="Contact Me"
                            btnClass="px-5 py-2 text-sm sm:text-base border border-gray-700 text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition duration-300" />

                        <!-- GitHub & LinkedIn Icons -->
                        <a :href="userInfo.Github" target="_blank" title="GitHub"
                            class="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white text-gray-900 shadow-md hover:bg-yellow-400 hover:text-white transition duration-300">
                            <i class="fab fa-github text-lg sm:text-xl"></i>
                        </a>

                        <a :href="userInfo.LinkedIn" target="_blank"
                            title="LinkedIn"
                            class="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white text-gray-900 shadow-md hover:bg-yellow-400 hover:text-white transition duration-300">
                            <i class="fab fa-linkedin text-lg sm:text-xl"></i>
                        </a>

                    </div>
                </div>

                <!-- Image Section -->
                <div class="flex-1 flex justify-center">
                    <img src="../assets/heroSection.svg" alt="Hero Image" class="w-4/5 h-auto" />
                </div>

            </div>
        </div>

        <!-- Background Image (for larger screens) -->
        <div class="hidden lg:block absolute top-0 right-0 w-1/2 z-0">
            <img src="../assets/yellow-bg.svg" alt="Yellow Background" class="w-full h-auto object-cover" />
        </div>
    </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import BaseButton from './BaseButton.vue';

const userInfo = inject('userInfo');
const showDropdown = ref(false);
let hideTimeout = null;

const scrollToSection = (section) => {
    const target = document.getElementById(section);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
};

const downloadResume = (lang) => {
    let fileName = '';
    if (lang === 'en') {
        fileName = '/Tribak_Ayoub_FullStack_Developer_en.pdf';
    } else if (lang === 'fr') {
        fileName = '/Tribak_Ayoub_FullStack_Developer_fr.pdf';
    }

    const link = document.createElement('a');
    link.href = fileName;
    link.download = fileName.split('/').pop();
    link.click();
    showDropdown.value = false;
};

// Dropdown show/hide with delay
const handleMouseEnter = () => {
    clearTimeout(hideTimeout);
    showDropdown.value = true;
};

const handleMouseLeave = () => {
    hideTimeout = setTimeout(() => {
        showDropdown.value = false;
    }, 200); // 200ms delay before hiding
};
</script>
