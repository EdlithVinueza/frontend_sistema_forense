<template>
  <header class="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 flex-shrink-0">
    <nav class="w-full flex justify-between items-center px-4 sm:px-8 md:px-12 py-2">
      <!-- Izquierda: Botón hamburguesa (móvil) + Logo + Enlaces de escritorio -->
      <div class="flex items-center gap-2 sm:gap-6">
        <!-- Botón hamburguesa sólo en pantallas móviles (< md) -->
        <button 
          @click="toggleMenu" 
          type="button" 
          class="md:hidden p-1.5 -ml-1 text-gray-700 hover:text-black focus:outline-none flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          :aria-expanded="isMenuOpen"
          aria-label="Menú de navegación"
        >
          <span class="material-symbols-outlined text-[22px] select-none">
            {{ isMenuOpen ? 'close' : 'menu' }}
          </span>
        </button>

        <BrandLogo to="/" />

        <!-- Enlaces visibles en escritorio (md+) -->
        <div class="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 ml-4">
          <a 
            href="#features" 
            @click.prevent="navigateToSection('features')"
            class="hover:text-black transition-colors cursor-pointer"
          >
            Fundamentos
          </a>
          <a 
            href="#como-funciona" 
            @click.prevent="navigateToSection('como-funciona')"
            class="hover:text-black transition-colors cursor-pointer"
          >
            Cómo Funciona
          </a>
        </div>
      </div>

      <!-- Derecha: Iniciar Sesión y Registrarse (SIEMPRE VISIBLES fuera del menú) -->
      <div class="flex items-center gap-2 sm:gap-5 flex-shrink-0">
        <router-link 
          to="/login" 
          class="text-xs sm:text-sm font-semibold text-gray-800 hover:text-black transition-colors px-1 py-1 whitespace-nowrap"
        >
          Iniciar Sesión
        </router-link>
        <router-link 
          to="/register" 
          class="btn-black !py-1.5 !px-2.5 sm:!px-4 !text-[11px] sm:!text-xs uppercase tracking-wider whitespace-nowrap shadow-sm hover:scale-105 transition-transform"
        >
          Registrarse
        </router-link>
      </div>
    </nav>

    <!-- Menú desplegable móvil al presionar el botón hamburguesa -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div 
        v-if="isMenuOpen" 
        class="md:hidden bg-white border-t border-gray-100 px-6 py-2.5 shadow-xl flex flex-col gap-1 text-sm font-medium text-gray-700"
      >
        <a 
          href="#features" 
          @click.prevent="navigateToSection('features')" 
          class="py-2 hover:text-black flex items-center gap-2.5 transition-colors cursor-pointer"
        >
          <span class="material-symbols-outlined text-base text-[#00b562]">auto_awesome</span>
          Fundamentos
        </a>
        <a 
          href="#como-funciona" 
          @click.prevent="navigateToSection('como-funciona')" 
          class="py-2 hover:text-black flex items-center gap-2.5 transition-colors cursor-pointer"
        >
          <span class="material-symbols-outlined text-base text-[#00b562]">account_tree</span>
          Cómo Funciona
        </a>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import BrandLogo from './BrandLogo.vue';

const router = useRouter();
const route = useRoute();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const navigateToSection = (sectionId) => {
  closeMenu();
  if (route.path === '/') {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    router.push({ path: '/', hash: `#${sectionId}` }).then(() => {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });
  }
};
</script>
