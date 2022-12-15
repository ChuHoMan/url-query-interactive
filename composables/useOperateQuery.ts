import type { Ref } from 'vue';
import { QUERY_STATUS, QueryStatus } from '~~/components/parsed-result/utils';
import { ProvideQueryState } from '~~/types';

export function useOperateQuery(query: Ref<Record<string, any>>, status: Ref<QueryStatus[]>) {
  const { updateIsEditingQuery, selectedQueryItems, clearAllSelectedQueryItems } = inject<ProvideQueryState>(QUERY_STATE_KEY)!;
  const queryState = reactive<{
        elRefs: HTMLElement[]
          }>({
            elRefs: Array.from({
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
          console.log(selectedQueryItems);
          if (selectedQueryItems.value?.length > 0) {
            // TODO BATCH Delete
            clearAllSelectedQueryItems();
          }
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
