<template>
    <div class="relative bg-white selection:bg-primary/30 selection:text-gray-900 font-nunito" style="scroll-padding-top: 64px;">
        <Navbar />
        <main class="pt-16">
            <!-- Hero: white bg -->
            <section id="home" class="bg-white">
                <HeroSection />
            </section>

            <!-- About + Skills: very light warm gray -->
            <section id="about" class="bg-gray-50">
                <AboutSection />
                <SkillsSection />
            </section>

            <!-- Projects: white -->
            <section id="projects" class="bg-white">
                <ProjectsCard />
            </section>

            <!-- Contact: light gray -->
            <section id="contact" class="bg-gray-50">
                <ContactForm />
            </section>

            <Footer />
        </main>
    </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import HeroSection from '../components/HeroSection.vue';
import AboutSection from '../components/AboutSection.vue';
import SkillsSection from '../components/SkillsSection.vue';
import ProjectsCard from '../components/ProjectsCard.vue';
import ContactForm from '../components/ContactForm.vue';
import Footer from '../components/Footer.vue';
</script>