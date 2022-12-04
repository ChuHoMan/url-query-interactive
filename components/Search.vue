<script lang="ts" setup>
import { computedInputModel } from '../composables/state';
import EvaCloseOutline from '~icons/eva/close-outline';
import { ProvideQueryState } from '@/types/index';

const inputEl = ref<HTMLInputElement>();

const clear = () => {
  computedInputModel.value = '';
  nextTick().then(() => {
    inputEl.value?.focus();
  });
};

const { isEditingQuery } = inject<ProvideQueryState>(QUERY_STATE_KEY)!;
</script>

<script lang="ts">
export default {
  name: 'Search',
};
</script>

<template>
  <div class="input__wrapper">
    <input
      ref="inputEl"
      v-model="computedInputModel"
      class="url-query-input"
      aria-label="输入 URL"
      placeholder="输入 URL"
      autocomplete="off"
      :disabled="isEditingQuery"
    >
    <button
      v-show="computedInputModel"
      class="input--clear"
      @click="clear"
    >
      <eva-close-outline />
    </button>
  </div>
</template>

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
