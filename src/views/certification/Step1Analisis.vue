<template>
  <div class="card-main p-4 md:p-6 bg-white max-w-4xl mx-auto animate-fade-in">
    <div class="text-center mb-3 relative">
      <div v-if="successMsg" class="absolute -top-10 left-1/2 -translate-x-1/2 w-full p-2 bg-green-100 text-green-800 text-center font-bold text-xs rounded-lg shadow-sm z-10 animate-fade-in">{{ successMsg }}</div>
      <h2 class="text-2xl font-heading font-bold">Carga de Archivos Forenses</h2>
      <p class="text-gray-500 text-xs mt-1">Se requieren ambos archivos para completar el análisis de integridad.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 relative">
      <div 
        :class="['drop-zone min-h-[160px] flex flex-col items-center justify-center p-4 text-center transition-colors relative overflow-hidden', getDropZoneClass(context.archivos.psd, 'psd')]"
        @dragover.prevent
        @drop.prevent="e => onDrop(e, 'psd')"
      >
        <div class="z-10 flex flex-col items-center w-full">
          <span class="material-symbols-outlined text-3xl text-gray-400 mb-3">layers</span>
          <h3 class="font-bold text-sm mb-1">Archivo Maestro</h3>
          <p v-if="!context.archivos.psd" class="text-[10px] text-gray-500 mb-4 uppercase">Formato .PSD</p>
          <p v-else class="text-[10px] text-gray-900 font-bold mb-4 truncate w-48" :title="context.archivos.psd.name">{{ context.archivos.psd.name }} ({{ (context.archivos.psd.size / (1024*1024)).toFixed(2) }} MB)</p>
          <label class="btn-black !py-2 !px-4 !text-[10px] cursor-pointer w-full text-center block">
            <span class="material-symbols-outlined text-sm align-middle">upload_file</span> 
            {{ context.archivos.psd ? 'Cambiar PSD' : 'Seleccionar PSD' }}
            <input type="file" class="hidden" accept=".psd" @change="e => onFileChange(e, 'psd')">
          </label>
        </div>
      </div>

      <div 
        :class="['drop-zone min-h-[160px] flex flex-col items-center justify-center p-4 text-center transition-colors relative overflow-hidden', getDropZoneClass(context.archivos.imagen, 'imagen')]"
        @dragover.prevent
        @drop.prevent="e => onDrop(e, 'imagen')"
      >
        <!-- Preview background -->
        <div v-if="imagePreviewUrl" class="absolute inset-0 z-0 opacity-20 bg-center bg-cover bg-no-repeat blur-[2px]" :style="{ backgroundImage: 'url(' + imagePreviewUrl + ')' }"></div>
        
        <div class="z-10 flex flex-col items-center w-full">
          <span class="material-symbols-outlined text-3xl text-gray-400 mb-3">image</span>
          <h3 class="font-bold text-sm mb-1">Imagen de Referencia</h3>
          <p v-if="!context.archivos.imagen" class="text-[10px] text-gray-500 mb-4 uppercase">Formato .PNG o .JPG</p>
          <p v-else class="text-[10px] text-gray-900 font-bold mb-4 truncate w-48" :title="context.archivos.imagen.name">{{ context.archivos.imagen.name }} ({{ (context.archivos.imagen.size / (1024*1024)).toFixed(2) }} MB)</p>
          <label class="btn-black !py-2 !px-4 !text-[10px] cursor-pointer w-full text-center block">
            <span class="material-symbols-outlined text-sm align-middle">upload_file</span> 
            {{ context.archivos.imagen ? 'Cambiar Imagen' : 'Seleccionar Imagen' }}
            <input type="file" class="hidden" accept=".png, .jpg, .jpeg" @change="e => onFileChange(e, 'imagen')">
          </label>
        </div>
      </div>
      
      <ValidationError v-if="error" :error="error" class="top-1/2 -translate-y-1/2" />
    </div>

    <!-- Requisitos -->
    <div class="bg-surface p-3 rounded-xl border border-outline-variant/30 flex gap-4 mb-3">
      <span class="material-symbols-outlined text-secondary text-sm mt-0.5">info</span>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1 w-full">
        <div class="flex items-center gap-2 text-[10px] font-medium text-gray-600">
          <span class="material-symbols-outlined text-[12px] text-secondary">check_circle</span> Formatos: PSD + Imagen
        </div>
        <div class="flex items-center gap-2 text-[10px] font-medium text-gray-600">
          <span class="material-symbols-outlined text-[12px] text-secondary">check_circle</span> Sin marcas de agua
        </div>
      </div>
    </div>

    <div class="flex justify-between border-t border-gray-100 pt-4">
      <button @click="$emit('cancel')" class="btn-ghost !px-6 !py-2 uppercase tracking-[0.2em] text-[10px]">
        <span class="material-symbols-outlined text-sm align-middle">arrow_back</span> Volver a la Bóveda
      </button>
      <button 
        @click="validateAndNext" 
        :disabled="!context.archivos.psd || !context.archivos.imagen || isProcessing"
        :class="['btn-black !px-8 !py-2 uppercase tracking-[0.2em] text-[10px] transition-all', (!context.archivos.psd || !context.archivos.imagen || isProcessing) ? 'opacity-50 cursor-not-allowed' : '']"
      >
        <span v-if="!isProcessing">Siguiente Paso <span class="material-symbols-outlined text-sm align-middle">arrow_forward</span></span>
        <span v-else class="flex items-center justify-center gap-2"><span class="material-symbols-outlined animate-spin text-sm">autorenew</span> Procesando...</span>
      </button>
    </div>

    <!-- Loading Overlay -->
    <div v-if="isProcessing" class="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-xl">
      <span class="material-symbols-outlined text-4xl text-primary animate-spin mb-2">autorenew</span>
      <p class="text-xs font-bold text-gray-700 uppercase tracking-widest text-center px-4">Analizando Archivos...<br/><span class="text-[9px] text-gray-500 font-normal normal-case">Evaluando integridad y extrayendo metadatos</span></p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import ValidationError from '../../components/ValidationError.vue';
import { CertificationClient } from '../../clients/CertificationClient';

const props = defineProps({ context: Object });
const emit = defineEmits(['next', 'cancel']);
const error = ref('');
const successMsg = ref('');
const uploadStatus = ref('idle'); // 'idle' | 'error_psd' | 'error_imagen' | 'error_ambos'
const isProcessing = ref(false);

const imagePreviewUrl = ref(null);

const getDropZoneClass = (file, type) => {
  if (uploadStatus.value === 'error_' + type || uploadStatus.value === 'error_ambos') return '!bg-red-50 !border-red-500';
  if (isProcessing.value) return '!bg-yellow-50 !border-yellow-500 opacity-80';
  if (file) return '!bg-yellow-50 !border-yellow-500';
  return '';
};

const validateFile = (file, type) => {
  if (!file) return false;
  const ext = file.name.split('.').pop().toLowerCase();
  
  if (type === 'psd' && ext !== 'psd') {
    error.value = '⚠️ El Archivo Maestro debe ser OBLIGATORIAMENTE un archivo .PSD';
    uploadStatus.value = 'error_psd';
    return false;
  }
  
  if (type === 'imagen' && !['png', 'jpg', 'jpeg'].includes(ext)) {
    error.value = '⚠️ La Imagen de Referencia debe ser OBLIGATORIAMENTE formato .PNG o .JPG';
    uploadStatus.value = 'error_imagen';
    return false;
  }
  
  return true;
};

const handleFile = (file, type) => {
  if (!file) return;
  if (!validateFile(file, type)) {
    // Si la validación falla, limpiamos el archivo previo de ese tipo si existiera para forzar la carga correcta
    props.context.archivos[type] = null;
    if (type === 'imagen' && imagePreviewUrl.value) {
      URL.revokeObjectURL(imagePreviewUrl.value);
      imagePreviewUrl.value = null;
    }
    return;
  }
  
  props.context.archivos[type] = file;
  props.context.archivosModificados = true; // Marcar como modificados para forzar el reenvío
  error.value = '';
  uploadStatus.value = 'idle';
  
  if (type === 'imagen') {
    if (imagePreviewUrl.value) URL.revokeObjectURL(imagePreviewUrl.value);
    imagePreviewUrl.value = URL.createObjectURL(file);
  }
};

const onFileChange = (e, type) => {
  handleFile(e.target.files[0], type);
};

const onDrop = (e, type) => {
  handleFile(e.dataTransfer.files[0], type);
};

const handleBackendError = (errMsg) => {
  console.error("❌ ERROR DEL BACKEND:", errMsg);
  error.value = errMsg;
  const msgLower = errMsg.toLowerCase();
  if (msgLower.includes('psd')) {
    uploadStatus.value = 'error_psd';
  } else if (msgLower.includes('imagen') || msgLower.includes('similitud') || msgLower.includes('phash')) {
    uploadStatus.value = 'error_imagen';
  } else {
    uploadStatus.value = 'error_ambos';
  }
};

// Eliminada función checkStatus de polling

const validateAndNext = async () => {
  if (!props.context.archivos.psd || !props.context.archivos.imagen) {
    error.value = 'Ambos archivos son obligatorios.';
    return;
  }
  
  // OPTIMIZACIÓN: Si ya hay un expediente y los archivos NO han sido modificados, saltamos el backend
  if (props.context.expedienteId && props.context.archivosModificados === false) {
    console.log("Archivos no modificados. Omitiendo análisis redundante en backend...");
    emit('next');
    return;
  }
  
  try {
    isProcessing.value = true;
    error.value = '';
    successMsg.value = '';
    uploadStatus.value = 'idle';
    
    console.log("Iniciando envío sincrónico de archivos PSD e Imagen al backend...");
    const res = await CertificationClient.initCertificacion(props.context.archivos.psd, props.context.archivos.imagen);
    
    props.context.expedienteId = res.expediente_id || 'VA-' + Math.floor(Math.random() * 10000);
    props.context.archivosModificados = false; // Resetear bandera de modificación tras el éxito
    
    console.log("📁 EXPEDIENTE COMPLETADO:", props.context.expedienteId);
    
    isProcessing.value = false;
    successMsg.value = '✅ Análisis forense completado con éxito. Redirigiendo...';
    setTimeout(() => { emit('next'); }, 1500);
    
  } catch (err) {
    isProcessing.value = false;
    handleBackendError(err.message || 'Error de conexión al enviar los archivos.');
  }
};
</script>
