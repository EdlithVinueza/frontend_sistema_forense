<template>
  <div class="flex flex-col bg-[#f7f9fb] h-screen overflow-y-auto overflow-x-hidden">
    <nav class="nav-standard flex justify-between items-center bg-white/95 backdrop-blur-md shadow-sm px-8 py-3 sticky top-0 w-full z-50">
        <div class="flex items-center gap-10">
            <router-link to="/" class="font-heading font-bold text-xl tracking-tighter uppercase text-black">VerisArt</router-link>
            <div class="hidden md:flex gap-6 text-sm font-medium text-gray-600">
                <router-link to="/" class="hover:text-black">Sobre Nosotros</router-link>
            </div>
        </div>
        <div class="flex items-center gap-6">
            <router-link to="/login" class="text-sm font-semibold text-black">Iniciar Sesión</router-link>
            <router-link to="/register" class="btn-black !py-2 !px-4 !text-xs uppercase tracking-widest hover:scale-105 transition-transform">Registrarse</router-link>
        </div>
    </nav>

    <main class="flex-grow flex items-center justify-center p-4 md:p-6">
        <div class="max-w-4xl w-full flex flex-col md:flex-row card-main m-auto overflow-hidden bg-white shadow-2xl rounded-2xl border border-gray-100">
            <!-- Columna Izquierda con Imagen Conceptual -->
            <div class="w-full md:w-1/2 bg-black relative p-8 md:p-10 text-white flex flex-col justify-end min-h-[380px] overflow-hidden">
                <img src="/login_art_pki.png"
                     alt="Autenticación PKI Forense"
                     class="absolute inset-0 w-full h-full object-cover object-center opacity-90 filter brightness-[1.05]">
                <!-- Gradient overlay para legibilidad del texto -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-0"></div>
                
                <div class="relative z-10">
                    <span class="font-mono text-[10px] text-[#6cf8bb] tracking-[0.25em] uppercase font-bold">SEGURIDAD PKI</span>
                    <h2 class="text-3xl font-heading font-bold mt-1 mb-2 leading-tight">Integridad Forense.</h2>
                    <p class="text-gray-300 text-xs leading-relaxed max-w-xs">Acceda al panel de certificación de alta seguridad para validar la autenticidad de sus obras.</p>
                </div>
            </div>

            <!-- Columna Derecha con Formulario -->
            <div class="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-white">
                <div class="mb-6">
                    <h1 class="text-2xl font-heading font-bold text-gray-900">Iniciar Sesión</h1>
                    <p class="text-gray-500 text-xs mt-1">Ingrese sus credenciales registradas en el sistema.</p>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-4">
                    <div>
                        <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Correo Electrónico</label>
                        <input v-model="email" type="email" class="input-standard w-full !text-sm mt-1" placeholder="usuario@ejemplo.com" required>
                    </div>

                    <div>
                        <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contraseña</label>
                        <div class="relative mt-1">
                            <input v-model="password" :type="showPassword ? 'text' : 'password'" class="input-standard w-full !text-sm pr-10" placeholder="••••••••" required>
                            <button @click="showPassword = !showPassword" type="button" class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-black">
                                <span class="material-symbols-outlined text-lg">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
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
        showToast(error.message || 'Error al conectar con el servidor', 'error');
    } finally {
        isLoading.value = false;
    }
};
</script>
