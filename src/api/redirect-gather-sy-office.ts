import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';

const GATHER_URL = `https://gather.town/app/ea0xvXaHYWuWurME/satellytes`;

/*
Provide an endpoint to redirect to our gather space. 
 */
export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse,
) {
  return res.redirect(GATHER_URL);
}
