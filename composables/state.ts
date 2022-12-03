import { computed } from 'vue';
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router';

let route: RouteLocationNormalizedLoaded | undefined;
let router: Router | undefined;

export const computedInputModel = computed<string>({
  get() {
    if (!route)
      route = useRoute();

    const data = route.query.s;
    if (data == null)
      return '';
    if (Array.isArray(data)) // 相同 query 只取第一个
      return decodeURIComponent(data[0] as string);
    return decodeURIComponent(data);
  },
  set(v) {
    if (!route || !router) {
      router = useRouter();
      route = useRoute();
    }
    nextTick(() => {
        router!.replace({ query: { ...route!.query, s: v === '' ? undefined : encodeURIComponent(v as string) } });
    });
  },
});
