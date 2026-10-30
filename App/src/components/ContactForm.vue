<template>
    <div class="bg-gray-50 py-16">
    <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 sm:p-12 border border-gray-100">
        <h2 class="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 text-center tracking-tight">Contact Me</h2>
        <p class="text-gray-500 font-nunito text-center mt-3 text-lg">Let's get in touch! Fill out the form below.</p>

        <!-- Contact Form -->
        <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
            <div>
                <label for="name" class="block text-gray-700 font-semibold mb-2 text-sm">Your Name</label>
                <input v-model="form.name" type="text" id="name" placeholder="John Doe"
                    class="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-white transition-all duration-300 outline-none placeholder-gray-400"
                    required />
            </div>

            <div>
                <label for="email" class="block text-gray-700 font-semibold mb-2 text-sm">Email Address</label>
                <input v-model="form.email" type="email" id="email" placeholder="you@example.com"
                    class="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-white transition-all duration-300 outline-none placeholder-gray-400"
                    required />
            </div>

            <div>
                <label for="message" class="block text-gray-700 font-semibold mb-2 text-sm">Your Message</label>
                <textarea v-model="form.message" id="message" rows="5" placeholder="Type your message here..."
                    class="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-white transition-all duration-300 outline-none placeholder-gray-400 resize-y"
                    required></textarea>
            </div>

            <button type="submit" :disabled="loading"
                class="w-full py-4 mt-2 bg-gray-900 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-gray-800 transition-all duration-300 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed">
                <svg v-if="loading" class="animate-spin h-5 w-5 mr-3 text-white" fill="none" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a8 8 0 00-8 8H4z">
                    </path>
                </svg>
                {{ loading ? "Sending Message..." : "Send Message" }}
            </button>

            <div class="h-6 mt-4 flex items-center justify-center">
                <p v-if="successMessage" class="text-emerald-600 font-semibold text-sm animate-fade-in">
                    {{ successMessage }}
                </p>
                <p v-if="errorMessage" class="text-red-500 font-semibold text-sm animate-fade-in">
                    {{ errorMessage }}
                </p>
            </div>
        </form>
    </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import emailjs from 'emailjs-com';

const form = ref({
    name: '',
    email: '',
    message: ''
});

const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

// Initialize EmailJS when component is mounted
onMounted(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID);
});

const handleSubmit = async () => {
    loading.value = true;
    successMessage.value = '';
    errorMessage.value = '';

    // EmailJS credentials
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    const templateParams = {
        name: form.value.name,
        email: form.value.email,
        message: form.value.message
    };

    try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
        successMessage.value = 'Your message has been sent successfully!';
        form.value = { name: '', email: '', message: '' };
    } catch (error) {
        console.error('EmailJS Error:', error);
        errorMessage.value = 'Something went wrong. Please try again.';
    } finally {
        loading.value = false;
    }
};
</script>
