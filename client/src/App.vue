<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
@import '@/assets/base.css';
body {
   display: flex;
   place-items: center;
}
#app {
   max-width: 1280px;
   margin: 0 auto;
   display: grid;
   grid-template-columns: 1fr 1fr;
}
</style>
