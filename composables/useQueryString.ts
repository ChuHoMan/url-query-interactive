import { watch, reactive, toRefs, Ref } from "vue"

interface QueryStringState {
    query: Record<string, string>,
    rawUrl: string,
    originPath: string
}

function createUrl(url: string): Partial<URL> {
    try {
        return new URL(url)
    } catch(e) {
        return {}
    }
}

function parse(params: string, options: {
    arrayFormat: 'none' | 'bracket'
} = {
    arrayFormat: 'none'
}) {
    const searchParams = new URLSearchParams(params)
    const { arrayFormat } = options

    const arrayParams = (props : URLSearchParams) => {
        const params: Record<string, any> = {}

        for(const key of props.keys()) {
            if(key.endsWith('[]'))  params[key.replace('[]', '')] = props.getAll(key);
            else params[key] = props.get(key)!
        }

        return params
    }

    return arrayFormat === 'bracket' ? arrayParams(searchParams) : Object.fromEntries(searchParams)
}

/**
 * 
 * @param url 
 */
export function useQueryString(url: Ref<string>) {
    const state = reactive<QueryStringState>({
        query: {},
        rawUrl: url.value,
        originPath: ''
    })
    const urlRef = ref<Partial<URL>>({})

    watch(url, (newValue) => {
       urlRef.value = createUrl(newValue)
       state.query = parse(urlRef.value.search ?? '')
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