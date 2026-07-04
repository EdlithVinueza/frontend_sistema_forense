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
      <button @click="descargarCertificados" class="btn-black !py-2.5 w-full uppercase tracking-[0.2em] text-[10px]">
        <span class="material-symbols-outlined text-sm align-middle">download</span> Descargar Obra Firmada y Certificado PDF
      </button>
      <button @click="$emit('complete')" class="btn-ghost !py-2.5 w-full uppercase tracking-[0.2em] text-[10px]">
        Volver a la Bóveda
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({ context: Object });
const emit = defineEmits(['complete']);

const truncateString = (str, num) => {
  if (!str) return '';
  if (str.length <= num) return str;
  return str.slice(0, num) + '...';
};

const descargarCertificados = () => {
  // Disparamos la descarga directamente hacia el servidor Quarkus
  const backendUrl = `http://localhost:8090/api/v1/certificaciones/${props.context.expedienteId}/descargar`;
  window.open(backendUrl, '_blank');
};
</script>
