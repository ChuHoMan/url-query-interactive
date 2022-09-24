<template>
    <div :class="['collapse-item', isActive ? 'collapse-item--active' : '']">
        <div role="tab">
            <div :class="['collapse-item__header', isActive ? 'collapse-item--active' : '']">
                <slot name="header" :isActive="isActive" :handleClickItem="collapse.handleItemClick" />
            </div>
        </div>

        <div>
            <div v-show="isActive" class="collapse-item__wrapper">
                <slot />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
  name: 'CollapseItem'
}
</script>

<script lang="ts" setup>
import { collapseContextKey, collapseItemProps, CollapseActiveName } from './utils'
import type { Ref } from 'vue';

const props = defineProps(collapseItemProps)
const collapse = inject(collapseContextKey) as {
    activeNames: Ref<CollapseActiveName[]>;
    handleItemClick: (name: CollapseActiveName) => void;
}

const isActive = computed(() => collapse?.activeNames.value.includes(props.name))


defineExpose({
    isActive
})
</script>

<style lang="less">
.collapse-item {
    &__header {
        border: 1px solid var(--border-color);
        border-top: 0;
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
</style>