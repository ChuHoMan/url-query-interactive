export const QUERY_STATUS = {
  PREVIEW: 'preview',
  EDIT: 'edit',
} as const;

export type QueryStatus = Lowercase<
  UnderlineToDashed<keyof typeof QUERY_STATUS>
>
