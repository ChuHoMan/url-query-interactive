<template>
  <main class="app__main">
    <div class="app__left">
      <header>
        <TheNav />
      </header>
      <Search />
    </div>
    <div class="app__right" />
  </main>
</template>

<script lang="ts">
export default {
    name: 'Index'
}
</script>

<script lang="ts" setup>
import TheNav from '../components/TheNav.vue';
import Search from '../components/Search.vue';
</script>

<style lang="less">
@import "./index.less";
</style>