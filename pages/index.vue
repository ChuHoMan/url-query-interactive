<script lang="ts" setup>
import { computedInputModel } from '../composables/state';
</script>

<script lang="ts">
export default {
  name: 'Index',
};
</script>

<template>
  <main class="app__main">
    <div class="app__left">
      <TheNav />
      <Search />
    </div>
    <div class="app__right">
      <ParsedResult :url="computedInputModel" />
    </div>
  </main>
</template>

<style lang="less">
@import "./index.less";
</style>
