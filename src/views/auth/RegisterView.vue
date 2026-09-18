<template>
  <div class="flex flex-col bg-[#f7f9fb] min-h-screen w-full flex-grow">
    <NavbarPublic />

    <main class="flex-grow flex items-center justify-center p-3 sm:p-5 md:p-8 w-full">
        <div class="max-w-[1060px] w-full flex flex-col md:flex-row card-main m-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            
            <!-- Columna Izquierda con Imagen Conceptual -->
            <div class="w-full md:w-5/12 relative p-5 sm:p-6 md:p-8 text-white flex flex-col justify-end bg-black h-28 sm:h-36 md:h-auto md:min-h-[480px] overflow-hidden">
                <img src="/modulo-a-registro.png"
                     alt="Registro de Identidad Digital PKI"
                     class="absolute inset-0 w-full h-full object-cover object-center opacity-90 filter brightness-[1.05]">
                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-0"></div>

                <div class="relative z-10">
                    <h2 class="text-xl sm:text-2xl md:text-3xl font-heading font-bold leading-tight">Certificación Forense Digital</h2>
                    <p class="text-gray-200 mt-2 text-xs sm:text-sm leading-relaxed max-w-xs hidden sm:block">
                        Registro de agentes y custodia de firma electrónica para la certificación y trazabilidad de obras de arte.
                    </p>
                </div>
            </div>

            <!-- Columna Derecha con Formulario Proporcionado -->
            <div class="w-full md:w-7/12 p-5 md:px-9 md:py-6 bg-white flex flex-col justify-center">
                <div class="mb-3">
                    <h1 class="text-xl md:text-2xl font-heading font-bold text-gray-900">Crear Cuenta Forense</h1>
                    <p class="text-gray-500 text-xs mt-0.5">Complete todos los campos para la validación de su perfil profesional.</p>
                </div>

                <form @submit.prevent="handleRegister" class="space-y-2">
                    <div>
                        <div class="flex justify-between items-center">
                            <label class="text-[10px] sm:text-[10.5px] font-bold text-gray-500 uppercase tracking-wider">Cédula / Identidad</label>
                            <span class="text-[9.5px] text-gray-400">10 dígitos</span>
                        </div>
                        <input v-model="form.cedula" type="text" class="input-standard font-mono mt-0.5 w-full !text-xs sm:!text-sm !py-1.5" placeholder="Ej. 1712345678" required>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        <div>
                            <label class="text-[10px] sm:text-[10.5px] font-bold text-gray-500 uppercase tracking-wider">Nombres completos</label>
                            <input v-model="form.nombres" type="text" class="input-standard mt-0.5 w-full !text-xs sm:!text-sm !py-1.5" placeholder="Ej. MARÍA JOSÉ" required>
                            <p v-if="form.nombres && !nombresValido" class="text-[9px] text-red-500 mt-0.5 text-left">Solo letras y espacios.</p>
                        </div>
                        <div>
                            <label class="text-[10px] sm:text-[10.5px] font-bold text-gray-500 uppercase tracking-wider">Apellidos completos</label>
                            <input v-model="form.apellidos" type="text" class="input-standard mt-0.5 w-full !text-xs sm:!text-sm !py-1.5" placeholder="Ej. PÉREZ GARCÍA" required>
                            <p v-if="form.apellidos && !apellidosValido" class="text-[9px] text-red-500 mt-0.5 text-left">Solo letras y espacios.</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        <div>
                            <label class="text-[10px] sm:text-[10.5px] font-bold text-gray-500 uppercase tracking-wider">Correo electrónico</label>
                            <input v-model="form.correo" type="email" class="input-standard mt-0.5 w-full !text-xs sm:!text-sm !py-1.5" placeholder="usuario@ejemplo.com" required>
                            <p v-if="form.correo && !correoValido" class="text-[9px] text-red-500 mt-0.5 text-left">Ingresa un correo válido.</p>
                        </div>
                        <div>
                            <label class="text-[10px] sm:text-[10.5px] font-bold text-gray-500 uppercase tracking-wider">Seudónimo <span class="normal-case text-gray-400 font-normal">(Opcional)</span></label>
                            <input v-model="form.nombreArtistico" type="text" class="input-standard mt-0.5 w-full !text-xs sm:!text-sm !py-1.5" placeholder="Ej. Alex Thorne">
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        <div>
                            <label class="text-[10px] sm:text-[10.5px] font-bold text-gray-500 uppercase tracking-wider">Contraseña Login</label>
                            <div class="relative">
                                <input v-model="form.password" :type="showPassword ? 'text' : 'password'" class="input-standard mt-0.5 w-full !text-xs sm:!text-sm !py-1.5 pr-9" placeholder="••••••••" required>
                                <button @click="showPassword = !showPassword" type="button" tabindex="-1" class="absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-400 hover:text-black transition-colors focus:outline-none">
                                    <span class="material-symbols-outlined text-[18px] select-none">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                                </button>
                            </div>
                            <p v-if="form.password && !passwordValida" class="text-[9px] text-red-500 mt-0.5 text-left">Mín. 8 caracteres, mayús, minús, número y símbolo.</p>
                        </div>
                        <div>
                            <label class="text-[10px] sm:text-[10.5px] font-bold text-gray-500 uppercase tracking-wider">Confirmar Contraseña</label>
                            <div class="relative">
                                <input v-model="form.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" class="input-standard mt-0.5 w-full !text-xs sm:!text-sm !py-1.5 pr-9" placeholder="••••••••" required>
                                <button @click="showConfirmPassword = !showConfirmPassword" type="button" tabindex="-1" class="absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-400 hover:text-black transition-colors focus:outline-none">
                                    <span class="material-symbols-outlined text-[18px] select-none">{{ showConfirmPassword ? 'visibility_off' : 'visibility' }}</span>
                                </button>
                            </div>
                            <p v-if="form.confirmPassword && form.password !== form.confirmPassword" class="text-[9px] text-red-500 mt-0.5 text-left">Las contraseñas no coinciden.</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-0.5">
                        <div :class="['flex flex-row items-center justify-between px-3.5 py-1.5 transition-all relative overflow-hidden border-2 border-dashed rounded-lg', p12Class || 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400']">
                            <div class="flex items-center gap-2 overflow-hidden mr-1">
                                <span class="material-symbols-outlined text-base text-gray-400 flex-shrink-0">vpn_key</span>
                                <div class="text-left overflow-hidden">
                                    <p v-if="!form.firmaP12" class="text-[10px] sm:text-[10.5px] font-bold text-gray-800 whitespace-nowrap">Archivo PKI (.p12)</p>
                                    <p v-else class="text-[10px] sm:text-[10.5px] text-gray-900 font-bold truncate max-w-[110px]" :title="form.firmaP12.name">{{ form.firmaP12.name }}</p>
                                </div>
                            </div>
                            <label class="btn-black !py-1 !px-2.5 !text-[9px] sm:!text-[10px] cursor-pointer m-0 flex items-center gap-1 flex-shrink-0 whitespace-nowrap">
                                <span class="material-symbols-outlined text-[12px]">upload_file</span> 
                                {{ form.firmaP12 ? 'Cambiar' : 'Subir' }}
                                <input type="file" class="hidden" accept=".p12" @change="handleFileUpload">
                            </label>
                        </div>
                        
                        <div>
                            <label class="text-[10px] sm:text-[10.5px] font-bold text-gray-500 uppercase tracking-wider">Clave del .P12</label>
                            <div class="relative">
                                <input v-model="form.p12Password" :type="showP12Password ? 'text' : 'password'" class="input-standard mt-0.5 w-full !text-xs sm:!text-sm !py-1.5 pr-9" placeholder="••••••••" required>
                                <button @click="showP12Password = !showP12Password" type="button" tabindex="-1" class="absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-400 hover:text-black transition-colors focus:outline-none">
                                    <span class="material-symbols-outlined text-[18px] select-none">{{ showP12Password ? 'visibility_off' : 'visibility' }}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 py-0.5">
                        <input v-model="form.aceptaTerminos" type="checkbox" id="terms-check" class="h-3.5 w-3.5 rounded border-gray-300 text-black focus:ring-black" required>
                        <label class="text-[10.5px] sm:text-xs text-gray-500">
                            Acepto <button type="button" @click="showModal = true" class="text-secondary font-bold underline">términos de uso</button> y tratamiento de datos.
                        </label>
                    </div>

                    <button type="submit" 
                            :disabled="!isFormValid || isLoading"
                            :class="['w-full py-2.5 sm:py-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold mt-1 shadow-md flex justify-center items-center gap-2 transition-all', 
                                    isFormValid ? 'btn-black shadow-black/10 hover:scale-[1.01]' : 'bg-gray-300 text-gray-500 cursor-not-allowed rounded-lg']">
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
    <div v-if="showModal" @click.self="showModal = false" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div class="bg-white p-6 rounded-2xl max-w-xl w-full m-4 shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto">
            <button type="button" @click="showModal = false" class="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors" title="Cerrar (Esc)">
                <span class="material-symbols-outlined">close</span>
            </button>
            <h3 class="font-heading font-bold text-xl mb-3">Protocolo Legal Veriart</h3>
            <div class="h-56 overflow-y-auto text-xs text-gray-600 mb-6 pr-3 leading-relaxed font-body">
                <p class="mb-3"><b>1. Identidad Digital:</b> Al registrarse, usted garantiza que los datos proporcionados son verídicos y corresponden a su identidad legal o profesional.</p>
                <p class="mb-3"><b>2. Custodia de Firma (.p12):</b> Usted reconoce que Veriart no almacena su contraseña de firma. En caso de pérdida, la recuperación del acceso a la firma es imposible por diseño de seguridad.</p>
                <p><b>3. Responsabilidad:</b> El uso indebido de las certificaciones emitidas bajo su firma será responsabilidad exclusiva del titular de la cuenta.</p>
            </div>
            <button @click="acceptTerms" class="btn-black w-full py-3 uppercase font-bold tracking-widest text-xs">Entiendo y Acepto los Protocolos</button>
        </div>
    </div>

    <!-- PANTALLA DE CARGA DURANTE REGISTRO -->
    <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
        <div class="bg-white p-6 sm:p-8 rounded-2xl max-w-sm w-full shadow-2xl text-center flex flex-col items-center border border-gray-100">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span class="material-symbols-outlined text-4xl text-primary animate-spin">autorenew</span>
            </div>
            <h3 class="text-base font-heading font-bold text-gray-900 uppercase tracking-wider mb-1.5">Creando Cuenta Forense</h3>
            <p class="text-xs text-gray-600 leading-relaxed">
                Validando certificado digital PKI (.p12), protegiendo claves y registrando credenciales en el sistema...
            </p>
        </div>
    </div>

    <!-- Footer Reutilizable Compacto -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { showToast } from '../../services/toastService';
import Footer from '../../components/Footer.vue';
import NavbarPublic from '../../components/NavbarPublic.vue';

const API_URL_AUTH = process.env.VUE_APP_API_AUTH || '/api/v1/auth';

const router = useRouter();
const showModal = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const showP12Password = ref(false);
const isLoading = ref(false);
const uploadStatus = ref('idle');

const handleKeyDown = (e) => {
    if ((e.key === 'Escape' || e.key === 'Esc') && showModal.value) {
        showModal.value = false;
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
});

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

        const response = await fetch(`${API_URL_AUTH}/registro`, {
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
