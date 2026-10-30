<template>
    <footer class="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">

            <div class="mb-6 md:mb-0">
                <h2 class="text-xl font-bold text-white tracking-tight">{{ userInfo.FirstName }} {{ userInfo.LastName }}</h2>
                <p class="text-gray-400 text-sm mt-1 font-nunito">{{ userInfo.title }}</p>
            </div>

            <div class="text-gray-500 text-sm font-nunito mb-6 md:mb-0">
                © {{ new Date().getFullYear() }} {{ userInfo.FirstName }} {{ userInfo.LastName }}. All rights reserved.
            </div>

            <div class="flex space-x-6">
                <a :href="userInfo.Github" target="_blank" class="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-300">
                    <i class="fab fa-github text-2xl"></i>
                </a>
                <a :href="userInfo.LinkedIn" target="_blank" class="text-gray-400 hover:text-[#0A66C2] transform hover:scale-110 transition-all duration-300">
                    <i class="fab fa-linkedin text-2xl"></i>
                </a>
                <a :href="'mailto:' + userInfo.Email" class="text-gray-400 hover:text-primary transform hover:scale-110 transition-all duration-300">
                    <i class="fas fa-envelope text-2xl"></i>
                </a>
            </div>
        </div>

    </footer>
</template>

<script setup>
import { inject } from 'vue';

const userInfo = inject('userInfo');
</script>
