<template>
  <div class="flex flex-col bg-[#f7f9fb] h-screen overflow-y-auto">
    <nav class="nav-standard flex justify-between items-center bg-white shadow-sm px-6 py-4">
        <div class="flex items-center gap-10">
            <router-link to="/" class="font-heading font-bold text-xl tracking-tighter uppercase text-black">VerisArt</router-link>
            <div class="hidden md:flex gap-6 text-sm font-medium text-gray-500">
                <router-link to="/" class="hover:text-black">Sobre Nosotros</router-link>
            </div>
        </div>
        <div class="flex items-center gap-6">
            <router-link to="/login" class="text-sm font-semibold text-black">Iniciar Sesión</router-link>
            <router-link to="/register" class="btn-black !py-2 !text-xs uppercase tracking-widest">Registrarse</router-link>
        </div>
    </nav>

    <main class="flex-grow flex p-6">
        <div class="max-w-4xl w-full flex flex-col md:flex-row card-main m-auto overflow-hidden bg-white shadow-2xl rounded-2xl">
            <div class="w-full md:w-1/2 bg-black relative p-12 text-white flex flex-col justify-end min-h-[400px]">
                <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000"
                    class="absolute inset-0 w-full h-full object-cover opacity-70">
                <div class="relative z-10">
                    <h2 class="text-4xl font-heading font-bold mb-4">Integridad Forense.</h2>
                    <p class="text-gray-400 text-sm">Acceda al panel de certificación de alta seguridad.</p>
                </div>
            </div>
            <div class="w-full md:w-1/2 p-10 flex flex-col justify-center">
                <h1 class="text-2xl font-heading font-bold mb-8 text-black">Iniciar Sesión</h1>
                <form @submit.prevent="handleLogin" class="space-y-4">
                    <div class="relative">
                        <input v-model="email" type="email" class="input-standard w-full !text-sm" placeholder="Correo Electrónico" required>
                    </div>
                    <div class="relative">
                        <input v-model="password" :type="showPassword ? 'text' : 'password'" class="input-standard w-full !text-sm pr-10" placeholder="Contraseña" required>
                        <button @click="showPassword = !showPassword" type="button" class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-black">
                            <span class="material-symbols-outlined text-lg">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                        </button>
                    </div>
                    
                    <button type="submit" 
                            :disabled="!isFormValid || isLoading"
                            :class="['w-full py-4 mt-2 font-bold tracking-widest text-xs uppercase transition-all', 
                                    isFormValid ? 'btn-black' : 'bg-gray-300 text-gray-500 cursor-not-allowed rounded-lg']">
                        <span v-if="isLoading" class="material-symbols-outlined animate-spin align-middle mr-2">autorenew</span>
                        Entrar al Sistema
                    </button>
                </form>
                <p class="mt-6 text-center text-xs text-gray-500">¿No tienes cuenta? <router-link to="/register" class="text-secondary font-bold hover:underline">Regístrate</router-link></p>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-black text-white py-12 mt-auto">
        <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-[#6cf8bb]">policy</span>
                <span class="font-heading font-bold text-lg tracking-tighter uppercase">VerisArt Forense</span>
            </div>
            <p class="text-gray-400 text-xs text-center md:text-left">
                © 2026 Sistema de Certificación Forense. Todos los derechos reservados.<br/>
                Implementado para el proyecto de titulación.
            </p>
        </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { showToast } from '../../services/toastService';

const router = useRouter();
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const isLoading = ref(false);

const isFormValid = computed(() => {
    return email.value.trim() !== '' && password.value.trim() !== '';
});

const handleLogin = async () => {
    if (!isFormValid.value) return;
    
    isLoading.value = true;
    try {
        const response = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                correo: email.value,
                password: password.value
            })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('estaAutenticado', 'true');
            localStorage.setItem('userEmail', data.correo || email.value);
            showToast('Sesión iniciada con éxito', 'success');
            router.push('/certification');
        } else {
            const errorText = await response.text();
            throw new Error(errorText || 'Credenciales incorrectas');
        }
    } catch (error) {
        console.error("Login error:", error);
        showToast(error.message || 'Error al conectar con el servidor', 'error');
    } finally {
        isLoading.value = false;
    }
};
</script>
