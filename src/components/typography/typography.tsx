import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';

export const PageTitle = styled.h1`
  color: #668cff;
  font-size: 48px;
  line-height: 110%;

  margin-top: 96px;
  margin-bottom: 40px;

  ${up('md')} {
    font-size: 72px;
    margin-top: 192px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 48px;
  line-height: 110%;

  ${up('md')} {
    font-size: 72px;
  }
`;

export const SubTitle = styled.h3`
  font-size: 32px;
  line-height: 110%;

  ${up('md')} {
    font-size: 48px;
  }
`;

export const Text = styled.p`
  font-size: 16px;
  line-height: 150%;

  margin-bottom: 16px;
`;

export const TitleText = styled.p`
  font-size: 24px;
  line-height: 110%;
  font-weight: bold;

  margin-top: 0;
  margin-bottom: 40px;

  ${up('md')} {
    font-size: 32px;
  }
`;

export const CaptionText = styled.p`
  font-size: 12px;
  line-height: 110%;
  font-weight: bold;

  color: rgba(32, 40, 64, 0.5);
`;
