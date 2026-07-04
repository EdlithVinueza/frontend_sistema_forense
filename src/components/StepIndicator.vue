<template>
  <div class="stepper-container">
    <div class="step-item" :class="getStepClass(1)">
      <div class="step-circle">
        <span v-if="currentStep > 1" class="material-symbols-outlined text-[14px] text-secondary font-bold bg-white rounded-full p-0.5">check</span>
        <span v-else>1</span>
      </div>
      <span class="step-label">Carga Forense</span>
      <div class="step-connector" :class="getLineClass(1)" :style="getLineStyle(1)"></div>
    </div>

    <div class="step-item" :class="getStepClass(2)">
      <div class="step-circle">
        <span v-if="currentStep > 2" class="material-symbols-outlined text-[14px] text-secondary font-bold bg-white rounded-full p-0.5">check</span>
        <span v-else>2</span>
      </div>
      <span class="step-label">Datos de Obra</span>
      <div class="step-connector" :class="getLineClass(2)" :style="getLineStyle(2)"></div>
    </div>

    <div class="step-item" :class="getStepClass(3)">
      <div class="step-circle">
        <span v-if="currentStep > 3" class="material-symbols-outlined text-[14px] text-secondary font-bold bg-white rounded-full p-0.5">check</span>
        <span v-else>3</span>
      </div>
      <span class="step-label">Firma del Autor</span>
      <div class="step-connector" :class="getLineClass(3)" :style="getLineStyle(3)"></div>
    </div>

    <div class="step-item" :class="getStepClass(4)">
      <div class="step-circle">
        <span v-if="currentStep > 4" class="material-symbols-outlined text-[14px] text-secondary font-bold bg-white rounded-full p-0.5">check</span>
        <span v-else>4</span>
      </div>
      <span class="step-label">Descarga Final</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
    default: 1
  }
});

const getStepClass = (step) => {
  if (props.currentStep > step) return 'completed';
  if (props.currentStep === step) return 'active';
  return '';
};

const getLineClass = (step) => {
  if (props.currentStep > step) return '!bg-[#7df1b8]';
  return '';
};

const getLineStyle = (step) => {
  if (props.currentStep === step) {
    return 'background: linear-gradient(to right, #7df1b8 50%, #e2e8f0 50%);';
  }
  return '';
};
</script>
