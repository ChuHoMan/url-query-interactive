import { watch, reactive, toRefs } from "vue"
import { parse } from 'query-string'
import type { ParsedQuery } from 'query-string'

function createUrl(url: string): Partial<URL> {
    try {
        return new URL(url)
    } catch(e) {
        return {}
    }
}

/**
 * 
 * @param url 
 */
export function useQueryString(url: string) {
    const state = reactive<Record<string, ParsedQuery<string> | string>>({
        hash: '',
        query: '',
        rawUrl: url,
        originPath: ''
    })
    const urlRef = ref<Partial<URL>>({})

    watch(url, (newValue) => {
       urlRef.value = createUrl(newValue)
       state.query = parse(urlRef.value.search || '')
       state.hash = parse(urlRef.value.hash || '')
    }, {
        immediate: true
    })

    const originPath = computed(() => {
        if(!urlRef.value?.origin && !urlRef.value?.pathname) {
            return ''
        }
        return `${urlRef.value!.origin}${urlRef.value!.pathname}`
    })

    return {
        ...toRefs(state),
        originPath
    }
}