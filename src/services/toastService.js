import { reactive } from 'vue';

export const toastState = reactive({
  toasts: []
});

export const showToast = (message, type = 'success', duration = 5000) => {
  const id = Date.now() + Math.random().toString(36).substring(2, 9);
  toastState.toasts.push({ id, message, type });
  setTimeout(() => {
    removeToast(id);
  }, duration);
};

export const removeToast = (id) => {
  const index = toastState.toasts.findIndex(t => t.id === id);
  if (index !== -1) toastState.toasts.splice(index, 1);
};
