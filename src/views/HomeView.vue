<template>
  <div class="flex flex-col bg-[#f7f9fb] h-screen overflow-y-auto">
    <!-- Navbar similar a NavbarSession pero para invitados -->
    <nav class="nav-standard flex justify-between items-center bg-white shadow-sm px-6 py-4 fixed w-full z-50">
        <div class="flex items-center gap-10">
            <span class="font-heading font-bold text-xl tracking-tighter uppercase text-black">VerisArt</span>
            <div class="hidden md:flex gap-6 text-sm font-medium text-gray-500">
                <router-link to="/" class="hover:text-black transition-colors">Sobre Nosotros</router-link>
            </div>
        </div>
        <div class="flex items-center gap-6">
            <router-link to="/login" class="text-sm font-semibold text-black hover:text-gray-700 transition-colors">Iniciar Sesión</router-link>
            <router-link to="/register" class="btn-black !py-2 !text-xs uppercase tracking-widest hover:scale-105 transition-transform">Registrarse</router-link>
        </div>
    </nav>

    <main class="flex-grow pt-24 pb-12">
        <!-- Hero Section -->
        <section class="max-w-7xl mx-auto px-6 py-12 md:py-24 flex flex-col md:flex-row items-center gap-12">
            <div class="w-full md:w-1/2 flex flex-col gap-6 animate-fade-in">
                <div class="inline-flex items-center gap-2 bg-[#e6fbf2] text-[#00b562] px-4 py-2 rounded-full w-fit">
                    <span class="material-symbols-outlined text-sm">science</span>
                    <span class="text-[10px] font-bold uppercase tracking-widest">Prototipo Académico</span>
                </div>
                <h1 class="text-5xl md:text-6xl font-heading font-bold text-gray-900 leading-tight">
                    Certificación de Autoría <span class="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">Digital.</span>
                </h1>
                <p class="text-gray-500 text-lg leading-relaxed max-w-lg">
                    Plataforma prototipo desarrollada por <strong class="text-black">E y F Software</strong> exclusiva para el público ecuatoriano, orientada a proteger obras digitales mediante firmas electrónicas (PKI) y validación perceptual (pHash).
                </p>
                <div class="flex flex-col sm:flex-row gap-4 mt-4">
                    <router-link to="/register" class="btn-black py-4 px-8 text-xs uppercase tracking-[0.2em] font-bold shadow-2xl flex items-center justify-center gap-2 hover:-translate-y-1 transition-all">
                        Comenzar Certificación
                        <span class="material-symbols-outlined text-sm">arrow_forward</span>
                    </router-link>
                </div>
            </div>
            <div class="w-full md:w-1/2 relative animate-fade-in group cursor-pointer" style="animation-delay: 200ms;">
                <div class="absolute inset-0 bg-gradient-to-tr from-gray-200 to-transparent rounded-3xl transform rotate-3 scale-105 z-0"></div>
                <img src="https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1000" 
                     class="relative z-10 rounded-3xl shadow-2xl object-cover h-[500px] w-full border border-gray-100 grayscale transition-all duration-700">
                <!-- Overlay verde elegante que tiñe la imagen abstracta al pasar el cursor -->
                <div class="absolute inset-0 bg-[#00b562] opacity-0 group-hover:opacity-40 rounded-3xl z-20 transition-opacity duration-700 mix-blend-color pointer-events-none"></div>
                
                <!-- Floating Badge -->
                <div class="absolute -bottom-6 -left-6 z-30 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 animate-bounce" style="animation-duration: 3s;">
                    <div class="h-12 w-12 rounded-full bg-black flex items-center justify-center text-white">
                        <span class="material-symbols-outlined">security</span>
                    </div>
                    <div>
                        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Protección Criptográfica</p>
                       </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section id="features" class="max-w-7xl mx-auto px-6 py-24">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-heading font-bold text-gray-900">Fundamentos del Prototipo</h2>
             </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="card-main p-8 hover:-translate-y-2 transition-transform duration-300">
                    <span class="material-symbols-outlined text-4xl text-black mb-4">fact_check</span>
                    <h3 class="text-lg font-heading font-bold mb-2">Simulación de Identidad</h3>
                    <p class="text-gray-500 text-xs leading-relaxed">Validación de identidad de las partes involucradas en el proceso de registro.</p>
                </div>
                <div class="card-main p-8 hover:-translate-y-2 transition-transform duration-300">
                    <span class="material-symbols-outlined text-4xl text-black mb-4">fingerprint</span>
                    <h3 class="text-lg font-heading font-bold mb-2">Huella Perceptual (pHash)</h3>
                    <p class="text-gray-500 text-xs leading-relaxed">Análisis de la obra para detectar plagios, variaciones o intentos de doble registro protegiendo la autoría original.</p>
                </div>
                <div class="card-main p-8 hover:-translate-y-2 transition-transform duration-300">
                    <span class="material-symbols-outlined text-4xl text-black mb-4">history_edu</span>
                    <h3 class="text-lg font-heading font-bold mb-2">Firma Electrónica PKI</h3>
                    <p class="text-gray-500 text-xs leading-relaxed">El autor firma su propia obra utilizando su certificado digital (Archivo .p12), estableciendo un vínculo de No-Repudio.</p>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="bg-black text-white py-12 mt-auto">
        <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-[#6cf8bb]">policy</span>
                <span class="font-heading font-bold text-lg tracking-tighter uppercase">VerisArt Forense</span>
            </div>
            <p class="text-gray-400 text-xs text-center md:text-left">
                © 2026 Sistema de Certificación Forense. Todos los derechos reservados.<br/>
                Implementado para el proyecto de titulación.
            </p>
        </div>
    </footer>
  </div>
</template>

<script setup>
// Landing page lógica básica. Sin autenticación requerida.
</script>
