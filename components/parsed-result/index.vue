<script lang="ts" setup>
import type { Ref } from 'vue';
import { QUERY_STATUS, QueryStatus } from './utils';
import EvaCopyOutline from '~icons/eva/copy-outline';
import EvaCheckmarkOutline from '~icons/eva/checkmark-outline';
import EvaChevronDownOutline from '~icons/eva/chevron-down-outline';
import EvaEdit2Fill from '~icons/eva/edit-2-fill';
import EvaTrash2Fill from '~icons/eva/trash-2-fill';
import EvaSaveFill from '~icons/eva/save-fill';
import { useQueryString } from '@/composables/useQueryString';
import { useCopy } from '@/composables/useCopy';
interface Props {
  url?: string
}

const props = withDefaults(defineProps<Props>(), {
  url: '',
});

const emit = defineEmits(['query-changed']);

const { originPath, query = {} as Ref<Record<string, any>>, status, indexToQueryKeyMap } = useQueryString(toRef(props, 'url'), emit);

const { copied, startCopy } = useCopy<string>(originPath);

const { copied: queryCopied, startCopy: startCopyQuery } = useCopy<Record<string, any>>(query, {
  format: 'JSON',
});

const collapseActiveKeys = ref<number[]>([]);

// TODO fake module and page
const { fetchJSON, parsedPageQueryJSON } = useTypeToJSON();

const previewPageQueryJSON = computed(() => {
  return parsedPageQueryJSON.value?.children.filter((child) => {
    return query.value[child.key];
  });
});

const previewPargeQueryBlockTags = computed(() => {
  return function (queryKey = '') {
    return previewPageQueryJSON.value.find(c => c.key === queryKey)?.commonets!.blockTags;
  };
});

const {
  isEditStatusComp,
  toggleStatus,
  handleEditQuery,
  handleDeleteQueryItem,
  queryState,
} = useOperateQuery(query, status, indexToQueryKeyMap);

defineExpose({
  queryState,
});

await fetchJSON({
  module: '',
  page: '',
});
</script>

<script lang="ts">
export default {
  name: 'ParsedResult',
};
</script>

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
        <collapse v-model="collapseActiveKeys">
          <collapse-item
            v-for="(queryKey, index) of Object.keys(query)"
            :key="queryKey"
            :ref="(el) => queryState.collapseItemRefs[index] = el as any"
            :name="index"
          >
            <template #header="{ isActive, handleClickItem }">
              <ul class="query__list">
                <li
                  class="query__list-item"
                >
                  <span class="query__key__wrapper">
                    <div class="query__key">
                      {{ queryKey }}
                    </div>
                    <div class="query__key--right">
                      <eva-save-fill
                        v-if="isEditStatusComp(index)"
                        class="operation-icon"
                        @click="toggleStatus(QUERY_STATUS.PREVIEW, index)"
                      />
                      <eva-edit2-fill
                        v-else
                        class="operation-icon"
                        @click="toggleStatus(QUERY_STATUS.EDIT, index)"
                      />
                      <eva-trash-2-fill style="color: var(--danger-color)" class="operation-icon" @click="handleDeleteQueryItem(queryKey)" />
                    </div>
                  </span>
                  <div class="query__value__wrapper">
                    <span
                      :ref="(el) => queryState.elRefs[index] = el as any"
                      class="query__value"
                      :class="[{
                        'query__value--edit': status[index] === QUERY_STATUS.EDIT,
                      }]"
                      :contenteditable="status[index] === QUERY_STATUS.EDIT"
                      @input="handleEditQuery($event, queryKey)"
                    >
                      {{ query[queryKey] ?? '' }}
                    </span>
                    <eva-chevron-down-outline
                      v-if="isNotNullArrary(previewPargeQueryBlockTags(queryKey))"
                      :class="{ 'query-icon--active': isActive }"
                      class="query-icon"
                      @click="handleClickItem(index)"
                    />
                  </div>
                </li>
              </ul>
            </template>
            <div v-if="isNotNullArrary(previewPargeQueryBlockTags(queryKey))">
              <div
                v-for="blockTag of previewPargeQueryBlockTags(queryKey)"
                :key="blockTag.tag"
                class="collapse-item__box"
              >
                <div class="collapse-item__box__title">
                  {{ getPreviewTagName(blockTag.tag) }}
                </div>
                <div class="collapse-item__box__main">
                  {{ blockTag.text }}
                </div>
              </div>
            </div>
          </collapse-item>
        </collapse>
      </section>
    </template>
  </client-only>
</template>

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
        padding: 8px 4px 8px 16px;
        &-item {
            display: flex;
            flex-direction: column;
        }
    }

    &__key {

      &__wrapper {
        opacity: 0.8;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      &--right {
        display: flex;
        align-items: center;
        column-gap: 8px;

        .operation-icon {
          .basic-icon;
            &:hover {
              opacity: 0.4;
            }
        }
      }
    }

    &__value {
        opacity: 0.5;
        word-wrap: break-word;
        padding: 6px 12px;

        &--edit {
          cursor: pointer;
        }

        &__wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

      &:empty::before {
        content: '请输入 query 值'
      }

      &:focus-visible {
        cursor: text;
        outline: var(--border-color) auto 1px;
      }
    }

    &-icon {
      font-size: 20px;
      transition: transform .3s;
      cursor: pointer;

      &--active {
        transform: rotate(180deg);
      }
    }
}

.collapse-item__box {
  padding: 4px 0 4px;
  &__title {
    font-size: 14px;
  }

  &__main {
    opacity: 0.4;
  }
}
</style>

<style lang="less" scoped>
.collapse-item.selected {
  background: #f3f3f3;
}
</style>
