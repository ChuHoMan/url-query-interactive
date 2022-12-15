import { Ref } from 'vue';

export interface ProvideQueryState {
    isEditingQuery: Ref<boolean>
    updateIsEditingQuery(val: boolean): void

    selectedQueryItems: Ref<HTMLElement[]>
    clearAllSelectedQueryItems(): void
}
