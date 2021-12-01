import React from 'react';
import styled from 'styled-components';
import { TextStyles } from '../../components/typography/typography-v2';
import { IllustrationType } from '../../components/illustration/illustration-set';
import {
  Illustration,
  IllustrationSize,
} from '../../components/illustration/illustration';
import { up } from '../../components/breakpoint/breakpoint';

interface BlogHeaderProps {
  /**
   * A short label above the headline
   */
  kicker?: string;
  /**
   * The headline for the given blog post
   */
  headline: string;
  /**
   * Display one of our illustration side by side with the given content
   */
  illustration?: IllustrationType;
  /**
   * The actual content
   */
  children?: React.ReactNode;
}

const KickerStyled = styled.span`
  ${TextStyles.toplineR}
  display: block;
  color: #3e61ee;
  margin-bottom: 16px;
`;

const HeadlineStyled = styled.h1`
  ${TextStyles.headlineXL}
  margin: 0;
  color: #202840;
  margin-bottom: 24px;

  ${up('md')} {
    margin-bottom: 32px;
  }
`;

const IllustrationStyled = styled(Illustration)`
  margin-left: auto;

  ${up('md')} {
    order: 1;
    margin-left: auto;
    flex: 0 0 auto;
    padding-left: 100px;
  }
`;

const TextContent = styled.div`
  ${up('md')} {
    order: 0;
  }
`;

const Layout = styled.div`
  ${up('md')} {
    display: flex;
  }
`;

export const SectionHeader = (props: BlogHeaderProps) => {
  return (
    <Layout>
      {props.illustration && (
        <IllustrationStyled
          size={IllustrationSize.LARGE}
          show={props.illustration}
        />
      )}
      <TextContent>
        {props.kicker && <KickerStyled>{props.kicker}</KickerStyled>}
        <HeadlineStyled>{props.headline}</HeadlineStyled>
        {props.children}
      </TextContent>
    </Layout>
  );
};
