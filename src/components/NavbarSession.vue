<template>
  <nav class="nav-standard flex justify-between items-center">
    <div class="flex items-center gap-10">
      <router-link to="/dashboard" class="font-heading font-bold text-xl tracking-tighter uppercase">VerisArt</router-link>
      <div class="hidden md:flex gap-6 text-sm font-medium text-gray-500">
        <router-link to="/dashboard" class="text-black border-b-2 border-black pb-1">Bóveda Digital</router-link>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <div class="hidden sm:block h-8 w-[1px] bg-gray-200 mx-2"></div>
      <div class="relative group">
        <button class="flex items-center gap-2 text-gray-400 hover:text-black transition-colors outline-none cursor-pointer">
          <span class="material-symbols-outlined text-[28px]">account_circle</span>
        </button>
        <div class="absolute right-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div class="bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden">
            <div class="p-4 border-b border-gray-50 bg-[#f7f9fb]">
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Agente Autorizado</p>
              <p class="text-xs font-mono text-gray-900 truncate">{{ userEmail }}</p>
            </div>
            <div class="p-2">
              <button @click="logout" class="w-full flex items-center gap-3 px-3 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium">
                <span class="material-symbols-outlined text-[18px]">logout</span>
                Cierre de Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userEmail = ref(localStorage.getItem('userEmail') || 'usuario@ejemplo.com');

const logout = () => {
  localStorage.removeItem('estaAutenticado');
  localStorage.removeItem('userEmail');
  router.push('/login');
};
</script>
