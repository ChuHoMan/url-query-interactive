<template>
  <div class="input__wrapper">
    <input
      v-model="inputRef"
      class="url-query-input"
      aria-label="输入 URL"
      placeholder="输入 URL"
      autocomplete="off"
    >
  </div>
</template>

<script lang="ts" setup>
const inputRef = ref('')
</script>

<script lang="ts">
export default {
    name: 'Search'
}
</script>

<style lang="less" scoped>
.input__wrapper {
  border-radius: 4px;
}
.url-query-input {
  box-sizing: border-box;
  width: 100%;
  border-style: none;
  padding: 16px 12px;
  outline-style: none;
  caret-color: var(--primary-color);
  font-size: 24px;
}
</style>