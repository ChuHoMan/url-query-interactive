<template>
  <section class="origin__wrapper">
    <div class="origin__title">
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
</template>






<script lang="ts" setup>
import EvaCopyOutline from '~icons/eva/copy-outline'
import EvaCheckmarkOutline from '~icons/eva/checkmark-outline'
import { useQueryString } from '../../composables/useQueryString'
interface Props {
  url?: string
}

const props = withDefaults(defineProps<Props>(), {
  url: 'https://www.abc.com/test?a=1&b=c&c=d'
})

const { originPath, query, hash } = useQueryString(props.url)

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
.origin {
    &__wrapper {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    &__title,
    &__content {
        font-weight: 200;
    }

    &__title {
        font-size: 16px;
        opacity: 0.4;
    }

    &__content { 
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 16px;
        border: 1px solid #333;
        font-size: 20px;
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
</style>