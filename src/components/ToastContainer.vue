<template>
  <div class="fixed top-24 right-6 z-[100] flex flex-col gap-3 pointer-events-none w-80">
    <TransitionGroup name="toast-list">
      <div 
        v-for="toast in toastState.toasts" 
        :key="toast.id" 
        :class="['pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md', getToastClass(toast.type)]"
      >
        <span class="material-symbols-outlined shrink-0 mt-0.5" :class="getIconClass(toast.type)">
          {{ getIconName(toast.type) }}
        </span>
        <div class="flex-1 text-sm font-medium leading-tight text-left">
          {{ toast.message }}
        </div>
        <button @click="removeToast(toast.id)" class="shrink-0 opacity-50 hover:opacity-100 transition-opacity">
          <span class="material-symbols-outlined text-sm">close</span>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { toastState, removeToast } from '../services/toastService';

const getToastClass = (type) => {
  if (type === 'success') return 'bg-green-50/90 border-green-200 text-green-900';
  if (type === 'error') return 'bg-red-50/90 border-red-200 text-red-900';
  if (type === 'warning') return 'bg-yellow-50/90 border-yellow-200 text-yellow-900';
  return 'bg-white/90 border-gray-200 text-gray-900';
};

const getIconClass = (type) => {
  if (type === 'success') return 'text-green-600';
  if (type === 'error') return 'text-red-600';
  if (type === 'warning') return 'text-yellow-600';
  return 'text-gray-600';
};

const getIconName = (type) => {
  if (type === 'success') return 'check_circle';
  if (type === 'error') return 'error';
  if (type === 'warning') return 'warning';
  return 'info';
};
</script>

<style scoped>
.toast-list-enter-active,
.toast-list-leave-active {
  transition: all 0.3s ease;
}
.toast-list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.toast-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
