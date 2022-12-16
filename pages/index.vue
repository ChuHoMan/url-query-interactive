<script lang="ts" setup>
import { VueSelecto } from 'vue3-selecto';
import { computedInputModel } from '../composables/state';
import { ProvideQueryState } from '@/types/index';
import { QUERY_STATE_KEY } from '@/utils';
import ParsedResult from '@/components/parsed-result/index.vue';

function handleQueryChanged(query: Record<string, any>, urlRef: any) {
  computedInputModel.value = buildURL(urlRef.origin + urlRef.pathname, query);
}

const isEditingQuery = ref(false);
const selectedQueryIndexes: ProvideQueryState['selectedQueryIndexes'] = ref([]);
function clearAllSelectedQueryIndexes() {
  selectedQueryIndexes.value.length = 0;
}
provide<ProvideQueryState>(QUERY_STATE_KEY, {
  isEditingQuery,
  updateIsEditingQuery(val: boolean) {
    isEditingQuery.value = !!val;
  },
  selectedQueryIndexes,
  clearAllSelectedQueryIndexes,
});

const parsedResultRef = ref<ComponentRef<typeof ParsedResult>>();
const selectableTargets = computed(() => {
  const resultRef = parsedResultRef.value!;
  return resultRef?.queryState.collapseItemRefs.map(ref => ref?.$el);
});
function onSelect(e: any) {
  e.added.forEach((el: HTMLElement) => {
    el.classList.add('selected');
    selectedQueryIndexes.value.push(getElementIndexFromParent(el));
  });
  e.removed.forEach((el: HTMLElement) => {
    el.classList.remove('selected');
    const index = selectedQueryIndexes.value.findIndex((idx) => {
      return idx === getElementIndexFromParent(el);
    });
    selectedQueryIndexes.value.splice(index, 1);
  });
}
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
      <parsed-result
        ref="parsedResultRef"
        :url="computedInputModel"
        @query-changed="handleQueryChanged"
      />
    </div>

    <vue-selecto
      :selectable-targets="selectableTargets"
      :select-by-click="false"
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
