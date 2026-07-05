<template>
  <ToastContainer />
  <router-view/>
</template>

<script setup>
import ToastContainer from './components/ToastContainer.vue';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>