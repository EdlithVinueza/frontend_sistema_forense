<template>
  <nav class="nav-standard flex justify-between items-center">
    <div class="flex items-center gap-10">
      <router-link to="/" class="font-heading font-bold text-xl tracking-tighter uppercase">VerisArt</router-link>
      <div class="hidden md:flex gap-6 text-sm font-medium text-gray-500">
      </div>
    </div>
    <div class="flex items-center gap-6">
      <router-link to="/login" class="text-sm font-semibold">Iniciar Sesión</router-link>
      <router-link to="/register" class="btn-black !py-2 !text-xs uppercase tracking-widest">Registrarse</router-link>
    </div>
  </nav>
</template>

<script setup>
</script>
