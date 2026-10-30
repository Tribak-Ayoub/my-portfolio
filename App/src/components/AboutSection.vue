<template>
    <div class="max-w-7xl mx-auto px-4 py-16">
        <div class="flex flex-col lg:flex-row justify-between gap-10">
            <div class="text-center lg:text-left">

                <!-- Section Title -->
                <p class="text-primary font-nunito font-bold text-sm sm:text-base md:text-lg tracking-widest uppercase mb-2">
                    About Me
                </p>

                <!-- Heading -->
                <h2 class="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-gray-900 mt-4 mb-6 tracking-tight">
                    Passionate Full Stack Developer
                </h2>

                <!-- About Text -->
                <p class="text-gray-500 font-nunito text-base sm:text-lg md:text-xl max-w-4xl mx-auto lg:mx-0 mt-6 mb-8 leading-relaxed">
                    {{ userInfo.About }}
                </p>

            </div>
        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue';

const userInfo = inject('userInfo');
</script>
