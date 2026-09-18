<template>
  <div class="card-main p-4 md:p-6 bg-white text-center max-w-2xl mx-auto animate-fade-in">
    <div class="mb-3">
      <div class="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
        <span class="material-symbols-outlined text-2xl text-secondary">verified</span>
      </div>
      <h2 class="text-2xl font-heading font-bold text-gray-900">¡Obra Certificada!</h2>
      <p class="text-gray-500 text-xs mt-1">Se ha generado el sello de autenticidad inmutable.</p>
    </div>

    <div v-if="context.resultado" class="bg-surface rounded-xl p-4 border border-outline-variant/30 text-left mb-4">
      <div class="flex justify-between items-center mb-2 border-b border-outline-variant pb-2">
        <span class="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Hash de Seguridad</span>
        <span class="text-[10px] font-mono text-primary font-bold" :title="context.resultado.hash">
          SHA-256: {{ truncateString(context.resultado.hash, 20) }}
        </span>
      </div>
      <div class="space-y-2">
        <div class="flex justify-between text-[11px]">
          <span class="text-gray-500">ID Forense:</span>
          <span class="font-bold">{{ context.expedienteId }}</span>
        </div>
        <div class="flex justify-between text-[11px]">
          <span class="text-gray-500">Fecha de Sello:</span>
          <span class="font-bold">{{ context.resultado.fecha }}</span>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <button 
        @click="descargarCertificados" 
        :disabled="isDownloading"
        class="btn-black !py-2.5 w-full uppercase tracking-[0.2em] text-[10px] mb-2 flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <span class="material-symbols-outlined text-sm" :class="{ 'animate-spin': isDownloading }">
          {{ isDownloading ? 'autorenew' : 'download' }}
        </span>
        <span>{{ isDownloading ? 'Descargando y Preparando ZIP...' : 'Descargar Obra Firmada y Certificado ZIP' }}</span>
      </button>

      <div class="flex gap-2 mt-1">
        <button @click="certificarOtra" :disabled="isDownloading" class="btn-ghost !py-2.5 w-full uppercase tracking-[0.2em] text-[10px] border border-gray-200 disabled:opacity-50">
          Certificar otra obra
        </button>
        <button @click="cerrarSesion" :disabled="isDownloading" class="btn-ghost !py-2.5 w-full uppercase tracking-[0.2em] text-[10px] text-red-600 border border-red-100 hover:bg-red-50 disabled:opacity-50">
          Cerrar sesión
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import confetti from 'canvas-confetti';
import { withAuthHeader } from '../../services/authToken';
import { showToast } from '../../services/toastService';

const props = defineProps({ context: Object });
const emit = defineEmits(['complete']);
const router = useRouter();
const isDownloading = ref(false);

const truncateString = (str, num) => {
  if (!str) return '';
  if (str.length <= num) return str;
  return str.slice(0, num) + '...';
};

const descargarCertificados = async () => {
  if (isDownloading.value) return;
  isDownloading.value = true;
  const API_URL_CERT = process.env.VUE_APP_API_CERT || '/api/v1/certificaciones';
  const backendUrl = `${API_URL_CERT}/${props.context.expedienteId}/descargar`;
  try {
    const response = await fetch(backendUrl, { headers: withAuthHeader() });
    if (!response.ok) {
      throw new Error('No se pudo descargar el certificado.');
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Expediente_Forense_${props.context.expedienteId}.zip`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
    showToast('Descarga iniciada exitosamente.', 'success');
  } catch (error) {
    console.error('Descarga error:', error);
    const mensaje = error instanceof TypeError
      ? 'No se pudo conectar con el servidor. Verifica tu conexión e intenta nuevamente.'
      : (error.message || 'Error al descargar el certificado');
    showToast(mensaje, 'error');
  } finally {
    isDownloading.value = false;
  }
};

const certificarOtra = () => {
  emit('complete');
};

const cerrarSesion = () => {
  localStorage.clear();
  router.push('/login');
};
</script>
