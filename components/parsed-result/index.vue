<template>
  <client-only>
    <template v-if="originPath">
      <section class="origin__wrapper">
        <div class="title">
          origin and path
        </div>
        <div
          v-show="originPath"
          class="origin__content"
        >
          {{ originPath }}
          <button
            class="origin--copy button--copy"
          >
            <component
              :is="copied ? EvaCheckmarkOutline : EvaCopyOutline"
              @click="startCopy"
            />
          </button>
        </div>
      </section>
        <section v-if="Object.keys(query).length">
          <div class="title">
            <span>query</span>
            <span class="query__copy">
              Copy as JSON
            <button class="button--copy">
              <component
                :is="queryCopied ? EvaCheckmarkOutline : EvaCopyOutline"
                @click="startCopyQuery"
              />
            </button>
            </span>
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
              <span class="query__value">{{ query?.[queryKey] ?? '' }}</span>
            </li>
          </ul>
        </section>
    </template>
  </client-only>
</template>

<script lang="ts" setup>
import EvaCopyOutline from '~icons/eva/copy-outline'
import EvaCheckmarkOutline from '~icons/eva/checkmark-outline'
import { useQueryString } from '@/composables/useQueryString'
import { useCopy } from '@/composables/useCopy'
interface Props {
  url?: string
}

const props = withDefaults(defineProps<Props>(), {
  url: ''
})

const { originPath, query = {} as Record<string, any> } = useQueryString(toRef(props, 'url'))

const { copied, startCopy } = useCopy<string>(originPath)

const { copied: queryCopied, startCopy: startCopyQuery } = useCopy<Record<string, any>>(query, {
  format: 'JSON'
})

const { fetchJSON } = useTypeToJSON()
// TODO fake module and page
console.log(await fetchJSON({
  module: '',
  page: ''
}))
</script>

<script lang="ts">
export default {
    name: 'ParsedResult'
};
</script>

<style lang="less">
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    opacity: 0.4;
    margin: 16px 0;
}

.button--copy {
    display: flex;
    align-items: center;
    transition: opacity 0.3s ease-in;
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
    }
}

.query {
    &__copy {
      display: grid;
      align-items: center;
      grid-template-columns: 120px 1fr;
    }

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

    &__key {
      opacity: 0.8;
    }

    &__value {
        opacity: 0.5;
        word-wrap: break-word;
    }
}
</style>