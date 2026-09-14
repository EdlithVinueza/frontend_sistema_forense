<template>
  <footer class="bg-black text-white py-2 w-full mt-auto border-t border-gray-800 flex-shrink-0">
    <div class="w-full px-4 sm:px-8 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-3">
      <div class="flex items-center gap-2">
        <BrandLogo to="/" size="sm" :inverted="true" />
      </div>
      <p class="text-gray-400 text-[10px] text-center sm:text-left leading-tight">
        © 2026 Veriart — Sistema de Certificación Digital. Todos los derechos reservados. &nbsp;·&nbsp; Proyecto de Titulación
      </p>
    </div>
  </footer>
</template>

<script setup>
import BrandLogo from './BrandLogo.vue';
</script>
