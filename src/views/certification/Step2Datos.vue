<template>
  <div class="card-main p-3 md:p-4 bg-white max-w-2xl mx-auto animate-fade-in relative shadow-md rounded-xl border border-gray-100">
    <div class="text-center mb-2">
      <h2 class="text-lg font-heading font-bold text-gray-900">Datos de la Obra</h2>
      <p class="text-gray-500 text-[11px] mt-0.5">Complete los metadatos técnicos de la obra para el certificado forense.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5 text-left relative">
      <!-- Título de la Obra primero -->
      <div class="md:col-span-2 relative">
        <label class="text-[9.5px] font-bold text-gray-500 uppercase tracking-widest">Título de la Obra *</label>
        <input v-model="context.datosObra.titulo_obra" type="text" :class="['input-standard mt-0.5 w-full !text-[11px] !py-1 !px-2.5', errors.titulo_obra ? '!border-red-500 !bg-red-50' : '']" placeholder="Ej. Girasoles del Amanecer">
        <ValidationError v-if="errors.titulo_obra" :error="errors.titulo_obra" />
      </div>

      <!-- Cédula del Artista -->
      <div class="relative">
        <label class="text-[9.5px] font-bold text-gray-500 uppercase tracking-widest">Cédula del Artista *</label>
        <input v-model="context.datosObra.cedula" type="text" :class="['input-standard mt-0.5 w-full font-mono !text-[11px] !py-1 !px-2.5', errors.cedula ? '!border-red-500 !bg-red-50' : '']" placeholder="Ej. 9900000003">
        <ValidationError v-if="errors.cedula" :error="errors.cedula" />
      </div>

      <!-- Categoría de la Obra -->
      <div class="relative">
        <label class="text-[9.5px] font-bold text-gray-500 uppercase tracking-widest">Categoría de la obra *</label>
        <select v-model="context.datosObra.categoria" :class="['input-standard mt-0.5 w-full bg-white !text-[11px] !py-1 !px-2.5', errors.categoria ? '!border-red-500 !bg-red-50' : '']">
          <option value="" disabled>Seleccione una categoría</option>
          <option value="ilustracion">Ilustración Digital</option>
          <option value="fotografia">Fotografía Digital</option>
          <option value="pintura_digital">Pintura Digital</option>
          <option value="otro">Otro / Arte Generativo</option>
        </select>
        <ValidationError v-if="errors.categoria" :error="errors.categoria" />
      </div>

      <!-- Software utilizado -->
      <div class="relative">
        <label class="text-[9.5px] font-bold text-gray-500 uppercase tracking-widest">Software utilizado *</label>
        <input v-model="context.datosObra.software" type="text" :class="['input-standard mt-0.5 w-full !text-[11px] !py-1 !px-2.5', errors.software ? '!border-red-500 !bg-red-50' : '']" placeholder="Ej. Photoshop 2024, Krita, Procreate">
        <ValidationError v-if="errors.software" :error="errors.software" />
      </div>

      <!-- Hardware utilizado -->
      <div class="relative">
        <label class="text-[9.5px] font-bold text-gray-500 uppercase tracking-widest">Hardware utilizado</label>
        <input v-model="context.datosObra.hardware" type="text" class="input-standard mt-0.5 w-full !text-[11px] !py-1 !px-2.5" placeholder="Ej. Wacom Cintiq Pro, iPad Pro">
      </div>

      <!-- Fecha de Creación -->
      <div class="relative">
        <label class="text-[9.5px] font-bold text-gray-500 uppercase tracking-widest">Fecha de Creación *</label>
        <input v-model="context.datosObra.fecha_creacion" type="date" :max="todayDate" style="accent-color: #10b981;" :class="['input-standard mt-0.5 w-full bg-white text-gray-700 !text-[11px] !py-1 !px-2.5 focus:ring-green-500 focus:border-green-500', errors.fecha_creacion ? '!border-red-500 !bg-red-50' : '']">
        <ValidationError v-if="errors.fecha_creacion" :error="errors.fecha_creacion" />
      </div>

      <!-- Descripción Opcional -->
      <div class="relative">
        <label class="text-[9.5px] font-bold text-gray-500 uppercase tracking-widest">Descripción <span class="normal-case text-gray-400 font-normal">(Opcional)</span></label>
        <textarea v-model="context.datosObra.descripcion" class="input-standard mt-0.5 w-full h-[32px] resize-none !text-[11px] !py-1 !px-2.5" placeholder="Detalles adicionales de la obra..."></textarea>
      </div>

      <!-- Declaraciones Legales -->
      <div :class="['md:col-span-2 mt-0.5 p-2 rounded-lg border relative transition-colors', errors.declaraciones ? 'bg-red-50 border-red-400' : 'bg-gray-50 border-gray-200']">
        <h3 class="text-[9.5px] font-bold text-gray-900 uppercase tracking-widest mb-1 flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[14px] text-black">gavel</span>
          Declaraciones Legales y Custodia (EULA)
        </h3>
        <ValidationError v-if="errors.declaraciones" :error="errors.declaraciones" />
        <div class="space-y-1">
          <div class="flex items-start gap-2">
            <input v-model="context.datosObra.declaracion_derechos" type="checkbox" class="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-black focus:ring-black">
            <label class="text-[10.5px] text-gray-700 leading-tight">Confirmo que soy el titular de los derechos intelectuales de esta obra.</label>
          </div>

          <div class="flex items-start gap-2">
            <input v-model="context.datosObra.declaracion_terminos" type="checkbox" class="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-black focus:ring-black">
            <label class="text-[10.5px] text-gray-700 leading-tight">Acepto los términos y condiciones específicos para la emisión de este certificado forense.</label>
          </div>
        </div>
      </div>
    </div>

    <!-- Botones de Acción -->
    <div class="flex justify-between border-t border-gray-100 pt-2 mt-2">
      <button @click="$emit('prev')" class="btn-ghost !px-4 !py-1 uppercase tracking-[0.2em] text-[9.5px]" :disabled="isLoading">
        <span class="material-symbols-outlined text-xs align-middle">arrow_back</span> Atrás
      </button>
      <button @click="validateAndNext" class="btn-black !px-5 !py-1 uppercase tracking-[0.2em] text-[9.5px] min-w-[140px] relative" :disabled="!isFormValid || isLoading">
        <span v-if="isLoading" class="material-symbols-outlined animate-spin absolute">autorenew</span>
        <span :class="{'opacity-0': isLoading}">Siguiente Paso <span class="material-symbols-outlined text-xs align-middle">arrow_forward</span></span>
      </button>
    </div>

    <!-- Loading Overlay -->
    <div v-if="isLoading" class="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-xl">
      <span class="material-symbols-outlined text-4xl text-primary animate-spin mb-2">autorenew</span>
      <p class="text-xs font-bold text-gray-700 uppercase tracking-widest text-center px-4">Guardando Metadatos...<br/><span class="text-[9px] text-gray-500 font-normal normal-case">Registrando información de la obra</span></p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, computed, onMounted } from 'vue';
import ValidationError from '../../components/ValidationError.vue';
import { showToast } from '../../services/toastService';
import { CertificationClient } from '../../clients/CertificationClient';

const props = defineProps({ context: Object });
const emit = defineEmits(['next', 'prev']);
const errors = reactive({ cedula: '', categoria: '', titulo_obra: '', software: '', fecha_creacion: '', declaraciones: '' });
const generalError = ref('');
const isLoading = ref(false);

const todayDate = new Date().toISOString().split('T')[0];

onMounted(() => {
  if (!props.context.datosObra.cedula) {
    const savedCedula = localStorage.getItem('userCedula');
    if (savedCedula) {
      props.context.datosObra.cedula = savedCedula;
    }
  }
});

const isFormValid = computed(() => {
  const d = props.context.datosObra;
  return d.cedula && d.categoria && d.titulo_obra && d.software && d.fecha_creacion && d.declaracion_derechos && d.declaracion_terminos;
});

const validateAndNext = async () => {
  Object.keys(errors).forEach(k => errors[k] = '');
  generalError.value = '';
  let hasError = false;

  const data = props.context.datosObra;
  
  if (!data.cedula) { errors.cedula = 'Requerido'; hasError = true; }
  if (!data.categoria) { errors.categoria = 'Requerido'; hasError = true; }
  if (!data.titulo_obra) { errors.titulo_obra = 'Requerido'; hasError = true; }
  if (!data.software) { errors.software = 'Requerido'; hasError = true; }
  if (!data.fecha_creacion) { errors.fecha_creacion = 'Requerido'; hasError = true; }
  
  if (!data.declaracion_derechos || !data.declaracion_terminos) {
    errors.declaraciones = 'Debe aceptar todas las declaraciones legales.';
    hasError = true;
  }

  if (hasError) return;

  isLoading.value = true;
  try {
    console.log("Enviando metadatos de la obra...");
    const { declaracion_tecnica, ...datosAEnviar } = data;
    const res = await CertificationClient.enviarDatosObra(props.context.expedienteId, datosAEnviar);
    console.log("✅ METADATOS GUARDADOS CON ÉXITO. Respuesta del servidor:", res);
    
    setTimeout(() => { emit('next'); }, 600);
  } catch (err) {
    console.error("❌ ERROR AL GUARDAR METADATOS:", err);
    generalError.value = err instanceof TypeError
      ? 'No se pudo conectar con el servidor. Verifica tu conexión e intenta nuevamente.'
      : (err.message || 'Error desconocido al procesar la solicitud.');
    showToast(generalError.value, 'error');
    
    if (generalError.value.toLowerCase().includes('cédula') || generalError.value.toLowerCase().includes('cedula')) {
      errors.cedula = 'Cédula no válida o no registrada.';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
