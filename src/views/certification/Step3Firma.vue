<template>
  <div class="card-main p-4 md:p-6 bg-white max-w-2xl mx-auto animate-fade-in relative">
    <div class="text-center mb-3">
      <h2 class="text-2xl font-heading font-bold">Firma del Autor</h2>
      <p class="text-gray-500 text-xs mt-1">Cargue su certificado PKI para autorizar este sello forense.</p>
    </div>

    <div class="space-y-4 relative">
      <div 
        :class="['drop-zone min-h-[120px] flex flex-col items-center justify-center p-3 text-center transition-colors', getDropZoneClass(context.firma.p12)]"
        @dragover.prevent
        @drop.prevent="onDrop"
      >
        <span class="material-symbols-outlined text-2xl text-secondary mb-1">key</span>
        <h3 class="font-bold text-sm mb-1">Archivo de Certificado</h3>
        <p class="text-[10px] text-gray-500 mb-2 uppercase">Extensión .P12</p>
        <label class="btn-black !py-1 !px-6 !text-[10px] cursor-pointer inline-block">
          <span class="material-symbols-outlined text-sm align-middle">upload_file</span> 
          {{ context.firma.p12 ? context.firma.p12.name : 'Seleccionar P12' }}
          <input type="file" class="hidden" accept=".p12" @change="onFileChange">
        </label>
        <ValidationError v-if="errors.p12" :error="errors.p12" />
      </div>

      <div class="bg-surface p-3 rounded-xl border border-outline-variant/30 relative">
        <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Contraseña de Firma</label>
        <input v-model="context.firma.password" type="password" class="input-standard w-full !py-2 !px-3 !text-sm" placeholder="Ingrese su contraseña PKI">
        <ValidationError v-if="errors.password" :error="errors.password" />
        <p class="text-[9px] text-gray-400 mt-2 italic flex items-center gap-1">
          <span class="material-symbols-outlined text-[10px]">info</span>
          Esta es la clave que definió en su registro, no se almacena en el servidor.
        </p>
      </div>

      <div class="flex justify-between border-t border-gray-100 pt-4 mt-4">
        <button @click="$emit('prev')" class="btn-ghost !px-6 !py-2 uppercase tracking-[0.2em] text-[10px]" :disabled="isLoading">
          <span class="material-symbols-outlined text-sm align-middle">arrow_back</span> Atrás
        </button>
        <button @click="validateAndSign" class="btn-black !px-8 !py-2 uppercase tracking-[0.2em] text-[10px] relative flex items-center justify-center min-w-[160px]" :disabled="isLoading">
          <span v-if="isLoading" class="material-symbols-outlined animate-spin absolute">autorenew</span>
          <span :class="{'opacity-0': isLoading}">Firmar y Sellar</span>
        </button>
      </div>
      
      <div v-if="isLoading" class="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl">
        <span class="material-symbols-outlined text-4xl text-primary animate-spin mb-2">autorenew</span>
        <p class="text-xs font-bold text-gray-700 uppercase tracking-widest text-center px-4">Generando Certificado y ZIP...<br/><span class="text-[9px] text-gray-500 font-normal normal-case">Esto puede tardar unos segundos</span></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits } from 'vue';
import ValidationError from '../../components/ValidationError.vue';
import { CertificationClient } from '../../clients/CertificationClient';

const props = defineProps({ context: Object });
const emit = defineEmits(['next', 'prev']);
const errors = reactive({ p12: '', password: '' });
const uploadStatus = ref('idle');
const isLoading = ref(false);

const getDropZoneClass = (file) => {
  if (uploadStatus.value === 'error') return '!bg-red-50 !border-red-500';
  if (file) return '!bg-green-50 !border-green-500';
  return '';
};

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    props.context.firma.p12 = file;
    errors.p12 = '';
    uploadStatus.value = 'idle';
  }
};

const onDrop = (e) => {
  const file = e.dataTransfer.files[0];
  if (file) {
    props.context.firma.p12 = file;
    errors.p12 = '';
    uploadStatus.value = 'idle';
  }
};

const validateAndSign = async () => {
  errors.p12 = '';
  errors.password = '';
  let hasError = false;

  if (!props.context.firma.p12) { errors.p12 = 'El certificado P12 es obligatorio'; hasError = true; }
  if (!props.context.firma.password) { errors.password = 'La contraseña es obligatoria'; hasError = true; }

  if (hasError) return;

  isLoading.value = true;
  try {
    const res = await CertificationClient.firmarExpediente(props.context.expedienteId, props.context.firma.p12, props.context.firma.password);
    console.log("✅ FIRMA APLICADA CON ÉXITO. Respuesta del servidor:", res);
    props.context.resultado = {
      hash: res.hash_certificado || '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
      fecha: new Date().toLocaleString()
    };
    emit('next');
  } catch (err) {
    console.error("❌ ERROR AL FIRMAR:", err);
    errors.password = err.message || 'Contraseña incorrecta o certificado P12 inválido.';
  } finally {
    isLoading.value = false;
  }
};
</script>
