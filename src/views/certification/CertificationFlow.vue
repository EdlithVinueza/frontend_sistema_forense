<template>
  <div class="flex flex-col min-h-screen bg-[#f7f9fb]">
    <NavbarSession />
    
    <main class="flex-grow flex p-6">
      <div class="max-w-7xl w-full m-auto">
        <!-- Vista del flujo -->
        <div class="w-full">
          <StepIndicator :currentStep="currentStep" />
          
          <div class="mt-8">
            <component 
              :is="currentStepComponent" 
              :context="certContext"
              @next="nextStep"
              @prev="prevStep"
              @cancel="cancelFlow"
              @complete="finishFlow"
            />
          </div>
        </div>
      </div>
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive, computed, markRaw } from 'vue';
import { useRouter } from 'vue-router';
import NavbarSession from '../../components/NavbarSession.vue';
import Footer from '../../components/Footer.vue';
import StepIndicator from '../../components/StepIndicator.vue';
import Step1Analisis from './Step1Analisis.vue';
import Step2Datos from './Step2Datos.vue';
import Step3Firma from './Step3Firma.vue';
import Step4Resultado from './Step4Resultado.vue';

const router = useRouter();
const currentStep = ref(1);

// Contexto del proceso (State Pattern Data)
const certContext = reactive({
  expedienteId: null,
  archivos: {
    psd: null,
    imagen: null
  },
  datosObra: {
    cedula: '',
    categoria: '',
    titulo_obra: '',
    software: '',
    hardware: '',
    descripcion: '',
    declaracion_derechos: false,
    declaracion_tecnica: false,
    declaracion_terminos: false
  },
  firma: {
    p12: null,
    password: ''
  },
  resultado: null
});

const steps = [
  markRaw(Step1Analisis),
  markRaw(Step2Datos),
  markRaw(Step3Firma),
  markRaw(Step4Resultado)
];

const currentStepComponent = computed(() => steps[currentStep.value - 1]);

const nextStep = (data) => {
  if (currentStep.value < 4) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const resetContext = () => {
  certContext.expedienteId = null;
  certContext.archivos = { psd: null, imagen: null };
  certContext.datosObra = { cedula: '', categoria: '', titulo_obra: '', software: '', hardware: '', descripcion: '', declaracion_derechos: false, declaracion_tecnica: false, declaracion_terminos: false };
  certContext.firma = { p12: null, password: '' };
  certContext.resultado = null;
  currentStep.value = 1;
};

const cancelFlow = () => {
  resetContext();
  router.push('/dashboard');
};

const finishFlow = () => {
  resetContext();
  router.push('/dashboard');
};
</script>
