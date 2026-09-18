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
        <div class="relative w-full">
          <input v-model="context.firma.password" :disabled="isLoading" @keyup.enter="validateAndSign" :type="showPassword ? 'text' : 'password'" class="input-standard w-full !py-2 !px-3 !text-sm pr-9 disabled:bg-gray-100 disabled:text-gray-400" placeholder="Ingrese su contraseña PKI">
          <button @click="showPassword = !showPassword" type="button" tabindex="-1" :disabled="isLoading" class="absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-400 hover:text-black transition-colors focus:outline-none disabled:opacity-50">
            <span class="material-symbols-outlined text-[18px] select-none">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
          </button>
        </div>
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

      <!-- Loading Overlay Profesional -->
      <div v-if="isLoading" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <div class="bg-white p-6 rounded-2xl max-w-sm w-full shadow-2xl text-center flex flex-col items-center border border-gray-100">
          <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
            <span class="material-symbols-outlined text-4xl text-primary animate-spin">autorenew</span>
          </div>
          <h3 class="text-sm font-heading font-bold text-gray-900 uppercase tracking-wider mb-1">Firmando y Sellando Obra</h3>
          <p class="text-xs text-gray-600 leading-relaxed">
            Aplicando firma digital PKI y generando certificado forense inmutable con sello de tiempo...
          </p>
        </div>
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
const showPassword = ref(false);



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
    const mensaje = err instanceof TypeError
      ? 'No se pudo conectar con el servidor. Verifica tu conexión e intenta nuevamente.'
      : (err.message || 'Contraseña incorrecta o problema de red, intente nuevamente.');
    showToast(mensaje, 'error');
    errors.password = mensaje;
  } finally {
    isLoading.value = false;
  }
};
</script>
