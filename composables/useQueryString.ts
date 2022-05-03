import { reactive, toRefs } from "vue"
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

    const urlRef = reactive<Partial<URL>>(createUrl(url))

    state.query = parse(urlRef.search || '')
    state.hash = parse(urlRef.hash || '')
    const originPath = computed(() => {
        if(!urlRef?.origin && !urlRef?.pathname) {
            return ''
        }
        return urlRef!.origin + urlRef!.pathname
    })

    return {
        ...toRefs(state),
        originPath
    }
}