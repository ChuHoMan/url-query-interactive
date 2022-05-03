<template>
  <NuxtPage />
</template>

<script setup lang="ts">
</script>

<style>
@import './styles/reset.css';
@import './styles/variables.css';

html, body , #__nuxt {
  height: 100vh;
  margin: 0px;
  transition: color,background-color .2s linear;
}
html.dark {
  background: #121212;
  color: white;
}
</style>