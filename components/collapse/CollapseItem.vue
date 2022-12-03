<script lang="ts" setup>
import type { Ref } from 'vue';
import { CollapseActiveName, collapseContextKey, collapseItemProps } from './utils';
const props = defineProps(collapseItemProps);

const collapse = inject(collapseContextKey) as {
    activeNames: Ref<CollapseActiveName[]>
    handleItemClick(name: CollapseActiveName): void
};

const isActive = computed(() => collapse?.activeNames.value.includes(props.name));

defineExpose({
  isActive,
});
</script>

<script lang="ts">
export default {
  name: 'CollapseItem',
};
</script>

<template>
  <div class="collapse-item" :class="[isActive ? 'collapse-item--active' : '']">
    <div role="tab">
      <div class="collapse-item__header" :class="[isActive ? 'collapse-item--active' : '']">
        <slot name="header" :is-active="isActive" :handle-click-item="collapse.handleItemClick" />
      </div>
    </div>

    <div>
      <transition name="collapse">
        <div v-show="isActive" class="collapse-item__wrapper">
          <slot />
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="less">
.collapse-item {
    --collapse-duration: 0.5s;

    &__header {
        box-sizing: border-box;
        border: 1px solid var(--border-color);
        border-top: 0;
        transition: border-bottom 0.3s var(--collapse-duration);
        &.collapse-item--active {
            border-bottom: transparent;
        }
    }
    &__wrapper {
        will-change: height;
        overflow: hidden;
        box-sizing: border-box;
        border: 1px solid var(--border-color);
    }
}

.collapse-enter-active,
.collapse-leave-active {
  transition: all var(--collapse-duration) ease-out;
}

.collapse-enter-to,
.collapse-leave-from {
    max-height: 20vh;
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
}
</style>
