<template>
    <nav class="bg-white/85 backdrop-blur-lg border-b border-gray-100/50 fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 shadow-sm" aria-label="Main navigation">
        <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-4">
            <router-link to="/" class="flex items-center space-x-3 group" @click="scrollToSection('home')">
                <span class="self-center text-xl sm:text-2xl font-playfair font-bold whitespace-nowrap text-gray-900 tracking-tight group-hover:text-primary transition-colors duration-300">Ayoub Tribak</span>
            </router-link>
            <button @click="toggleMenu" type="button"
                class="inline-flex items-center p-2.5 w-10 h-10 justify-center text-sm text-gray-600 rounded-xl md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                aria-controls="navbar-default" :aria-expanded="isMenuOpen">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 1h15M1 7h15M1 13h15" />
                </svg>
            </button>
            <div :class="[isMenuOpen ? 'block' : 'hidden', 'w-full md:block md:w-auto transition-all duration-300']"
                id="navbar-default">
                <ul
                    class="font-medium flex flex-col p-5 md:p-0 mt-4 md:mt-0 border border-gray-100 rounded-2xl bg-white/95 md:bg-transparent md:flex-row md:items-center md:space-x-8 md:border-0 shadow-xl md:shadow-none gap-2 md:gap-0">
                    <li>
                        <router-link to="/" class="nav-link text-gray-600 hover:text-primary font-nunito font-semibold"
                            :class="{ 'active-link text-gray-900 font-bold': activeSection === 'home' }"
                            @click="scrollToSection('home')">Home</router-link>
                    </li>
                    <li>
                        <button @click="scrollToSection('about')" class="nav-link text-gray-600 hover:text-primary font-nunito font-semibold"
                            :class="{ 'active-link text-gray-900 font-bold': activeSection === 'about' }">About</button>
                    </li>
                    <li>
                        <button @click="scrollToSection('projects')" class="nav-link text-gray-600 hover:text-primary font-nunito font-semibold"
                            :class="{ 'active-link text-gray-900 font-bold': activeSection === 'projects' }">Projects</button>
                    </li>
                    <li>
                        <button @click="scrollToSection('contact')" class="nav-link text-gray-600 hover:text-primary font-nunito font-semibold"
                            :class="{ 'active-link text-gray-900 font-bold': activeSection === 'contact' }">Contact</button>
                    </li>
                    <li class="mt-2 md:mt-0 md:ml-4">
                        <router-link to="/resume" 
                            class="inline-flex items-center justify-center bg-gray-900 text-white font-nunito font-semibold px-6 py-2.5 rounded-xl border-2 border-gray-900 hover:bg-transparent hover:text-gray-900 transition-all duration-300 shadow-sm hover:shadow-md w-full md:w-auto"
                            :class="{ 'ring-2 ring-offset-2 ring-primary': activeSection === '/resume' }" @click="scrollToSection('/resume')">
                            Resume
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const activeSection = ref(route.path === '/' ? 'home' : route.path);
const isMenuOpen = ref(false); // Track mobile menu visibility

// Toggle mobile menu
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

// Close mobile menu
const closeMenu = () => {
    isMenuOpen.value = false;
};

const NAVBAR_HEIGHT = 64;

// Handle scroll to section
const scrollToSection = (section) => {
    closeMenu(); // Close menu when a link is clicked

    if (route.path !== '/' && section !== '/resume') {
        router.push('/').then(() => {
            setTimeout(() => {
                const target = document.getElementById(section);
                if (target) {
                    const top = target.getBoundingClientRect().top + window.pageYOffset - NAVBAR_HEIGHT;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
                activeSection.value = section;
            }, 100);
        });
    } else if (section === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        activeSection.value = 'home';
    } else if (section === '/resume') {
        router.push('/resume').then(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            activeSection.value = '/resume';
        });
    } else {
        const target = document.getElementById(section);
        if (target) {
            const top = target.getBoundingClientRect().top + window.pageYOffset - NAVBAR_HEIGHT;
            window.scrollTo({ top, behavior: 'smooth' });
        }
        activeSection.value = section;
    }
};

// Update active section based on scroll position
const updateActiveSection = () => {
    const sections = ['home', 'about', 'projects', 'contact'];
    for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                activeSection.value = section;
                break;
            }
        }
    }
};

// Watch route changes
watch(() => route.path, (newPath) => {
    activeSection.value = newPath === '/' ? 'home' : newPath;
});

// Add scroll listener on mount
onMounted(() => {
    if (route.path === '/') {
        window.addEventListener('scroll', updateActiveSection);
    }
});

// Clean up scroll listener on unmount
onUnmounted(() => {
    window.removeEventListener('scroll', updateActiveSection);
});
</script>

<style scoped>
.nav-link {
    @apply block py-2 px-3 text-gray-900 rounded-sm md:border-0 md:p-0 relative transition-colors duration-300;
}

.nav-link::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 3px;
    border-radius: 6px;
    background: linear-gradient(to right, #FDC435, #FB923C);
    opacity: 0;
    transition: opacity 0.25s ease;
    pointer-events: none;
}

.nav-link:hover::after,
.active-link::after {
    opacity: 1;
}

.active-link {
    @apply border-b-2 border-transparent;
}
</style>