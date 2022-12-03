import { definePropType } from '~~/utils';
import { Arrayable } from '~~/types/utils';
import { generateId } from '~~/utils/random';

export type CollapseActiveName = string | number

export type CollapseModelValue = Arrayable<CollapseActiveName>

export const collapseProps = {
  modelValue: {
    type: definePropType<CollapseActiveName[]>([Array, String, Number]),
    default: () => [],
  },
};

export const collapseItemProps = {
  name: {
    type: definePropType<CollapseActiveName>([String, Number]),
    default: () => generateId(),
  },
};

export const collapseContextKey = Symbol('collapseCtxKey');
