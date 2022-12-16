export function getElementIndexFromParent(element: HTMLElement) {
  return [...element.parentNode!.children].indexOf(element);
}
