import * as LIST from './logo-files';
export default LIST;

export type CustomerLogoType = keyof typeof LIST;
export const CUSTOMER_LOGO_NAMES = Object.keys(LIST) as CustomerLogoType[];
