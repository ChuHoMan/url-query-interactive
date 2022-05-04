<template>
  <div class="input__wrapper">
    <input
      ref="inputEl"
      v-model="inputModel"
      class="url-query-input"
      aria-label="输入 URL"
      placeholder="输入 URL"
      autocomplete="off"
    >
    <button
      v-show="inputModel"
      class="input--clear"
      @click="clear"
    >
      <eva-close-outline />
    </button>
  </div>
</template>

<script lang="ts" setup>
import EvaCloseOutline from '~icons/eva/close-outline'
import { inputModel } from '../composables/state';

const inputEl = ref<HTMLInputElement>()

const clear = () => {
  inputModel.value = ''
  nextTick().then(() => {
    inputEl.value?.focus()
  })
}
</script>

<script lang="ts">
export default {
    name: 'Search'
}
</script>

<style lang="less" scoped>
.input {
  &__wrapper {
    display: flex;
    padding: 16px 12px;
    border-radius: 4px;
    border: 1px solid var(--border-color);
    align-items: center;
  }

  &--clear {
    display: flex;
    align-items: center;
    font-size: 24px;
  }
}
.url-query-input {
  box-sizing: border-box;
  width: 100%;
  border-style: none;
  outline-style: none;
  caret-color: var(--primary-color);
  font-size: 24px;
  background-color: transparent;
}
</style>