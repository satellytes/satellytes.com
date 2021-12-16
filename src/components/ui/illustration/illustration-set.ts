import * as LIST from './illustration-files';
export default LIST;

/**
 * This file makes the given set of svg files available
 * to the codebase and helps separating the raw list of imported files
 * from the actual typing efforts here.
 */
export type IllustrationType = keyof typeof LIST;
export const ILLUSTRATION_NAMES = Object.keys(LIST) as IllustrationType[];
