<template>
  <div class="card-main !p-0 overflow-hidden min-h-[300px]">
    <div v-if="data.length === 0" class="p-16 flex flex-col items-center justify-center text-center h-full">
      <span class="material-symbols-outlined text-6xl text-gray-200 mb-4">document_scanner</span>
      <h3 class="text-xl font-heading font-bold text-gray-900 mb-2">No tienes certificados</h3>
      <p class="text-gray-500 text-sm max-w-sm">No encontramos registros digitales que coincidan. ¡Comencemos a certificar tu primera obra!</p>
      <button @click="$emit('start-certification')" class="btn-black mt-6 !py-3 !px-6 uppercase tracking-widest text-[10px]">Iniciar Certificación</button>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
            <th class="p-6">ID Expediente</th>
            <th class="p-6">Título Obra</th>
            <th class="p-6">pHash (Visual)</th>
            <th class="p-6">Hash Criptográfico (SHA-256)</th>
            <th class="p-6">Fecha Sello</th>
            <th class="p-6">Estado</th>
            <th class="p-6">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cert in data" :key="cert.id_certificado" class="border-b border-gray-50 hover:bg-[#f7f9fb] transition-colors">
            <td class="p-6 font-mono text-xs font-semibold text-gray-900">{{ cert.id_certificado }}</td>
            <td class="p-6 text-xs text-gray-800 font-medium">{{ cert.titulo_obra }}</td>
            <td class="p-6 font-mono text-[10px] text-gray-500 truncate max-w-[100px]" :title="cert.phash_visual">
              {{ truncateString(cert.phash_visual, 10) }}
            </td>
            <td class="p-6 font-mono text-[10px] text-gray-500 truncate max-w-[120px]" :title="cert.hash_criptografico">
              {{ truncateString(cert.hash_criptografico, 16) }}
            </td>
            <td class="p-6 text-xs text-gray-600">{{ cert.fecha_sello }}</td>
            <td class="p-6 text-[10px] font-bold text-green-600">{{ cert.estado }}</td>
            <td class="p-6 flex gap-2">
              <button @click="$emit('preview', cert)" class="text-secondary hover:text-green-600 transition-colors" title="Previsualizar Expediente">
                <span class="material-symbols-outlined text-lg">visibility</span>
              </button>
              <button @click="$emit('download', cert)" class="text-gray-400 hover:text-black transition-colors" title="Descargar Expediente JSON">
                <span class="material-symbols-outlined text-lg">download</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
  }
});

const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
};
</script>
