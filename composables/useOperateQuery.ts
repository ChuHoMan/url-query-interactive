import type { ComponentPublicInstance, Ref } from 'vue';
import { QueryStringState } from './useQueryString';
import { QUERY_STATUS, QueryStatus } from '~~/components/parsed-result/utils';
import { ProvideQueryState } from '~~/types';

export function useOperateQuery(query: Ref<Record<string, any>>, status: Ref<QueryStatus[]>, indexToQueryKeyMap: Ref<QueryStringState['indexToQueryKeyMap']>) {
  const { updateIsEditingQuery, selectedQueryIndexes, clearAllSelectedQueryIndexes } = inject<ProvideQueryState>(QUERY_STATE_KEY)!;
  const queryState = reactive<{
        elRefs: HTMLElement[]
        collapseItemRefs: ComponentPublicInstance[]
          }>({
            elRefs: Array.from({
              length: Object.keys(query.value).length,
            }),
            collapseItemRefs: Array.from({
              length: Object.keys(query.value).length,
            }),
          });

  const toggleStatus = (_status: QueryStatus, index: number) => {
    status.value[index] = _status;
    if (status.value[index] === QUERY_STATUS.EDIT) {
      nextTick(() => {
        queryState.elRefs[index].focus();
      });
    }
  };

  const isEditStatusComp = computed(() => {
    return function (index: number) {
      return status.value[index] === QUERY_STATUS.EDIT;
    };
  });

  function handleEditQuery(e: Event, queryKey: string) {
    query.value[queryKey] = (e.target as any).textContent;
  }

  function handleDeleteQueryItem(queryKey: string) {
    updateIsEditingQuery(true);
    query.value[queryKey] = null;
    nextTick(() => {
      updateIsEditingQuery(false);
    });
  }

  onMounted(() => {
    useEventListener('keydown', (e) => {
      switch (e.key) {
        case 'Backspace':
          selectedQueryIndexes.value.forEach((index) => {
            const queryKey = indexToQueryKeyMap.value.get(index);
            queryKey && handleDeleteQueryItem(queryKey);
          });
          clearAllSelectedQueryIndexes();
          break;
        default:
          break;
      }
    });
  });

  return {
    isEditStatusComp,
    toggleStatus,
    handleEditQuery,
    handleDeleteQueryItem,
    queryState,
  };
}
