import { Ref, reactive, toRefs, watch } from 'vue';
import { QUERY_STATUS, QueryStatus } from '~~/components/parsed-result/utils';
import { ProvideQueryState } from '@/types/index';

export interface QueryStringState {
    query: Record<string, string>
    rawUrl: string
    originPath: string
    /** key 与 index 索引关系 */
    indexToQueryKeyMap: Map<number, string>
}

function createUrl(url: string): Partial<URL> {
  try {
    return new URL(url);
  } catch (e) {
    return {};
  }
}

function parse(params: string, options: {
    arrayFormat: 'none' | 'bracket'
} = {
  arrayFormat: 'none',
}) {
  const searchParams = new URLSearchParams(params);
  const { arrayFormat } = options;

  const arrayParams = (props: URLSearchParams) => {
    const params: Record<string, any> = {};

    for (const key of props.keys()) {
      if (key.endsWith('[]')) {
        params[key.replace('[]', '')] = props.getAll(key);
      } else {
        params[key] = props.get(key)!;
      }
    }

    return params;
  };

  return arrayFormat === 'bracket' ? arrayParams(searchParams) : Object.fromEntries(searchParams);
}

/**
 *
 * @param url
 */
export function useQueryString(url: Ref<string>, emit: any) {
  const state = reactive<QueryStringState>({
    query: {},
    rawUrl: url.value,
    originPath: '',
    indexToQueryKeyMap: new Map<number, string>(),
  });
  const urlRef = ref<Partial<URL>>({});
  const { updateIsEditingQuery, isEditingQuery } = inject<ProvideQueryState>(QUERY_STATE_KEY)!;

  const status = ref<QueryStatus[]>(Array.from({
    length: Object.keys(state.query).length,
  }).fill(QUERY_STATUS.PREVIEW) as QueryStatus[]);

  watchEffect(() => {
    const isEditing = status.value.includes(QUERY_STATUS.EDIT);
    updateIsEditingQuery(isEditing);
  });

  watch(url, (newValue) => {
    urlRef.value = createUrl(newValue);
    state.query = parse(urlRef.value.search ?? '');
  }, {
    immediate: true,
  });

  const originPath = computed(() => {
    if (!urlRef.value?.origin && !urlRef.value?.pathname) {
      return '';
    }

    return `${urlRef.value!.origin}${urlRef.value!.pathname}`;
  });

  watch(() => state.query, (newValue, oldValue) => {
    if (isObject(newValue) && isObject(oldValue) && Object.keys(newValue).length > 0 && Object.keys(oldValue!).length > 0 && isEditingQuery.value) {
      emit('query-changed', newValue, urlRef.value);
    }

    if (isObject(newValue)) {
      Object.keys(newValue).forEach((key, idx) => {
        state.indexToQueryKeyMap.set(idx, key);
      });
    }
  }, {
    deep: true,
    immediate: true,
  });

  return {
    ...toRefs(state),
    originPath,
    status,
  };
}
