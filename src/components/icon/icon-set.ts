import * as LIST from './icon-files';
export default LIST;

export type IconType = keyof typeof LIST;
export const ICON_NAMES = Object.keys(LIST) as IconType[];
