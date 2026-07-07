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
        <div class="max-w-6xl w-full flex flex-col md:flex-row card-main m-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
            
            <div class="w-full md:w-5/12 relative p-6 md:p-8 text-white flex flex-col justify-between bg-black min-h-[400px]">
                <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000"
                    class="absolute inset-0 w-full h-full object-cover opacity-60">
                <div class="relative z-10">
                    <span class="font-mono text-[9px] text-[#6cf8bb] tracking-[0.3em] uppercase font-bold">Protocolo de Registro</span>
                    <h2 class="text-2xl font-heading font-bold mt-2 leading-tight">Acceso Forense Autorizado.</h2>
                    <p class="text-gray-300 mt-2 text-xs leading-relaxed max-w-xs">
                        Establezca su identidad única dentro del ecosistema de certificación de arte más seguro del mundo.
                    </p>
                </div>
                
                <div class="relative z-10 bg-black/50 backdrop-blur-md border border-white/10 p-3 rounded-xl mt-4">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="material-symbols-outlined text-[#6cf8bb]">verified_user</span>
                        <span class="text-[10px] font-bold uppercase tracking-widest">Seguridad de Nivel Profesional</span>
                    </div>
                    <p class="text-[11px] text-gray-300 leading-normal">
                        Su firma electrónica será generada bajo estándares PKI. VerisArt no almacena su clave privada por protocolo de seguridad Clase-4.
                    </p>
                </div>
            </div>

            <div class="w-full md:w-7/12 p-6 md:px-8 md:py-4 bg-white flex flex-col justify-center">
                <div class="mb-3">
                    <h1 class="text-xl font-heading font-bold text-gray-900">Crear Cuenta Forense</h1>
                    <p class="text-gray-500 text-[10px] mt-0.5">Complete todos los campos para la validación de su perfil profesional.</p>
                </div>

                <form @submit.prevent="handleRegister" class="space-y-3">
                    <div>
                        <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cédula / Identidad</label>
                        <input v-model="form.cedula" type="text" class="input-standard font-mono mt-1 w-full" placeholder="Ej. 172XXXXXXX" required>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nombres completos</label>
                            <input v-model="form.nombres" type="text" class="input-standard mt-1 w-full" placeholder="NOMBRES" required>
                        </div>
                        <div>
                            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Apellidos completos</label>
                            <input v-model="form.apellidos" type="text" class="input-standard mt-1 w-full" placeholder="APELLIDOS" required>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Correo electrónico</label>
                            <input v-model="form.correo" type="email" class="input-standard mt-1 w-full" placeholder="usuario@ejemplo.com" required>
                        </div>
                        <div>
                            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Seudónimo <span class="normal-case text-gray-500 font-normal">(Opcional)</span></label>
                            <input v-model="form.nombreArtistico" type="text" class="input-standard mt-1 w-full" placeholder="Ej. Alex Thorne">
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contraseña Login</label>
                            <div class="relative">
                                <input v-model="form.password" :type="showPassword ? 'text' : 'password'" class="input-standard mt-1 w-full pr-10" placeholder="••••••••" required>
                                <button @click="showPassword = !showPassword" type="button" class="absolute inset-y-0 right-0 top-1 flex items-center pr-3 text-gray-400 hover:text-black">
                                    <span class="material-symbols-outlined text-lg">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                                </button>
                            </div>
                        </div>
                        <div>
                            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Confirmar Contraseña</label>
                            <div class="relative">
                                <input v-model="form.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" class="input-standard mt-1 w-full pr-10" placeholder="••••••••" required>
                                <button @click="showConfirmPassword = !showConfirmPassword" type="button" class="absolute inset-y-0 right-0 top-1 flex items-center pr-3 text-gray-400 hover:text-black">
                                    <span class="material-symbols-outlined text-lg">{{ showConfirmPassword ? 'visibility_off' : 'visibility' }}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-3">
                        <div :class="['flex flex-row items-center justify-between px-4 py-2 transition-all relative overflow-hidden border-2 border-dashed rounded-lg', p12Class || 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400']">
                            <div class="flex items-center gap-2 overflow-hidden mr-2">
                                <span class="material-symbols-outlined text-xl text-gray-400 flex-shrink-0">vpn_key</span>
                                <div class="text-left overflow-hidden">
                                    <p v-if="!form.firmaP12" class="text-[10px] font-bold text-gray-800 whitespace-nowrap">Archivo PKI (.p12)</p>
                                    <p v-else class="text-[10px] text-gray-900 font-bold truncate max-w-[140px] md:max-w-[200px]" :title="form.firmaP12.name">{{ form.firmaP12.name }}</p>
                                </div>
                            </div>
                            <label class="btn-black !py-1.5 !px-3 !text-[9px] cursor-pointer m-0 flex items-center gap-1 flex-shrink-0 whitespace-nowrap">
                                <span class="material-symbols-outlined text-[12px]">upload_file</span> 
                                {{ form.firmaP12 ? 'Cambiar Archivo' : 'Subir Archivo' }}
                                <input type="file" class="hidden" accept=".p12" @change="handleFileUpload">
                            </label>
                        </div>
                        
                        <div>
                            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Clave del .P12</label>
                            <div class="relative">
                                <input v-model="form.p12Password" :type="showP12Password ? 'text' : 'password'" class="input-standard mt-1 w-full pr-10" placeholder="••••••••" required>
                                <button @click="showP12Password = !showP12Password" type="button" class="absolute inset-y-0 right-0 top-1 flex items-center pr-3 text-gray-400 hover:text-black">
                                    <span class="material-symbols-outlined text-lg">{{ showP12Password ? 'visibility_off' : 'visibility' }}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-start gap-3 py-1 mt-2">
                        <input v-model="form.aceptaTerminos" type="checkbox" id="terms-check" class="mt-0.5 h-4 w-4 rounded border-gray-300 text-black focus:ring-black" required>
                        <label class="text-[10px] text-gray-500 leading-relaxed">
                            Acepto <button type="button" @click="showModal = true" class="text-secondary font-bold underline">términos de uso</button> y tratamiento de datos.
                        </label>
                    </div>

                    <button type="submit" 
                            :disabled="!isFormValid || isLoading"
                            :class="['w-full py-3 text-[10px] uppercase tracking-[0.2em] font-bold mt-2 shadow-lg flex justify-center items-center gap-2 transition-all', 
                                    isFormValid ? 'btn-black shadow-black/10' : 'bg-gray-300 text-gray-500 cursor-not-allowed rounded-lg']">
                        <span v-if="isLoading" class="material-symbols-outlined animate-spin text-sm">autorenew</span>
                        <span>Crear Cuenta y Generar PKI</span>
                        <span v-if="!isLoading" class="material-symbols-outlined text-sm">shield</span>
                    </button>
                    
                    <p class="mt-3 text-center text-xs text-gray-500">
                        ¿Ya tienes una cuenta? <router-link to="/login" class="text-secondary font-bold hover:underline">Inicia Sesión</router-link>
                    </p>
                </form>
            </div>
        </div>
    </main>

    <!-- MODAL DE TÉRMINOS -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div class="bg-white p-8 rounded-2xl max-w-xl w-full m-4 shadow-2xl border border-gray-100 relative">
            <button type="button" @click="showModal = false" class="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors" title="Cerrar">
                <span class="material-symbols-outlined">close</span>
            </button>
            <h3 class="font-heading font-bold text-2xl mb-4">Protocolo Legal VerisArt</h3>
            <div class="h-64 overflow-y-auto text-sm text-gray-600 mb-8 pr-4 leading-relaxed font-body">
                <p class="mb-4"><b>1. Identidad Digital:</b> Al registrarse, usted garantiza que los datos proporcionados son verídicos y corresponden a su identidad legal o profesional.</p>
                <p class="mb-4"><b>2. Custodia de Firma (.p12):</b> Usted reconoce que VerisArt no almacena su contraseña de firma. En caso de pérdida, la recuperación del acceso a la firma es imposible por diseño de seguridad.</p>
                <p><b>3. Responsabilidad:</b> El uso indebido de las certificaciones emitidas bajo su firma será responsabilidad exclusiva del titular de la cuenta.</p>
            </div>
            <button @click="acceptTerms" class="btn-black w-full py-4 uppercase font-bold tracking-widest text-xs">Entiendo y Acepto los Protocolos</button>
        </div>
    </div>

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
import { ref, reactive, computed, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { showToast } from '../../services/toastService';

const router = useRouter();
const showModal = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const showP12Password = ref(false);
const isLoading = ref(false);
const uploadStatus = ref('idle'); // idle, error, success

const form = reactive({
    cedula: '',
    nombres: '',
    apellidos: '',
    correo: '',
    nombreArtistico: '',
    password: '',
    confirmPassword: '',
    p12Password: '',
    aceptaTerminos: false,
    firmaP12: null
});

const isFormValid = computed(() => {
    return form.cedula.trim() !== '' &&
           form.nombres.trim() !== '' &&
           form.apellidos.trim() !== '' &&
           form.correo.trim() !== '' &&
           form.password.trim() !== '' &&
           form.confirmPassword.trim() !== '' &&
           form.password === form.confirmPassword &&
           form.p12Password.trim() !== '' &&
           form.aceptaTerminos &&
           form.firmaP12 !== null;
});

const p12Class = computed(() => {
    if (uploadStatus.value === 'error') return '!bg-red-50 !border-red-500';
    if (uploadStatus.value === 'success') return '!bg-green-50 !border-green-500';
    if (form.firmaP12) return '!bg-yellow-50 !border-yellow-500';
    return '';
});

const handleFileUpload = (event) => {
    form.firmaP12 = event.target.files[0];
    uploadStatus.value = 'idle'; // Reset status on new file
};

const acceptTerms = () => {
    form.aceptaTerminos = true;
    showModal.value = false;
};

const handleRegister = async () => {
    if (!isFormValid.value) return;
    
    isLoading.value = true;
    try {
        const formData = new FormData();
        formData.append('cedula', form.cedula);
        formData.append('nombres', form.nombres);
        formData.append('apellidos', form.apellidos);
        formData.append('correo', form.correo);
        formData.append('nombreArtistico', form.nombreArtistico);
        formData.append('password', form.password);
        formData.append('aceptaTerminos', form.aceptaTerminos);
        formData.append('p12Password', form.p12Password);
        const fileInput = document.querySelector('input[type="file"]');
        formData.append('firmaP12', fileInput.files[0]);

        const response = await fetch('/api/v1/auth/registro', {
            method: 'POST',
            body: formData
        });

        if (response.ok || response.status === 201) {
            uploadStatus.value = 'success';
            showToast('Cuenta creada con éxito. Por favor inicie sesión.', 'success');
            setTimeout(() => {
                router.push('/login');
            }, 1500);
        } else {
            uploadStatus.value = 'error';
            let errorMsg = 'Error al registrar la cuenta';
            try {
                const errorData = await response.json();
                errorMsg = errorData.error || errorData.details || errorMsg;
            } catch (e) {
                const errorText = await response.text();
                if(errorText) errorMsg = errorText;
            }
            throw new Error(errorMsg);
        }
    } catch (error) {
        uploadStatus.value = 'error';
        console.error("Register error:", error);
        showToast(error.message, 'error');
    } finally {
        isLoading.value = false;
    }
};
</script>
