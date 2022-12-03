export const commoentBlockTagsMapping = new Map([
  ['source', '来源'],
  ['case', '历史 case'],
  ['desc', '含义'],
  ['default', '默认值'],
]);

export const getPreviewTagName = (tag: string) => {
  let _tag = tag;
  if (tag.startsWith('@'))
    _tag = tag.slice(1);

  return commoentBlockTagsMapping.get(_tag) ?? _tag;
};
