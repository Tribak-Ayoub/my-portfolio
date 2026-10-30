<template>
    <div class="relative bg-gray-50/50 min-h-screen font-nunito">
        <Navbar />
        <main class="pt-24 pb-20">
            <section id="resume" class="container mx-auto px-4 max-w-5xl">
                <div class="flex items-center justify-between mb-10">
                    <h1 class="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-gray-900 tracking-tight">My Resume</h1>

                    <div class="relative group" @mouseenter="showDropdown = true" @mouseleave="hideDropdownWithDelay">
                        <button class="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white font-semibold rounded-xl shadow-md hover:bg-gray-800 hover:-translate-y-0.5 transition-all duration-300">
                            Download <i class="fa-solid fa-chevron-down text-sm"></i>
                        </button>

                        <transition name="fade">
                            <ul v-if="showDropdown"
                                class="absolute top-full right-0 mt-2 bg-white shadow-xl border border-gray-100 rounded-xl w-48 z-10 overflow-hidden">
                                <li @click="downloadResume('en')"
                                    class="block w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary cursor-pointer transition-colors">
                                    Download Resume (EN)
                                </li>
                                <li @click="downloadResume('fr')"
                                    class="block w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary cursor-pointer transition-colors">
                                    Download Resume (FR)
                                </li>
                            </ul>
                        </transition>
                    </div>

                </div>

                <!-- Profile Section -->
                <div class="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <div class="grid md:grid-cols-2 gap-8 items-start">
                        <div>
                            <h2 class="text-3xl font-playfair font-bold text-gray-900 mb-2">
                                {{ userInfo.FirstName || 'First Name' }} {{ userInfo.LastName || 'Last Name' }}
                            </h2>
                            <p class="text-lg text-primary font-semibold mb-1">{{ userInfo.title || 'Your Title' }}</p>
                            <p class="text-gray-500">{{ userInfo.location || 'Location' }}</p>
                        </div>
                        <div class="space-y-3">
                            <p class="text-gray-600 flex items-center gap-3">
                                <i class="fa-solid fa-envelope text-gray-400 w-5 text-center"></i>
                                <a v-if="userInfo.Email" :href="'mailto:' + userInfo.Email"
                                    class="hover:text-primary transition-colors">
                                    {{ userInfo.Email }}
                                </a>
                                <span v-else>Not available</span>
                            </p>

                            <p class="text-gray-600 flex items-center gap-3">
                                <i class="fa-solid fa-phone text-gray-400 w-5 text-center"></i>
                                <a v-if="userInfo.Phone" :href="'tel:' + userInfo.Phone"
                                    class="hover:text-primary transition-colors">
                                    {{ userInfo.Phone }}
                                </a>
                                <span v-else>Not available</span>
                            </p>

                            <p class="text-gray-600 flex items-center gap-3">
                                <i class="fa-brands fa-linkedin text-gray-400 w-5 text-center"></i>
                                <a v-if="userInfo.LinkedIn" :href="userInfo.LinkedIn" target="_blank"
                                    class="hover:text-primary transition-colors">
                                    LinkedIn Profile
                                </a>
                                <span v-else>Not available</span>
                            </p>
                        </div>
                    </div>
                    <p v-if="userInfo.Summary" class="text-gray-600 mt-8 pt-8 border-t border-gray-100 leading-relaxed">{{ userInfo.Summary }}</p>
                </div>

                <!-- Grid for Education & Skills -->
                <div class="grid md:grid-cols-2 gap-8 mb-8">
                    <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 class="text-2xl font-playfair font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <i class="fa-solid fa-graduation-cap text-primary text-xl"></i> Education
                        </h2>
                        <ul class="space-y-6">
                            <li v-for="edu in userInfo.Educations" :key="edu.id" class="relative pl-4 border-l-2 border-gray-100">
                                <div class="absolute w-2 h-2 bg-primary rounded-full -left-[5px] top-2"></div>
                                <p class="font-bold text-gray-900 text-lg">{{ edu.title }}</p>
                                <p class="text-primary font-semibold text-sm mb-2">{{ edu.location }}</p>
                                <p class="text-sm text-gray-500 font-semibold mb-2">{{ edu.start_date }} - {{ edu.end_date }}</p>
                                <p class="text-gray-600 leading-relaxed">{{ edu.description }}</p>
                            </li>
                        </ul>
                    </div>

                    <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 class="text-2xl font-playfair font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <i class="fa-solid fa-code text-primary text-xl"></i> Skills
                        </h2>
                        <div v-if="skills.length" class="flex flex-wrap gap-2">
                            <span v-for="skill in skills" :key="skill.id"
                                class="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                                {{ skill.name }}
                            </span>
                        </div>
                        <p v-else class="text-gray-500">No skills added yet.</p>
                    </div>
                </div>

                <!-- Grid for Experience & Projects -->
                <div class="grid md:grid-cols-2 gap-8 mb-8">
                    <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 class="text-2xl font-playfair font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <i class="fa-solid fa-briefcase text-primary text-xl"></i> Experience
                        </h2>
                        <ul v-if="experiences.length" class="space-y-8">
                            <li v-for="exp in experiences" :key="exp.id" class="relative pl-4 border-l-2 border-gray-100">
                                <div class="absolute w-2 h-2 bg-primary rounded-full -left-[5px] top-2"></div>
                                <p class="font-bold text-gray-900 text-lg">{{ exp.title }}</p>
                                <p class="text-primary font-semibold text-sm mb-1">{{ exp.company }} &bull; {{ exp.location }}</p>
                                <p class="text-sm text-gray-400 font-semibold mb-3">{{ exp.start_date }} - {{ exp.end_date || 'Present' }}</p>
                                <p class="text-gray-600 leading-relaxed">{{ exp.description }}</p>
                            </li>
                        </ul>
                        <p v-else class="text-gray-500">No experience added yet.</p>
                    </div>

                    <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 class="text-2xl font-playfair font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <i class="fa-solid fa-folder-open text-primary text-xl"></i> Projects
                        </h2>
                        <ul v-if="projects.length" class="space-y-8">
                            <li v-for="project in projects" :key="project.id" class="relative pl-4 border-l-2 border-gray-100">
                                <div class="absolute w-2 h-2 bg-primary rounded-full -left-[5px] top-2"></div>
                                <p class="font-bold text-gray-900 text-lg">{{ project.name }}</p>
                                <p class="text-primary font-semibold text-sm mb-3">Role: {{ project.role }}</p>
                                <p class="text-gray-600 leading-relaxed mb-4">{{ project.description }}</p>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="tech in project.technologies" :key="tech"
                                        class="text-xs font-semibold bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg">
                                        {{ tech }}
                                    </span>
                                </div>
                            </li>
                        </ul>
                        <p v-else class="text-gray-500">No projects added yet.</p>
                    </div>
                </div>

                <!-- Bottom Details -->
                <div class="grid md:grid-cols-3 gap-8">
                    <!-- Certifications -->
                    <div v-if="userInfo.Certifications.length" class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 class="text-xl font-playfair font-bold text-gray-900 mb-4">Certifications</h2>
                        <ul class="space-y-4">
                            <li v-for="cert in userInfo.Certifications" :key="cert.id">
                                <p class="font-bold text-gray-900">{{ cert.title }}</p>
                                <p class="text-primary text-sm font-semibold">{{ cert.issuer }}</p>
                                <p class="text-sm text-gray-500">Completed in {{ cert.date }}</p>
                            </li>
                        </ul>
                    </div>

                    <!-- Languages -->
                    <div v-if="userInfo.Languages.length" class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 class="text-xl font-playfair font-bold text-gray-900 mb-4">Languages</h2>
                        <ul class="space-y-3">
                            <li v-for="lang in userInfo.Languages" :key="lang.name" class="flex justify-between items-center border-b border-gray-50 pb-2">
                                <span class="font-semibold text-gray-900">{{ lang.name }}</span>
                                <span class="text-sm text-gray-500">{{ lang.level }}</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Additional Skills -->
                    <div v-if="userInfo.AdditionalSkills.length" class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 class="text-xl font-playfair font-bold text-gray-900 mb-4">Additional Skills</h2>
                        <ul class="space-y-2">
                            <li v-for="skill in userInfo.AdditionalSkills" :key="skill" class="flex items-center gap-2 text-gray-700">
                                <i class="fa-solid fa-check text-primary text-sm"></i> {{ skill }}
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
    </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

import { inject, ref } from 'vue';

const userInfo = inject('userInfo');
const skills = inject('skills');
const projects = inject('projects');
const experiences = inject('experiences');
const showDropdown = ref(false);
let timeoutId;

const hideDropdownWithDelay = () => {
    timeoutId = setTimeout(() => {
        showDropdown.value = false;
    }, 300); // 300ms delay
};

const downloadResume = (lang) => {
    const fileMap = {
        en: '/Tribak_Ayoub_FullStack_Developer_en.pdf',
        fr: '/Tribak_Ayoub_FullStack_Developer_fr.pdf',
    };

    const link = document.createElement('a');
    link.href = fileMap[lang];
    link.download = fileMap[lang].split('/').pop();
    link.click();

    showDropdown.value = false;
};


</script>

<style scoped>
.container {
    max-width: 900px;
}
</style>