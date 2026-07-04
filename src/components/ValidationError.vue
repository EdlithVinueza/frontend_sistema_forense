<template>
  <div v-if="error" class="text-red-500 text-xs mt-1 flex items-start gap-1 absolute -right-4 top-1/2 -translate-y-1/2 translate-x-full w-48 bg-white p-2 border border-red-100 rounded shadow-sm z-10">
    <span class="material-symbols-outlined text-[14px]">error</span>
    <span>{{ error }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  error: {
    type: String,
    default: ''
  }
});
</script>
