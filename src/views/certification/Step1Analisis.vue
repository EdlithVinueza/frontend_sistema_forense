<template>
  <div class="card-main p-4 md:p-6 bg-white max-w-4xl mx-auto animate-fade-in">
    <div class="text-center mb-3 relative">
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
      
    </div>

    <!-- Requisitos -->
   
      <div class="alert-warning mt-2">
        <span class="material-symbols-outlined text-[14px]">warning</span>
        <p><strong>Importante:</strong> La obra maestra (PSD) y la imagen deben tener obligatoriamente un <strong>fondo sólido</strong>. </p>
      </div>
    
    <div class="flex justify-end border-t border-gray-100 pt-4">
      <button 
        @click="validateAndNext" 
        :disabled="!context.archivos.psd || !context.archivos.imagen || isProcessing"
        class="btn-black !px-8 !py-2 uppercase tracking-[0.2em] text-[10px] w-full md:w-auto"
      >
        <span v-if="!isProcessing">Siguiente Paso <span class="material-symbols-outlined text-sm align-middle">arrow_forward</span></span>
        <span v-else class="flex items-center justify-center gap-2"><span class="material-symbols-outlined animate-spin text-sm">autorenew</span> Procesando...</span>
      </button>
    </div>

    <!-- Loading Overlay -->
    <div v-if="isProcessing" class="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-xl">
      <span class="material-symbols-outlined text-4xl text-primary animate-spin mb-2">autorenew</span>
      <p class="text-xs font-bold text-gray-700 uppercase tracking-widest text-center px-4">
        {{ isRecovering ? 'Recuperando Certificado...' : 'Analizando Archivos...' }}<br/>
        <span class="text-[9px] text-gray-500 font-normal normal-case">
          {{ isRecovering ? 'Ensamblando PDF e inyectando metadatos' : 'Evaluando integridad y extrayendo metadatos' }}
        </span>
      </p>
    </div>

    <!-- Recovery Modal -->
    <div v-if="showRecoveryModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-white p-6 rounded-xl max-w-md w-full shadow-2xl animate-fade-in text-center relative">
        <span class="material-symbols-outlined text-4xl mb-2" :class="isSystemLocked ? 'text-red-500' : 'text-primary'">
          {{ isSystemLocked ? 'gpp_bad' : 'policy' }}
        </span>
        <h3 class="text-lg font-bold mb-2" :class="isSystemLocked ? 'text-red-600' : ''">
          {{ isSystemLocked ? 'SISTEMA BLOQUEADO' : 'Obra Ya Registrada' }}
        </h3>
        
        <div v-if="!isSystemLocked">
          <p class="text-xs text-gray-600 mb-4">Esta obra ha sido certificada anteriormente, ingresa tu número de cédula para emitir nuevamente el certificado registrado anteriormente.</p>
          
          <input type="text" v-model="recoveryCedula" placeholder="Número de Cédula" class="w-full p-2 text-sm border rounded-lg mb-2 text-center focus:ring-2 focus:ring-primary outline-none">
          
          <p v-if="recoveryAttempts > 0" class="text-xs text-red-500 font-bold mb-3">
            Cédula incorrecta. Intento {{ recoveryAttempts }} de 3. Vuelva a intentar.
          </p>
          
          <div class="flex gap-2 justify-center mt-4">
            <button @click="cancelRecovery" class="btn-ghost !py-2 !px-4 text-xs uppercase">Cancelar</button>
            <button @click="attemptRecovery" :disabled="!recoveryCedula" class="btn-black !py-2 !px-4 text-xs uppercase">Verificar Identidad</button>
          </div>
        </div>
        
        <div v-else>
          <p class="text-xs text-red-600 font-bold mb-4 bg-red-50 p-3 rounded-lg border border-red-200">
            Se han detectado indicios de robo de autoría debido a múltiples intentos fallidos con cédulas incorrectas. El sistema ha bloqueado temporalmente este proceso por razones de seguridad forense.
          </p>
          <button @click="cancelRecovery" class="btn-ghost !py-2 !px-4 text-xs uppercase w-full">Volver al inicio</button>
        </div>
      </div>
    </div>

    <!-- Success Recovery Modal -->
    <div v-if="showSuccessRecoveryModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-white p-6 rounded-xl max-w-md w-full shadow-2xl animate-fade-in text-center relative">
        <span class="material-symbols-outlined text-5xl text-primary mb-2">verified</span>
        <h3 class="text-lg font-bold mb-2">Identidad Verificada</h3>
        <p class="text-sm text-gray-700 mb-4">Estimado Autor, dado que tú certificaste esta obra y por cuestiones de integridad y autoría, emitimos nuevamente el certificado original en un archivo ZIP.</p>
        
        <button @click="downloadRecoveredZip" class="btn-black !py-3 !px-6 w-full flex justify-center items-center gap-2 mb-2">
          <span class="material-symbols-outlined">download</span> Descargar ZIP Original
        </button>
        <button @click="$emit('cancel')" class="text-xs text-gray-500 underline mt-2 hover:text-gray-800">Volver al inicio</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { showToast } from '../../services/toastService';
import { CertificationClient } from '../../clients/CertificationClient';

const props = defineProps({ context: Object });
const emit = defineEmits(['next', 'cancel']);
const error = ref('');
const successMsg = ref('');
const uploadStatus = ref('idle'); // 'idle' | 'error_psd' | 'error_imagen' | 'error_ambos'
const isProcessing = ref(false);
const isRecovering = ref(false);
const showRecoveryModal = ref(false);
const showSuccessRecoveryModal = ref(false);
const recoveryCedula = ref('');
const recoveryAttempts = ref(0);
const isSystemLocked = ref(false);
const duplicateHash = ref('');
const recoveredBlob = ref(null);

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
    showToast('⚠️ El Archivo Maestro debe ser OBLIGATORIAMENTE un archivo .PSD', 'warning');
    uploadStatus.value = 'error_psd';
    return false;
  }
  
  if (type === 'imagen' && !['png', 'jpg', 'jpeg'].includes(ext)) {
    showToast('⚠️ La Imagen de Referencia debe ser OBLIGATORIAMENTE formato .PNG o .JPG', 'warning');
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
  showToast(errMsg, 'error');
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
    showToast('Ambos archivos son obligatorios.', 'warning');
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
    successMsg.value = '';
    uploadStatus.value = 'idle';
    
    console.log("Iniciando envío sincrónico de archivos PSD e Imagen al backend...");
    const res = await CertificationClient.initCertificacion(props.context.archivos.psd, props.context.archivos.imagen);
    
    if (res.estado === 'REQUIERE_CEDULA') {
      isProcessing.value = false;
      duplicateHash.value = res.hash_duplicado;
      showRecoveryModal.value = true;
      return;
    }

    props.context.expedienteId = res.expediente_id || 'VA-' + Math.floor(Math.random() * 10000);
    
    if (res.software_detectado) {
      props.context.datosObra.software = res.software_detectado;
    }
    
    props.context.archivosModificados = false; // Resetear bandera de modificación tras el éxito
    
    console.log("📁 EXPEDIENTE COMPLETADO:", props.context.expedienteId);
    
    isProcessing.value = false;
    showToast('Análisis forense completado con éxito.', 'success');
    setTimeout(() => { emit('next'); }, 1500);
    
  } catch (err) {
    isProcessing.value = false;
    handleBackendError(err.message || 'Error de conexión al enviar los archivos.');
  }
};

const cancelRecovery = () => {
  showRecoveryModal.value = false;
  recoveryCedula.value = '';
  recoveryAttempts.value = 0;
  isSystemLocked.value = false;
  props.context.archivos.imagen = null;
  props.context.archivos.psd = null;
  if (imagePreviewUrl.value) URL.revokeObjectURL(imagePreviewUrl.value);
  imagePreviewUrl.value = null;
  emit('cancel'); // Vuelve a la boveda / limpia todo
};

const attemptRecovery = async () => {
  if (!recoveryCedula.value || isSystemLocked.value) return;
  // No ocultamos el modal, lo mantenemos abierto para mostrar errores ahí mismo.
  isProcessing.value = true;
  isRecovering.value = true;

  try {
    const blob = await CertificationClient.recuperarCertificado(props.context.archivos.imagen, duplicateHash.value, recoveryCedula.value);
    recoveredBlob.value = blob;
    isProcessing.value = false;
    isRecovering.value = false;
    showRecoveryModal.value = false; // Cerramos este modal para abrir el de éxito
    showSuccessRecoveryModal.value = true;
  } catch (err) {
    isProcessing.value = false;
    isRecovering.value = false;
    recoveryAttempts.value++;
    
    if (recoveryAttempts.value >= 3) {
      isSystemLocked.value = true;
      showToast("BLOQUEO DE SEGURIDAD: Indicios de robo de autoría detectados.", "error");
    } else {
      if (err.message && err.message.includes("ConflictoPropiedad")) {
        showToast(`Cédula incorrecta. Intento ${recoveryAttempts.value} de 3.`, "error");
      } else {
        showToast(err.message || 'Error al verificar la identidad para la recuperación.', "error");
      }
    }
  }
};

const downloadRecoveredZip = () => {
  if (!recoveredBlob.value) return;
  const url = window.URL.createObjectURL(recoveredBlob.value);
  const a = document.createElement('a');
  a.href = url;
  a.download = "Expediente_Recuperado.zip";
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
  showToast("Descarga completada. El proceso ha finalizado.", "success");
  setTimeout(() => { emit('cancel'); }, 2000);
};

</script>
