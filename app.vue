<script setup lang="ts">
useHead({
  title: 'Interactive Url Query',
  meta: [{
    name: 'description',
    content: 'url query interact.',
  }],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/url-query-interactive/favicon.svg' },
  ],
});
</script>

<template>
  <NuxtPage />
</template>

<style lang="less">
@import '@/assets/styles/reset.css';
@import '@/assets/styles/variables.css';

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
