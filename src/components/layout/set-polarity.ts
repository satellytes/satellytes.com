const POLARITY_PREFIX = `sy-polarity--`;

export enum POLARITY {
  DARK = 'dark',
  LIGHT = 'light',
}

export function setPolarityBodyClass(isLight: boolean) {
  const classNameDark = `${POLARITY_PREFIX}${POLARITY.DARK}`;
  const classNameLight = `${POLARITY_PREFIX}${POLARITY.LIGHT}`;

  const noBrowser = typeof window === 'undefined';

  if (noBrowser) {
    return;
  }

  if (isLight) {
    document.body.classList.remove(classNameDark);
    document.body.classList.add(classNameLight);
  } else {
    document.body.classList.remove(classNameLight);
    document.body.classList.add(classNameDark);
  }
}
