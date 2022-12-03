import { Ref, unref } from 'vue';

interface UseCopyOptions {
    format: 'none' | 'JSON'
}

export function useCopy<T>(text: T | Ref<T>, options?: UseCopyOptions) {
  const defaultOptions: UseCopyOptions = {
    format: 'none',
  };

  const currentOptions = {
    ...defaultOptions,
    ...options,
  };
  const copied = ref<boolean>(false);

  const writeTextToClipboard = async (text: T, options: {
        format: 'none' | 'JSON'
      } = {
    format: 'none',
  }) => {
    const { format = 'none' } = options;

    const _text = (format !== 'JSON' ? text : JSON.stringify(text, undefined, '\t')) as string;

    const res = await (navigator?.permissions?.query as any)({ name: 'clipboard-write' });
    if (res?.state === 'granted') {
      await navigator.clipboard.writeText(_text);
      return;
    }

    // 降级
    const input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', _text);
    document.body.appendChild(input);
    input.select();
    // for ios
    input.setSelectionRange(0, 9999);
    if (document.execCommand('copy'))
      document.execCommand('copy');

    document.body.removeChild(input);
  };

  const startCopy = async () => {
    if (copied.value === true) return;
    await writeTextToClipboard(unref<T>(text), currentOptions);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 3000);
  };

  return {
    copied,
    startCopy,
  };
}
