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
            <router-link to="/login" class="text-sm font-semibold text-gray-800 hover:text-black">Iniciar Sesión</router-link>
            <router-link to="/register" class="btn-black !py-2 !px-4 !text-xs uppercase tracking-widest hover:scale-105 transition-transform">Registrarse</router-link>
        </div>
    </nav>

    <main class="flex-grow flex items-center justify-center p-3 md:p-6">
        <div class="max-w-5xl w-full flex flex-col md:flex-row card-main m-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            
            <!-- Columna Izquierda con Imagen Conceptual -->
            <div class="w-full md:w-5/12 relative p-6 md:p-8 text-white flex flex-col justify-between bg-black min-h-[380px] overflow-hidden">
                <img src="/register_art_pki.png"
                     alt="Registro de Identidad Digital PKI"
                     class="absolute inset-0 w-full h-full object-cover object-center opacity-90 filter brightness-[1.05]">
                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-0"></div>

                <div class="relative z-10">
                    <span class="font-mono text-[9px] text-[#6cf8bb] tracking-[0.25em] uppercase font-bold">PROTOCOLO DE REGISTRO</span>
                    <h2 class="text-2xl font-heading font-bold mt-1 leading-tight">Acceso Forense Autorizado.</h2>
                    <p class="text-gray-200 mt-1.5 text-xs leading-relaxed max-w-xs">
                        Establezca su identidad única dentro del ecosistema de certificación de arte más seguro.
                    </p>
                </div>
                
                <div class="relative z-10 bg-black/60 backdrop-blur-md border border-white/15 p-3 rounded-xl mt-4">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="material-symbols-outlined text-[#6cf8bb] text-sm">verified_user</span>
                        <span class="text-[10px] font-bold uppercase tracking-widest text-white">Seguridad de Nivel Profesional</span>
                    </div>
                    <p class="text-[10.5px] text-gray-300 leading-normal">
                        Su firma electrónica será vinculada bajo estándares PKI. VerisArt garantiza privacidad y custodia segura.
                    </p>
                </div>
            </div>

            <!-- Columna Derecha con Formulario Compacto -->
            <div class="w-full md:w-7/12 p-6 md:px-8 md:py-5 bg-white flex flex-col justify-center">
                <div class="mb-3">
                    <h1 class="text-xl font-heading font-bold text-gray-900">Crear Cuenta Forense</h1>
                    <p class="text-gray-500 text-[10px] mt-0.5">Complete todos los campos para la validación de su perfil profesional.</p>
                </div>

                <form @submit.prevent="handleRegister" class="space-y-2.5">
                    <div>
                        <label class="text-[9.5px] font-bold text-gray-400 uppercase tracking-widest">Cédula / Identidad</label>
                        <input v-model="form.cedula" type="text" class="input-standard font-mono mt-0.5 w-full !text-xs !py-1.5" placeholder="Ingrese su número de cédula" required>
                        <p class="text-[9px] text-gray-400 mt-0.5 text-left">Ej. 1712345678 (10 dígitos, sin guiones ni espacios)</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label class="text-[9.5px] font-bold text-gray-400 uppercase tracking-widest">Nombres completos</label>
                            <input v-model="form.nombres" type="text" class="input-standard mt-0.5 w-full !text-xs !py-1.5" placeholder="NOMBRES" required>
                            <p v-if="!form.nombres" class="text-[9px] text-gray-400 mt-0.5 text-left">Ej. MARIA JOSE (solo letras)</p>
                            <p v-else-if="!nombresValido" class="text-[9px] text-red-500 mt-0.5 text-left">Solo letras y espacios, sin números ni símbolos.</p>
                        </div>
                        <div>
                            <label class="text-[9.5px] font-bold text-gray-400 uppercase tracking-widest">Apellidos completos</label>
                            <input v-model="form.apellidos" type="text" class="input-standard mt-0.5 w-full !text-xs !py-1.5" placeholder="APELLIDOS" required>
                            <p v-if="!form.apellidos" class="text-[9px] text-gray-400 mt-0.5 text-left">Ej. PEREZ GARCIA (solo letras)</p>
                            <p v-else-if="!apellidosValido" class="text-[9px] text-red-500 mt-0.5 text-left">Solo letras y espacios, sin números ni símbolos.</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label class="text-[9.5px] font-bold text-gray-400 uppercase tracking-widest">Correo electrónico</label>
                            <input v-model="form.correo" type="email" class="input-standard mt-0.5 w-full !text-xs !py-1.5" placeholder="usuario@ejemplo.com" required>
                            <p v-if="!form.correo" class="text-[9px] text-gray-400 mt-0.5 text-left">Ej. usuario@ejemplo.com</p>
                            <p v-else-if="!correoValido" class="text-[9px] text-red-500 mt-0.5 text-left">Ingresa un correo electrónico válido.</p>
                        </div>
                        <div>
                            <label class="text-[9.5px] font-bold text-gray-400 uppercase tracking-widest">Seudónimo <span class="normal-case text-gray-400 font-normal">(Opcional)</span></label>
                            <input v-model="form.nombreArtistico" type="text" class="input-standard mt-0.5 w-full !text-xs !py-1.5" placeholder="Nombre artístico">
                            <p class="text-[9px] text-gray-400 mt-0.5 text-left">Ej. Alex Thorne</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label class="text-[9.5px] font-bold text-gray-400 uppercase tracking-widest">Contraseña Login</label>
                            <div class="relative">
                                <input v-model="form.password" :type="showPassword ? 'text' : 'password'" class="input-standard mt-0.5 w-full !text-xs !py-1.5 pr-8" placeholder="••••••••" required>
                                <button @click="showPassword = !showPassword" type="button" class="absolute inset-y-0 right-0 top-0.5 flex items-center pr-2.5 text-gray-400 hover:text-black">
                                    <span class="material-symbols-outlined text-base">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                                </button>
                            </div>
                            <p class="text-[9px] mt-0.5 text-left" :class="form.password && !passwordValida ? 'text-red-500' : 'text-gray-400'">Mín. 8 caracteres, mayúscula, minúscula, número y símbolo.</p>
                        </div>
                        <div>
                            <label class="text-[9.5px] font-bold text-gray-400 uppercase tracking-widest">Confirmar Contraseña</label>
                            <div class="relative">
                                <input v-model="form.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" class="input-standard mt-0.5 w-full !text-xs !py-1.5 pr-8" placeholder="••••••••" required>
                                <button @click="showConfirmPassword = !showConfirmPassword" type="button" class="absolute inset-y-0 right-0 top-0.5 flex items-center pr-2.5 text-gray-400 hover:text-black">
                                    <span class="material-symbols-outlined text-base">{{ showConfirmPassword ? 'visibility_off' : 'visibility' }}</span>
                                </button>
                            </div>
                            <p v-if="form.confirmPassword && form.password !== form.confirmPassword" class="text-[9px] text-red-500 mt-0.5 text-left">Las contraseñas no coinciden.</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-0.5">
                        <div :class="['flex flex-row items-center justify-between px-3 py-1.5 transition-all relative overflow-hidden border-2 border-dashed rounded-lg', p12Class || 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400']">
                            <div class="flex items-center gap-1.5 overflow-hidden mr-1">
                                <span class="material-symbols-outlined text-lg text-gray-400 flex-shrink-0">vpn_key</span>
                                <div class="text-left overflow-hidden">
                                    <p v-if="!form.firmaP12" class="text-[9.5px] font-bold text-gray-800 whitespace-nowrap">Archivo PKI (.p12)</p>
                                    <p v-else class="text-[9.5px] text-gray-900 font-bold truncate max-w-[100px]" :title="form.firmaP12.name">{{ form.firmaP12.name }}</p>
                                </div>
                            </div>
                            <label class="btn-black !py-1 !px-2.5 !text-[8.5px] cursor-pointer m-0 flex items-center gap-1 flex-shrink-0 whitespace-nowrap">
                                <span class="material-symbols-outlined text-[11px]">upload_file</span> 
                                {{ form.firmaP12 ? 'Cambiar' : 'Subir' }}
                                <input type="file" class="hidden" accept=".p12" @change="handleFileUpload">
                            </label>
                        </div>
                        
                        <div>
                            <label class="text-[9.5px] font-bold text-gray-400 uppercase tracking-widest">Clave del .P12</label>
                            <div class="relative">
                                <input v-model="form.p12Password" :type="showP12Password ? 'text' : 'password'" class="input-standard mt-0.5 w-full !text-xs !py-1.5 pr-8" placeholder="••••••••" required>
                                <button @click="showP12Password = !showP12Password" type="button" class="absolute inset-y-0 right-0 top-0.5 flex items-center pr-2.5 text-gray-400 hover:text-black">
                                    <span class="material-symbols-outlined text-base">{{ showP12Password ? 'visibility_off' : 'visibility' }}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 py-0.5">
                        <input v-model="form.aceptaTerminos" type="checkbox" id="terms-check" class="h-3.5 w-3.5 rounded border-gray-300 text-black focus:ring-black" required>
                        <label class="text-[10px] text-gray-500">
                            Acepto <button type="button" @click="showModal = true" class="text-secondary font-bold underline">términos de uso</button> y tratamiento de datos.
                        </label>
                    </div>

                    <button type="submit" 
                            :disabled="!isFormValid || isLoading"
                            :class="['w-full py-2.5 text-[9.5px] uppercase tracking-[0.2em] font-bold mt-1 shadow-md flex justify-center items-center gap-2 transition-all', 
                                    isFormValid ? 'btn-black shadow-black/10' : 'bg-gray-300 text-gray-500 cursor-not-allowed rounded-lg']">
                        <span v-if="isLoading" class="material-symbols-outlined animate-spin text-sm">autorenew</span>
                        <span>Crear Cuenta</span>
                        <span v-if="!isLoading" class="material-symbols-outlined text-xs">shield</span>
                    </button>
                    
                    <p class="mt-2 text-center text-xs text-gray-500">
                        ¿Ya tienes una cuenta? <router-link to="/login" class="text-secondary font-bold hover:underline">Inicia Sesión</router-link>
                    </p>
                </form>
            </div>
        </div>
    </main>

    <!-- MODAL DE TÉRMINOS -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div class="bg-white p-6 rounded-2xl max-w-xl w-full m-4 shadow-2xl border border-gray-100 relative">
            <button type="button" @click="showModal = false" class="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors" title="Cerrar">
                <span class="material-symbols-outlined">close</span>
            </button>
            <h3 class="font-heading font-bold text-xl mb-3">Protocolo Legal VerisArt</h3>
            <div class="h-56 overflow-y-auto text-xs text-gray-600 mb-6 pr-3 leading-relaxed font-body">
                <p class="mb-3"><b>1. Identidad Digital:</b> Al registrarse, usted garantiza que los datos proporcionados son verídicos y corresponden a su identidad legal o profesional.</p>
                <p class="mb-3"><b>2. Custodia de Firma (.p12):</b> Usted reconoce que VerisArt no almacena su contraseña de firma. En caso de pérdida, la recuperación del acceso a la firma es imposible por diseño de seguridad.</p>
                <p><b>3. Responsabilidad:</b> El uso indebido de las certificaciones emitidas bajo su firma será responsabilidad exclusiva del titular de la cuenta.</p>
            </div>
            <button @click="acceptTerms" class="btn-black w-full py-3 uppercase font-bold tracking-widest text-xs">Entiendo y Acepto los Protocolos</button>
        </div>
    </div>

    <!-- Footer Reutilizable Compacto -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { showToast } from '../../services/toastService';
import Footer from '../../components/Footer.vue';

const router = useRouter();
const showModal = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const showP12Password = ref(false);
const isLoading = ref(false);
const uploadStatus = ref('idle');

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

// Regex de contraseña segura: mín. 8 caracteres, al menos una mayúscula, una
// minúscula, un número y un símbolo — exigido para la defensa como evidencia
// de una política de contraseñas real en el prototipo funcional.
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NOMBRE_REGEX = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;

const correoValido = computed(() => EMAIL_REGEX.test(form.correo));
const passwordValida = computed(() => PASSWORD_REGEX.test(form.password));
const nombresValido = computed(() => NOMBRE_REGEX.test(form.nombres));
const apellidosValido = computed(() => NOMBRE_REGEX.test(form.apellidos));

const isFormValid = computed(() => {
    return form.cedula.trim() !== '' &&
           form.nombres.trim() !== '' &&
           nombresValido.value &&
           form.apellidos.trim() !== '' &&
           apellidosValido.value &&
           form.correo.trim() !== '' &&
           correoValido.value &&
           form.password.trim() !== '' &&
           passwordValida.value &&
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
    uploadStatus.value = 'idle';
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
            localStorage.setItem('userEmail', form.correo);
            localStorage.setItem('userCedula', form.cedula);
            showToast('Cuenta creada con éxito. Por favor inicie sesión.', 'success');
            setTimeout(() => {
                router.push('/login');
            }, 1500);
        } else {
            uploadStatus.value = 'error';
            let errorMsg = 'Error al registrar la cuenta';
            const errorText = await response.text();
            try {
                const errorData = JSON.parse(errorText);
                errorMsg = errorData.error || errorData.details || errorMsg;
            } catch (e) {
                if (errorText) errorMsg = errorText;
            }
            throw new Error(errorMsg);
        }
    } catch (error) {
        uploadStatus.value = 'error';
        console.error("Register error:", error);
        const mensaje = error instanceof TypeError
            ? 'No se pudo conectar con el servidor. Verifica tu conexión e intenta nuevamente.'
            : (error.message || 'Ocurrió un error inesperado. Intente nuevamente.');
        showToast(mensaje, 'error');
    } finally {
        isLoading.value = false;
    }
};
</script>
