import * as LIST from './illustration-files';
export default LIST;

/**
 * This file makes the given set of svg files available
 * to the codebase.
 */
export type IllustrationType = keyof typeof LIST;
export const ILLUSTRATION_NAMES = Object.keys(LIST) as IllustrationType[];
