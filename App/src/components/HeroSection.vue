<template>
    <div class="relative w-full overflow-hidden lg:overflow-visible">
        <!-- Main Container -->
        <div class="relative z-10 max-w-7xl mx-auto px-4 py-8 min-h-[calc(100vh-64px)]">
            <div class="flex flex-col lg:flex-row justify-between items-center gap-6 h-full">

                <!-- Text Section -->
                <div class="lg:w-1/2 text-center lg:text-left flex flex-col justify-center">
                    
                    <!-- Job Title -->
                    <p class="text-primary font-nunito font-bold text-sm sm:text-base md:text-lg tracking-widest uppercase mb-2">
                        Full Stack Developer
                    </p>

                    <!-- Name Heading -->
                    <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-extrabold text-gray-900 leading-tight mb-6">
                        Hello, my name <br> is <span class="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">{{ userInfo.FirstName }} {{ userInfo.LastName }}</span>
                    </h1>

                    <!-- Description -->
                    <p class="text-gray-500 font-nunito text-base sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                        A passionate web developer crafting modern web applications and innovative digital solutions.
                    </p>

                    <!-- Buttons & Social Links -->
                    <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4">

                        <!-- Resume Dropdown Button -->
                        <div class="relative group" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                            <!-- Button -->
                            <BaseButton :text="'Resume <i class=\'fa-solid fa-chevron-down ml-2 text-sm\'></i>'"
                                title="Download Resume"
                                btnClass="px-6 py-3 text-sm sm:text-base bg-gray-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300" />

                            <!-- Dropdown -->
                            <div v-if="showDropdown"
                                class="absolute z-20 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden animate-fade-in">
                                <button @click="downloadResume('en')"
                                    class="block w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                                    Download Resume (EN)
                                </button>
                                <button @click="downloadResume('fr')"
                                    class="block w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                                    Download Resume (FR)
                                </button>
                            </div>
                        </div>

                        <!-- Contact Button -->
                        <BaseButton @click="scrollToSection('contact')" text="Contact me" title="Contact Me"
                            btnClass="px-6 py-3 text-sm sm:text-base border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-900 hover:text-gray-900 hover:-translate-y-0.5 transition-all duration-300 bg-white shadow-sm hover:shadow-md" />

                        <!-- GitHub & LinkedIn Icons -->
                        <div class="flex gap-3 ml-2">
                            <a :href="userInfo.Github" target="_blank" title="GitHub"
                                class="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 text-gray-600 border border-gray-100 shadow-sm hover:bg-gray-900 hover:text-white hover:-translate-y-1 transition-all duration-300">
                                <i class="fab fa-github text-xl"></i>
                            </a>

                            <a :href="userInfo.LinkedIn" target="_blank" title="LinkedIn"
                                class="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 text-gray-600 border border-gray-100 shadow-sm hover:bg-[#0A66C2] hover:text-white hover:-translate-y-1 transition-all duration-300">
                                <i class="fab fa-linkedin-in text-xl"></i>
                            </a>
                        </div>
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

const NAVBAR_HEIGHT = 64;
const scrollToSection = (section) => {
    const target = document.getElementById(section);
    if (target) {
        const top = target.getBoundingClientRect().top + window.pageYOffset - NAVBAR_HEIGHT;
        window.scrollTo({ top, behavior: 'smooth' });
    }
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
