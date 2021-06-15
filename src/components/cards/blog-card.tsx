import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../layout/theme';
import { up } from '../breakpoint/breakpoint';
import { CardProps, CardWrapper, CardTitle, CardText } from './card';
import { Link } from '../links/links';
import {
  GatsbyImage,
  GatsbyImageProps,
  IGatsbyImageData,
} from 'gatsby-plugin-image';

interface BlogCardProps extends CardProps {
  link: string;
  caption?: string;
  image?: IGatsbyImageData;
  large?: boolean;
}

const BlogCardWrapper = styled(CardWrapper)<{ $image: boolean }>`
  padding: 24px;
  overflow: hidden;

  ${(props) =>
    props.$image &&
    css`
      padding: 24px 16px;
    `}
`;

const BlogCardImage = styled(GatsbyImage)<GatsbyImageProps>`
  width: calc(100% + 2 * 16px);
  margin: -24px -16px 24px;
`;

const BlogCardTitle = styled(CardTitle)<{ $image: boolean; large: boolean }>`
  margin-bottom: 16px;
  font-size: 32px;

  transition: color 0.3s;
  ${BlogCardWrapper}:hover & {
    color: ${theme.palette.primary.main};
  }

  ${(props) =>
    props.large &&
    css`
      ${up('md')} {
        margin-bottom: 12px;
        font-size: 48px;
      }
    `}

  ${(props) =>
    props.$image &&
    css`
      margin-bottom: 8px;
      font-size: 20px;
    `}
    
  ${(props) =>
    props.large &&
    props.$image &&
    css`
      ${up('md')} {
        margin-bottom: 12px;
        font-size: 24px;
      }
    `}
`;

const BlogCardText = styled(CardText)<{ large: boolean }>`
  flex-grow: inherit;
  margin-bottom: 8px;

  transition: color 0.3s;
  ${BlogCardWrapper}:hover & {
    color: ${theme.palette.primary.main};
  }
`;

const CardCaption = styled.p`
  margin: 0;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  color: rgba(32, 40, 64, 0.5);
`;

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  text,
  link,
  caption = '',
  image,
  large = false,
}) => {
  return (
    <BlogCardWrapper
      as={Link}
      to={link}
      $image={Boolean(image)}
      sm={6}
      md={large ? 6 : 4}
    >
      {image && <BlogCardImage alt="" image={image} />}

      <BlogCardTitle $image={Boolean(image)} large={Boolean(large)}>
        {title}
      </BlogCardTitle>

      {text.length > 0 && (
        <BlogCardText large={Boolean(large)}>{text}</BlogCardText>
      )}

      {caption && <CardCaption>{caption}</CardCaption>}
    </BlogCardWrapper>
  );
};
