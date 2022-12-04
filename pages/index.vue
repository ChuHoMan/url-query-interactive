<script lang="ts" setup>
import { computedInputModel } from '../composables/state';
import { ProvideQueryState } from '@/types/index';
import { QUERY_STATE_KEY } from '@/utils';

function handleQueryChanged(query: Record<string, any>, urlRef: any) {
  computedInputModel.value = buildURL(urlRef.origin + urlRef.pathname, query);
}

const isEditingQuery = ref(false);

provide<ProvideQueryState>(QUERY_STATE_KEY, {
  isEditingQuery,
  updateIsEditingQuery(val: boolean) {
    isEditingQuery.value = !!val;
  },
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
  </main>
</template>

<style lang="less">
@import "./index.less";
</style>
