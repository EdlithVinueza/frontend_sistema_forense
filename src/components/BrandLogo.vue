<template>
  <router-link :to="to" class="inline-flex items-center gap-2 group select-none" :class="customClass">
    <span 
      :class="[
        'font-heading font-black tracking-tight uppercase transition-colors',
        size === 'sm' ? 'text-xs sm:text-sm' : size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl',
        inverted ? 'text-white' : 'text-black'
      ]"
    >
      VERIART
    </span>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  to: {
    type: String,
    default: '/'
  },
  size: {
    type: String,
    default: 'md' // 'sm' | 'md' | 'lg'
  },
  inverted: {
    type: Boolean,
    default: false
  },
  subtitle: {
    type: String,
    default: 'FORENSE'
  },
  customClass: {
    type: String,
    default: ''
  }
});
</script>
