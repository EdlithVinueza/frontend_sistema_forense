<template>
  <div class="card-main p-4 md:p-6 bg-white max-w-2xl mx-auto animate-fade-in relative">
    <div class="text-center mb-3">
      <h2 class="text-2xl font-heading font-bold">Firma del Autor</h2>
      <p class="text-gray-500 text-xs mt-1">Cargue su certificado PKI para autorizar este sello forense.</p>
    </div>

    <div class="space-y-4 relative">
      <!-- Zona de P12 Eliminada -->

      <div class="bg-surface p-3 rounded-xl border border-outline-variant/30 relative">
        <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Contraseña de Firma</label>
        <input v-model="context.firma.password" type="password" class="input-standard w-full !py-2 !px-3 !text-sm" placeholder="Ingrese su contraseña PKI">
        <ValidationError v-if="errors.password" :error="errors.password" />
        <div class="alert-warning mt-4">
          <span class="material-symbols-outlined text-[14px]">warning</span>
          <p><strong>Importante:</strong> Esta es la clave de destino. Es su absoluta responsabilidad cuidar su clave PKI.</p>
        </div>
      </div>

      <div class="flex justify-between border-t border-gray-100 pt-4 mt-4">
        <button @click="$emit('prev')" class="btn-ghost !px-6 !py-2 uppercase tracking-[0.2em] text-[10px]" :disabled="isLoading">
          <span class="material-symbols-outlined text-sm align-middle">arrow_back</span> Atrás
        </button>
        <button @click="validateAndSign" class="btn-black !px-8 !py-2 uppercase tracking-[0.2em] text-[10px] min-w-[160px] relative" :disabled="!context.firma.password || isLoading">
          <span v-if="isLoading" class="material-symbols-outlined animate-spin absolute">autorenew</span>
          <span :class="{'opacity-0': isLoading}">Firmar y Sellar</span>
        </button>
      </div>
      <div v-if="isLoading" class="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
        <span class="material-symbols-outlined text-4xl text-primary animate-spin mb-2">autorenew</span>
        <p class="text-xs font-bold text-gray-700 uppercase tracking-widest text-center px-4">Generando Certificado y ZIP...<br/><span class="text-[9px] text-gray-500 font-normal normal-case">Esto puede tardar unos segundos</span></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits } from 'vue';
import ValidationError from '../../components/ValidationError.vue';
import { showToast } from '../../services/toastService';
import { CertificationClient } from '../../clients/CertificationClient';

const props = defineProps({ context: Object });
const emit = defineEmits(['next', 'prev']);
const errors = reactive({ password: '' });
const isLoading = ref(false);



const validateAndSign = async () => {
  errors.password = '';
  let hasError = false;
  if (!props.context.firma.password) { errors.password = 'La contraseña es obligatoria'; hasError = true; }

  if (hasError) return;

  isLoading.value = true;
  try {
    const res = await CertificationClient.firmarExpediente(props.context.expedienteId, props.context.firma.password);
    console.log("✅ FIRMA APLICADA CON ÉXITO. Respuesta del servidor:", res);
    showToast('Documento firmado con éxito', 'success');
    props.context.resultado = {
      hash: res.hash_certificado || '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
      fecha: new Date().toLocaleString()
    };
    emit('next');
  } catch (err) {
    console.error("❌ ERROR AL FIRMAR:", err);
    showToast(err.message || 'Contraseña incorrecta o problema de red, intente nuevamente.', 'error');
    errors.password = err.message || 'Contraseña incorrecta o problema de red, intente nuevamente.';
  } finally {
    isLoading.value = false;
  }
};
</script>
