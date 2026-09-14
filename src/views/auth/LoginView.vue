<template>
  <div class="flex flex-col bg-[#f7f9fb] min-h-screen w-full flex-grow">
    <NavbarPublic />

    <main class="flex-grow flex items-center justify-center p-3 sm:p-4 md:p-6 w-full">
        <div class="max-w-4xl w-full flex flex-col md:flex-row card-main m-auto overflow-hidden bg-white shadow-2xl rounded-2xl border border-gray-100">
            <!-- Columna Izquierda con Imagen Conceptual -->
            <div class="w-full md:w-1/2 bg-black relative p-4 sm:p-6 md:p-10 text-white flex flex-col justify-end h-24 sm:h-32 md:h-auto md:min-h-[380px] overflow-hidden">
                <img src="/login_art_pki.png"
                     alt="Autenticación PKI Forense"
                     class="absolute inset-0 w-full h-full object-cover object-center opacity-90 filter brightness-[1.05]">
                <!-- Gradient overlay para legibilidad del texto -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-0"></div>
                
                <div class="relative z-10">
                    <h2 class="text-lg sm:text-2xl md:text-3xl font-heading font-bold mb-1 leading-tight">Certificación Forense Digital</h2>
                    <p class="text-gray-200 text-xs leading-relaxed max-w-xs hidden sm:block">Acceso al sistema para la certificación y validación forense de obras de arte.</p>
                </div>
            </div>

            <!-- Columna Derecha con Formulario -->
            <div class="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-white">
                <div class="mb-5">
                    <h1 class="text-2xl font-heading font-bold text-gray-900">Iniciar Sesión</h1>
                    <p class="text-gray-500 text-xs mt-1">Ingrese sus credenciales registradas en el sistema.</p>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-3.5">
                    <div>
                        <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Correo Electrónico</label>
                        <input v-model="email" type="email" class="input-standard w-full !text-sm mt-1" placeholder="usuario@ejemplo.com" required>
                        <p v-if="!email" class="text-[10px] text-gray-400 mt-1 text-left">Ej. usuario@ejemplo.com</p>
                        <p v-else-if="!correoValido" class="text-[10px] text-red-500 mt-1 text-left">Ingresa un correo electrónico válido.</p>
                    </div>

                    <div>
                        <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contraseña</label>
                        <div class="relative mt-1">
                            <input v-model="password" :type="showPassword ? 'text' : 'password'" class="input-standard w-full !text-sm pr-9" placeholder="••••••••" required>
                            <button @click="showPassword = !showPassword" type="button" tabindex="-1" class="absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-400 hover:text-black transition-colors focus:outline-none">
                                <span class="material-symbols-outlined text-[18px] select-none">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                            </button>
                        </div>
                    </div>
                    
                    <button type="submit" 
                            :disabled="!isFormValid || isLoading"
                            :class="['w-full py-3.5 mt-2 font-bold tracking-widest text-xs uppercase transition-all shadow-md', 
                                    isFormValid ? 'btn-black shadow-black/10' : 'bg-gray-300 text-gray-500 cursor-not-allowed rounded-lg']">
                        <span v-if="isLoading" class="material-symbols-outlined animate-spin align-middle mr-2 text-sm">autorenew</span>
                        <span>Entrar al Sistema</span>
                    </button>
                </form>

                <p class="mt-6 text-center text-xs text-gray-500">
                    ¿No tienes cuenta? <router-link to="/register" class="text-secondary font-bold hover:underline">Regístrate</router-link>
                </p>
            </div>
        </div>
    </main>

    <!-- Footer Reutilizable Compacto -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { showToast } from '../../services/toastService';
import Footer from '../../components/Footer.vue';
import NavbarPublic from '../../components/NavbarPublic.vue';

const API_URL_AUTH = process.env.VUE_APP_API_AUTH || '/api/v1/auth';

const router = useRouter();
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const isLoading = ref(false);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const correoValido = computed(() => EMAIL_REGEX.test(email.value));

const isFormValid = computed(() => {
    return email.value.trim() !== '' && correoValido.value && password.value.trim() !== '';
});

const handleLogin = async () => {
    if (!isFormValid.value) return;
    
    isLoading.value = true;
    try {
        const response = await fetch(`${API_URL_AUTH}/login`, {
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
            const user = data.user || {};
            localStorage.setItem('estaAutenticado', 'true');
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userEmail', user.correo || email.value);
            if (user.cedula) {
                localStorage.setItem('userCedula', user.cedula);
            }
            if (user.nombres) {
                localStorage.setItem('userNombres', user.nombres);
            }
            if (user.apellidos) {
                localStorage.setItem('userApellidos', user.apellidos);
            }
            showToast('Sesión iniciada con éxito', 'success');
            router.push('/certification');
        } else {
            const errorData = await response.json().catch(() => null);
            const mensaje = (errorData && errorData.error) ? errorData.error : 'Credenciales incorrectas';
            throw new Error(mensaje);
        }
    } catch (error) {
        console.error("Login error:", error);
        const mensaje = error instanceof TypeError
            ? 'No se pudo conectar con el servidor. Verifica tu conexión e intenta nuevamente.'
            : (error.message || 'Ocurrió un error inesperado. Intente nuevamente.');
        showToast(mensaje, 'error');
    } finally {
        isLoading.value = false;
    }
};
</script>
