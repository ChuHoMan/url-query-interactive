<script lang="ts" setup>
import { type CollapseActiveName, collapseContextKey, collapseProps } from './utils';
import { ensureArray } from '@/utils';
const props = defineProps(collapseProps);

const activeNames = ref(ensureArray(props.modelValue));

const handleItemClick = (name: CollapseActiveName) => {
  const currentIndex = activeNames.value.indexOf(name);
  if (~currentIndex)
    activeNames.value.splice(currentIndex, 1);
  else
    activeNames.value.push(name);
};

provide(collapseContextKey, {
  activeNames,
  handleItemClick,
});

defineExpose({
  activeNames,
});
</script>

<script lang="ts">
export default {
  name: 'Collapse',
};
</script>

<template>
  <div class="collapse" role="tablist">
    <slot />
  </div>
</template>

<style lang="less">
.collapse {
    border-top: 1px solid var(--border-color);
}
</style>
