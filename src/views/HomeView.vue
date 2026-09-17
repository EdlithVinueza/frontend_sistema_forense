<template>
  <div class="flex flex-col bg-[#f7f9fb] min-h-screen w-full">
    <NavbarPublic />

    <main class="flex-grow">
        <!-- Hero Section con Ilustración de Mujer e Hortensia -->
        <section class="relative w-full min-h-[600px] flex items-center overflow-hidden">
            
            <!-- Imagen de Fondo a la Derecha -->
            <div class="absolute right-0 top-0 bottom-0 w-full md:w-3/5 h-full z-0 pointer-events-none">
                <img 
                    src="/modulo-b-analisis-verificacion.png"
                    alt="Ilustración Digital de Mujer con Hortensia"
                    class="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[1.05]"
                />
                <!-- Capa de difuminado al fondo #f7f9fb -->
                <div class="absolute inset-0 bg-gradient-to-r from-[#f7f9fb] via-[#f7f9fb]/75 to-transparent w-full md:w-1/2"></div>
                <div class="absolute inset-0 bg-gradient-to-b from-[#f7f9fb]/30 via-transparent to-[#f7f9fb]/30"></div>
            </div>

            <!-- Contenido Texto Hero -->
            <div class="relative z-10 max-w-7xl mx-auto px-8 w-full py-16 md:py-24">
                <div class="max-w-xl flex flex-col gap-6 animate-fade-in">
                    
                    <div class="flex items-center gap-3">
                        <span class="h-[2px] w-8 bg-[#00b562]"></span>
                        <span class="text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
                            Confianza que deja huella
                        </span>
                    </div>

                    <h1 class="text-5xl sm:text-6xl font-heading font-extrabold text-gray-900 leading-[1.15] tracking-tight">
                        Certificación de <br/>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#006c49] via-[#00b562] to-[#131b2e]">
                            Autoría Digital
                        </span>
                    </h1>

                    <p class="text-gray-600 text-base sm:text-lg leading-relaxed font-normal">
                        Plataforma prototipo desarrollada por <strong class="text-black font-semibold">E y F Software</strong> exclusiva para el público ecuatoriano, orientada a proteger obras digitales mediante firmas electrónicas (PKI) y validación perceptual (pHash).
                    </p>

                    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2">
                        <router-link to="/register" class="btn-black py-4 px-8 text-xs uppercase tracking-[0.2em] font-bold shadow-xl flex items-center justify-center gap-3 hover:-translate-y-0.5 transition-all">
                            Comenzar certificación
                            <span class="material-symbols-outlined text-sm">arrow_forward</span>
                        </router-link>

                        <a 
                            href="#como-funciona" 
                            @click.prevent="scrollToSection('como-funciona')"
                            class="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-700 hover:text-black flex items-center justify-center gap-2 group transition-colors cursor-pointer"
                        >
                            <span class="material-symbols-outlined text-xl text-gray-500 group-hover:text-black transition-colors">play_circle</span>
                            Conoce cómo funciona
                        </a>
                    </div>

                </div>
            </div>
        </section>

        <!-- Features Section (Fundamentos) -->
        <section id="features" class="max-w-7xl mx-auto px-8 py-20 border-t border-gray-200/60">
            <div class="text-center mb-14">
                <span class="text-xs font-bold uppercase tracking-[0.25em] text-[#00b562]">TECNOLOGÍA Y PILARES</span>
                <h2 class="text-3xl font-heading font-bold text-gray-900 mt-2">Fundamentos del Prototipo</h2>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="card-main p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                    <div class="h-12 w-12 rounded-xl bg-[#e6fbf2] text-[#00b562] flex items-center justify-center mb-6">
                        <span class="material-symbols-outlined text-2xl">fact_check</span>
                    </div>
                    <h3 class="text-lg font-heading font-bold mb-2 text-gray-900">Simulación de Identidad</h3>
                    <p class="text-gray-500 text-xs leading-relaxed">Validación de identidad de las partes involucradas en el proceso de registro mediante simulación de datos gubernamentales.</p>
                </div>

                <div class="card-main p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                    <div class="h-12 w-12 rounded-xl bg-[#e6fbf2] text-[#00b562] flex items-center justify-center mb-6">
                        <span class="material-symbols-outlined text-2xl">fingerprint</span>
                    </div>
                    <h3 class="text-lg font-heading font-bold mb-2 text-gray-900">Huella Perceptual (pHash)</h3>
                    <p class="text-gray-500 text-xs leading-relaxed">Análisis de la obra para detectar plagios, variaciones o intentos de doble registro protegiendo la autoría original.</p>
                </div>

                <div class="card-main p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                    <div class="h-12 w-12 rounded-xl bg-[#e6fbf2] text-[#00b562] flex items-center justify-center mb-6">
                        <span class="material-symbols-outlined text-2xl">history_edu</span>
                    </div>
                    <h3 class="text-lg font-heading font-bold mb-2 text-gray-900">Firma Electrónica PKI</h3>
                    <p class="text-gray-500 text-xs leading-relaxed">El autor firma su propia obra utilizando su certificado digital (Archivo .p12), estableciendo un vínculo legal de No-Repudio.</p>
                </div>
            </div>
        </section>

        <!-- Sección ¿Cómo Funciona? (Flujo Paso a Paso) -->
        <section id="como-funciona" class="max-w-7xl mx-auto px-8 py-16 sm:py-20 border-t border-gray-200/60">
            <div class="text-center mb-12">
                <span class="text-xs font-bold uppercase tracking-[0.25em] text-[#00b562]">PROCESO DE CERTIFICACIÓN</span>
                <h2 class="text-3xl font-heading font-bold text-gray-900 mt-2">¿Cómo funciona Veriart?</h2>
                <p class="text-gray-500 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
                    Cuatro etapas integradas para proteger la autoría original y emitir un certificado con plena validez digital.
                </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Paso 1 -->
                <div class="card-main p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:-translate-y-1.5 transition-transform duration-300 relative">
                    <div class="flex items-center justify-between mb-4">
                        <div class="h-10 w-10 rounded-xl bg-[#e6fbf2] text-[#00b562] flex items-center justify-center">
                            <span class="material-symbols-outlined text-xl">upload_file</span>
                        </div>
                        <span class="font-mono text-xs font-bold text-gray-400">PASO 01</span>
                    </div>
                    <h3 class="text-base font-heading font-bold text-gray-900 mb-1.5">Análisis Forense</h3>
                    <p class="text-gray-500 text-xs leading-relaxed">
                        Carga de la obra para el cálculo del hash perceptual (pHash). Detecta plagios o intentos de doble registro.
                    </p>
                </div>

                <!-- Paso 2 -->
                <div class="card-main p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:-translate-y-1.5 transition-transform duration-300 relative">
                    <div class="flex items-center justify-between mb-4">
                        <div class="h-10 w-10 rounded-xl bg-[#e6fbf2] text-[#00b562] flex items-center justify-center">
                            <span class="material-symbols-outlined text-xl">edit_note</span>
                        </div>
                        <span class="font-mono text-xs font-bold text-gray-400">PASO 02</span>
                    </div>
                    <h3 class="text-base font-heading font-bold text-gray-900 mb-1.5">Metadatos de Autoría</h3>
                    <p class="text-gray-500 text-xs leading-relaxed">
                        Registro inalterable de título, dimensiones, técnica artística y expediente de autoría vinculante.
                    </p>
                </div>

                <!-- Paso 3 -->
                <div class="card-main p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:-translate-y-1.5 transition-transform duration-300 relative">
                    <div class="flex items-center justify-between mb-4">
                        <div class="h-10 w-10 rounded-xl bg-[#e6fbf2] text-[#00b562] flex items-center justify-center">
                            <span class="material-symbols-outlined text-xl">draw</span>
                        </div>
                        <span class="font-mono text-xs font-bold text-gray-400">PASO 03</span>
                    </div>
                    <h3 class="text-base font-heading font-bold text-gray-900 mb-1.5">Firma PKI (.p12)</h3>
                    <p class="text-gray-500 text-xs leading-relaxed">
                        Firma criptográfica con el certificado personal del artista, garantizando autenticidad y no-repudio.
                    </p>
                </div>

                <!-- Paso 4 -->
                <div class="card-main p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:-translate-y-1.5 transition-transform duration-300 relative">
                    <div class="flex items-center justify-between mb-4">
                        <div class="h-10 w-10 rounded-xl bg-[#e6fbf2] text-[#00b562] flex items-center justify-center">
                            <span class="material-symbols-outlined text-xl">verified</span>
                        </div>
                        <span class="font-mono text-xs font-bold text-gray-400">PASO 04</span>
                    </div>
                    <h3 class="text-base font-heading font-bold text-gray-900 mb-1.5">Certificado Oficial</h3>
                    <p class="text-gray-500 text-xs leading-relaxed">
                        Emisión del certificado forense con resumen SHA-256 y código QR para verificación pública inmediata.
                    </p>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <Footer />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import NavbarPublic from '../components/NavbarPublic.vue';
import Footer from '../components/Footer.vue';

const route = useRoute();

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  if (route.hash) {
    const targetId = route.hash.replace('#', '');
    setTimeout(() => {
      scrollToSection(targetId);
    }, 150);
  }
});
</script>
