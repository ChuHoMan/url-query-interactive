import { isObject } from '@/utils';

export interface FetchJSONOptions {
    /**
     * 模块名
     */
    module: string
    /**
     * 页面名
     */
    page: string
}

interface CommoentBlockTag {
  tag: '@default' | '@see' | '@paramSource' | '@desc'
  text: string
}
interface ParsedJSONCommonet {
  /**
   * 总体描述
   */
  summaryText?: string
  /**
   * 标签
   */
   blockTags?: CommoentBlockTag[]
}

interface ParsedJSONMember {
    /**
     * 属性名
     */
    key: string
    /**
     * 类型
     */
    type: string
    /**
     * 是否可选
     */
    isOptional: boolean
    /**
     * 注释
     */
    commonets: ParsedJSONCommonet
}

export interface ParsedJSON {
    /**
     *
     */
     kindString: 'interface'
    /**
     * 总体描述
     */
    summaryText?: string
    /**
     * 注释
     */
    children: ParsedJSONMember[]
}

function checkJSONValidity(raw: Record<string, any>) {
  if (raw.kindString !== 'Project')
    throw new Error(`not valid json, kindString: ${raw.kindString}`);

  if (!~(raw.children as Record<string, any>[])?.findIndex(item => item.name === 'default'))
    throw new Error('can not find default export, reupload your json');

  return true;
}

function parseComment(node: Record<string, any>) {
  const commentResult: ParsedJSONCommonet = {
    summaryText: node?.summary?.text ?? '',
    blockTags: [],
  };

  if (Array.isArray(node?.blockTags)) {
    for (const blockTag of node?.blockTags) {
      const { tag, content = [] } = blockTag;

      commentResult.blockTags?.push({
        tag,
        text: (content as Record<string, any>[]).find(c => c.kind === 'text')?.text || '',
      });
    }
  }
  return commentResult;
}

function traveseChildren(nodes: Record<string, any>[]) {
  const resolvedChildren: ParsedJSON['children'] = [];
  for (const node of nodes) {
    resolvedChildren.push({
      key: node.name,
      type: node.type?.name || 'unknown',
      isOptional: node.flags?.isOptional ?? false,
      commonets: parseComment(node.comment ?? {}),
    });
  }
  return resolvedChildren;
}

/**
 * 解析 schema 返回对象
 */
export function useTypeToJSON() {
  // TODO 完善类型
  function parseJSON(raw: Record<string, any>) {
    if (!isObject(raw)) throw new Error(`json not a object, can not parse: ${raw}`);

    if (!checkJSONValidity(raw))
      return {};

    const defaultExportJSON = (raw.children as Record<string, any>[])!.find(item => item.name === 'default')!;
    const parsedJSON: ParsedJSON = {
      kindString: defaultExportJSON.kindString,
      summaryText: defaultExportJSON.comment?.summary?.[0].text || '',
      children: traveseChildren(defaultExportJSON.children),
    };

    return parsedJSON;
  }

  async function fetchJSON(options: FetchJSONOptions) {
    const { module = '', page = '' } = options;
    // TODO fetch remote json
    const rawJson = await (await import('../static/interface.json')).default;
    try {
      return parseJSON(rawJson);
    }
    catch (e) {
      console.error('[parsed error]', (e as any).message);
    }
  }

  return {
    fetchJSON,
  };
}
