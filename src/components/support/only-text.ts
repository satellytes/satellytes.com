/**
 * cherry picked from the react-children-utilities
 * via https://github.com/fernandopasik/react-children-utilities/blob/7663b272de707ed11d4d9ad357a2bfb14805da39/src/lib/onlyText.ts
 */
import type { ReactElement, ReactNode } from 'react';
import { Children, isValidElement } from 'react';

const hasChildren = (
  element: ReactNode,
): element is ReactElement<{ children: ReactNode | ReactNode[] }> =>
  isValidElement<{ children?: ReactNode[] }>(element) &&
  Boolean(element.props.children);

const childToString = (child?: ReactNode): string => {
  if (
    typeof child === 'undefined' ||
    child === null ||
    typeof child === 'boolean'
  ) {
    return '';
  }

  if (JSON.stringify(child) === '{}') {
    return '';
  }

  return (child as number | string).toString();
};

export const onlyText = (children: ReactNode | ReactNode[]): string => {
  if (!(children instanceof Array) && !isValidElement(children)) {
    return childToString(children);
  }

  return Children.toArray(children).reduce(
    (text: string, child: ReactNode): string => {
      let newText = '';

      if (isValidElement(child) && hasChildren(child)) {
        newText = onlyText(child.props.children);
      } else if (isValidElement(child) && !hasChildren(child)) {
        newText = '';
      } else {
        newText = childToString(child);
      }

      return text.concat(newText);
    },
    '',
  );
};
