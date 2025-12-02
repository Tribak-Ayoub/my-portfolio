<template>
    <div class="max-w-7xl mx-auto px-4 py-16 bg-white">
        <!-- Header Section -->
        <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">My Projects</h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">A showcase of my latest work and creative solutions</p>
            <div class="w-24 h-1 bg-gradient-to-r from-[#FDC435] to-[#FB923C] mx-auto mt-6 rounded-full"></div>
        </div>

        <!-- Projects Grid -->
        <div v-if="projects.length" class="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="project in projects" :key="project.id"
                class="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white rounded-xl">

                <!-- Video Thumbnail -->
                <div class="relative aspect-[16/9] overflow-hidden cursor-pointer bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl"
                    @click="openVideo(project.video)">
                    <img v-if="project.thumbnail" :src="project.thumbnail" :alt="`${project.name} preview`"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

                    <!-- Play Button Overlay -->
                    <div
                        class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div
                            class="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <svg class="w-8 h-8 text-white fill-white" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>

                    <!-- Status Badge -->
                    <div class="absolute top-4 left-4">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border"
                            :class="getStatusClass(project.status)">
                            {{ getStatusLabel(project.status) }}
                        </span>
                    </div>
                </div>

                <!-- Content -->
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-900 mb-3">
                        {{ project.name }}
                    </h3>

                    <!-- Description with "Read more" appended -->
                    <p class="text-gray-600 mb-2 leading-relaxed">
                        <template v-if="expandedDescriptions[project.id]">
                            {{ project.description }}
                            <button @click="toggleDescription(project.id)"
                                class="text-sm text-amber-500 hover:underline ml-2">
                                Show less
                            </button>
                        </template>

                        <template v-else>
                            {{ truncatedText(project.description, 100) }}...
                            <button @click="toggleDescription(project.id)"
                                class="text-sm text-amber-500 hover:underline ml-1">
                                Show more
                            </button>
                        </template>
                    </p>

                    <!-- Technologies -->
                    <div v-if="project.technologies && project.technologies.length" class="mb-6">
                        <div class="flex flex-wrap gap-2">
                            <span v-for="tech in project.technologies" :key="tech"
                                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#FFF7E0] text-[#B45309] border border-[#FDE68A] hover:bg-[#FDE68A] transition-colors duration-200">
                                {{ tech }}
                            </span>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-3">
                        <!-- Live Demo Button -->
                        <a v-if="project.demo && project.demo !== '#'" :href="project.demo" target="_blank"
                            rel="noopener noreferrer" class="flex-1">
                            <button
                                class="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#FDC435] to-[#FB923C] hover:from-[#FBBF24] hover:to-[#F97316] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Live Demo
                            </button>
                        </a>
                        <button v-else disabled
                            class="flex-1 flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-400 font-medium rounded-lg cursor-not-allowed">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Live Demo
                        </button>

                        <!-- GitHub Button -->
                        <a v-if="project.github" :href="project.github" target="_blank" rel="noopener noreferrer"
                            class="flex-1">
                            <button
                                class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300">
                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div v-else class="text-center text-gray-700 text-lg mt-10">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
            Loading projects...
        </div>

        <!-- Video Modal -->
        <div v-if="showModal"
            class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            @click="closeModal">
            <div class="relative w-full max-w-4xl" @click.stop>
                <video :src="currentVideo" controls autoplay class="w-full rounded-lg shadow-2xl"
                    style="max-height: 80vh" />
                <button @click="closeModal"
                    class="absolute -top-12 right-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 transition-all duration-200">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue'
const projects = inject('projects', null)

const showModal = ref(false)
const currentVideo = ref(null)

const expandedDescriptions = ref({}) // project.id => true/false

// Status configuration
const statusConfig = {
    active: {
        class: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        label: 'Active'
    },
    'in-progress': {
        class: 'bg-amber-100 text-amber-700 border-amber-200',
        label: 'In Progress'
    },
    archived: {
        class: 'bg-slate-100 text-slate-700 border-slate-200',
        label: 'Archived'
    },
    'on-hold': {
        class: 'bg-violet-100 text-violet-700 border-violet-200',
        label: 'On Hold'
    }
}

function getStatusClass(status) {
    return statusConfig[status]?.class || 'bg-gray-100 text-gray-700 border-gray-200'
}

function getStatusLabel(status) {
    return statusConfig[status]?.label || status
}

function openVideo(videoUrl) {
    currentVideo.value = videoUrl
    showModal.value = true
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
}

function closeModal() {
    currentVideo.value = null
    showModal.value = false
    // Restore body scroll
    document.body.style.overflow = 'auto'
}

function toggleDescription(id) {
    expandedDescriptions.value[id] = !expandedDescriptions.value[id]
}

function truncatedText(text, length) {
    if (!text) return 'No description available'
    return text.length > length ? text.slice(0, length) : text
}

// Cleanup on unmount
import { onUnmounted } from 'vue'
onUnmounted(() => {
    document.body.style.overflow = 'auto'
})
</script>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
