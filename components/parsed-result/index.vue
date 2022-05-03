<template>
  <section class="origin__wrapper">
    <div class="title">
      host and path
    </div>
    <div class="origin__content">
      {{ originPath }}
      <button class="origin--copy">
        <component
          :is="copied ? EvaCheckmarkOutline : EvaCopyOutline"
          @click="handleCopy"
        />
      </button>
    </div>
  </section>
  <section>
    <div class="title">
      query
    </div>    
    <ul
      v-for="queryKey of Object.keys(query)"
      :key="queryKey"
      class="query__list"
    >
      <li
        class="query__list-item"
      >
        <span class="query__key">{{ queryKey }}</span>
        <span class="query__value">{{ query[queryKey] ?? '' }}</span>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import EvaCopyOutline from '~icons/eva/copy-outline'
import EvaCheckmarkOutline from '~icons/eva/checkmark-outline'
import { useQueryString } from '../../composables/useQueryString'
interface Props {
  url?: string
}

const props = withDefaults(defineProps<Props>(), {
  url: ''
})

const { originPath, query = {}, hash } = useQueryString(toRef(props, 'url'))

const copied = ref<boolean>(false)
const handleCopy = async () => {
    if(copied.value === true) return
    await navigator.clipboard.writeText(originPath.value)
    copied.value = true
    setTimeout(() => {
        copied.value = false
    }, 3000)
}
</script>

<script lang="ts">
export default {
    name: 'ParsedResult'
};
</script>

<style lang="less">
.title {
    font-size: 16px;
    opacity: 0.4;
}

.origin {
    &__wrapper {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .title,
    &__content {
        font-weight: 200;
    }

    &__content { 
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 16px;
        border: 1px solid var(--border-color);
        font-size: 20px;
        word-break: break-all;
        &:hover {
            .origin--copy {
                opacity: 1;
            }
        }
    }

    &--copy {
        opacity: 0;
        display: flex;
        align-items: center;
        transition: opacity 0.3s ease-in;
    }
}

.query {
    &__list {
        &:not(:first-of-type) {
            border-top: 0;
        }
        border: 1px solid var(--border-color);
        padding: 8px 16px;
        &-item {
            display: flex;
            flex-direction: column;
        }
    }

    &__value {
        opacity: 0.5;
        word-wrap: break-word;
    }
}
</style>