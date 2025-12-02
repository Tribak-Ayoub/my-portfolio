<script setup>
import { ref, provide, onMounted } from 'vue';
import { inject } from "@vercel/analytics"

inject();

const skills = ref([]);
const projects = ref([]);
const experiences = ref([]);
const userInfo = ref([]);

onMounted(async () => {
    try {
        const [skillsResponse, projectsResponse, experiencesResponse, userInfoResponse] = await Promise.all([
            fetch('/skills.json'),
            fetch('/projects.json'),
            fetch('/experiences.json'),
            fetch('/userInfo.json')
        ]);
        const skillsData = await skillsResponse.json();
        const projectsData = await projectsResponse.json();
        const experiencesData = await experiencesResponse.json();
        const userInfoData = await userInfoResponse.json();

        projectsData.reverse();
        
        skills.value = skillsData;
        projects.value = projectsData;
        experiences.value = experiencesData;
        userInfo.value = userInfoData;
    } catch (error) {
        console.error(error);
    }
});

// Provide the data to all child components
provide('userInfo', userInfo);
provide('skills', skills);
provide('projects', projects);
provide('experiences', experiences);

</script>

<template>
    <router-view />
</template>