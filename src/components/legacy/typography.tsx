import React from 'react';
import styled from 'styled-components';
import { theme } from '../layout/theme';
import { Link } from './links/links';

export const SubTitle = styled.h3`
  font-size: 36px;
  line-height: 110%;

  margin-top: 80px;
  margin-bottom: 16px;
`;

export const TextTitle = styled.h4`
  font-size: 28px;
  line-height: 110%;

  margin-top: 80px;
  margin-bottom: 16px;
`;

export const SmallTitle = styled.h5`
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 110%;

  margin: 80px 0 16px;
`;

/**
 *
 * Text
 *
 */
export const Text = styled.p`
  font-size: 16px;
  line-height: 150%;

  margin-top: 0;
  margin-bottom: 16px;

  white-space: pre-wrap;
`;
