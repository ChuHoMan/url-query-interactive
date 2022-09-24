<template>
    <div class="collapse" role="tablist">
        <slot />
    </div>
</template>

<script lang="ts">
export default {
  name: 'Collapse'
}
</script>

<script lang="ts" setup>
import { collapseProps,type CollapseActiveName, collapseContextKey } from './utils';
import { ensureArray } from '@/utils'

const props = defineProps(collapseProps)

const activeNames = ref(ensureArray(props.modelValue))

const handleItemClick = (name: CollapseActiveName) => {
    const currentIndex = activeNames.value.indexOf(name)
    if(~currentIndex) {
        activeNames.value.splice(currentIndex, 1)
    } else {
        activeNames.value.push(name)
    }
}

provide(collapseContextKey, {
    activeNames,
    handleItemClick
})

defineExpose({
    activeNames
})
</script>

<style lang="less">
.collapse {
    border-top: 1px solid var(--border-color);
}
</style>