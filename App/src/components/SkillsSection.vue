<template>
  <div class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">

      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 tracking-tight">
          My Skills
        </h2>
        <p class="text-lg text-gray-500 font-nunito max-w-2xl mx-auto">
          Technologies and tools I'm proficient in
        </p>
        <div class="w-20 h-1.5 bg-gradient-to-r from-primary to-yellow-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <!-- Skills Grid -->
      <div v-if="skills.length"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

        <div v-for="skill in skills" :key="skill.id"
          class="group flex flex-col items-center justify-center bg-white p-6 shadow-sm border border-gray-100 rounded-2xl hover:shadow-lg hover:-translate-y-1 hover:border-primary/20 transition-all duration-300">

          <!-- Icon wrapper -->
          <div class="skill-icon-wrap mb-4 flex justify-center items-center">
            <!-- Pure <img> icons: show brand color, opacity treatment on hover -->
            <span v-if="isImgTag(skill.icon)"
              v-html="skill.icon"
              class="skill-img-icon opacity-75 group-hover:opacity-100 transition-opacity duration-300">
            </span>
            <!-- Font-awesome <i> OR inline <svg> with currentColor: inherit color -->
            <span v-else
              v-html="skill.icon"
              class="text-5xl text-gray-500 group-hover:text-primary transition-colors duration-300 flex justify-center items-center skill-svg-icon">
            </span>
          </div>

          <!-- Skill Name -->
          <h3 class="text-sm sm:text-base font-bold text-gray-900 tracking-tight text-center leading-tight">
            {{ skill.name }}
          </h3>

          <!-- Skill Level -->
          <p class="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-2">
            {{ skill.level }}
          </p>
        </div>

      </div>

      <p v-else class="text-center text-gray-500 font-nunito mt-10">Loading skills...</p>

    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';

const skills = inject('skills');

// Only real <img src="..."> tags use their own colors (brand logos from /icons/)
// Everything else (FontAwesome <i> tags, inline <svg> with currentColor) inherits color
function isImgTag(iconHtml) {
  return iconHtml && iconHtml.trimStart().startsWith('<img');
}
</script>

<style scoped>
/* Normalise img-based icons to a consistent size */
.skill-img-icon :deep(img) {
  width: 3rem;
  height: 3rem;
  object-fit: contain;
  display: block;
}

/* Normalise inline SVG icons to match font-icon size */
.skill-svg-icon :deep(svg) {
  width: 1em;
  height: 1em;
}
</style>
