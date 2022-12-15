<script lang="ts" setup>
import { VueSelecto } from 'vue3-selecto';
import { computedInputModel } from '../composables/state';
import { ProvideQueryState } from '@/types/index';
import { QUERY_STATE_KEY } from '@/utils';

function handleQueryChanged(query: Record<string, any>, urlRef: any) {
  computedInputModel.value = buildURL(urlRef.origin + urlRef.pathname, query);
}

const isEditingQuery = ref(false);
const selectedQueryItems: ProvideQueryState['selectedQueryItems'] = ref([]);
function clearAllSelectedQueryItems() {
  selectedQueryItems.value.length = 0;
}
provide<ProvideQueryState>(QUERY_STATE_KEY, {
  isEditingQuery,
  updateIsEditingQuery(val: boolean) {
    isEditingQuery.value = !!val;
  },
  selectedQueryItems,
  clearAllSelectedQueryItems,
});

const selectableTargets = ref([]);
const container = ref();
function onSelect(e: any) {
  e.added.forEach((el: HTMLElement) => {
    el.classList.add('selected');
    selectedQueryItems.value.push(el);
  });
  e.removed.forEach((el: HTMLElement) => {
    el.classList.remove('selected');
    const index = selectedQueryItems.value.findIndex((item) => {
      return item === el;
    });
    selectedQueryItems.value.splice(index, 1);
  });
}

onMounted(() => {
  nextTick(() => {
    selectableTargets.value = Array.from(document.querySelectorAll('.collapse-item'));
    container.value = document.querySelector('.app__right');
  });
});
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
      <ParsedResult :url="computedInputModel" @query-changed="handleQueryChanged" />
    </div>

    <vue-selecto
      :container="container"
      :drag-container="container"
      :selectable-targets="selectableTargets"
      :select-from-inside="true"
      :continue-select="false"
      :hit-rate="5"
      @select="onSelect"
    />
  </main>
</template>

<style lang="less">
@import "./index.less";
</style>
