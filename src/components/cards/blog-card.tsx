import React from 'react';
import GatsbyImage, { FluidObject } from 'gatsby-image';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import { theme } from '../layout/theme';
import { up } from '../breakpoint/breakpoint';
import { CardProps, CardWrapper, CardTitle, CardText } from './card';

type sizes = 'S' | 'L';

interface BlogCardProps extends CardProps {
  link: string;
  caption?: string;
  image?: boolean;
  placeholderImage?: FluidObject;
  size?: sizes;
}

const LinkWrapper = styled(Link)`
  text-decoration: none;
`;

const BlogCardWrapper = styled(CardWrapper)<{ image: boolean; size: sizes }>`
  padding: 24px;
  overflow: hidden;

  ${(props) =>
    props.image &&
    css`
      padding: 24px 16px;
    `}
`;

const BlogCardImage = styled(GatsbyImage)`
  width: calc(100% + 2 * 16px);
  margin: -24px -16px 0;
  margin-bottom: 24px;
`;

const BlogCardTitle = styled(CardTitle)<{ image: boolean; size: sizes }>`
  margin-bottom: 16px;
  font-size: 32px;

  ${BlogCardWrapper}:hover & {
    color: ${theme.palette.primary.main};
  }

  ${(props) =>
    props.size === 'L' &&
    css`
      ${up('md')} {
        margin-bottom: 12px;
        font-size: 48px;
      }
    `}

  ${(props) =>
    props.image &&
    css`
      margin-bottom: 8px;
      font-size: 20px;
    `}
    
  ${(props) =>
    props.size === 'L' &&
    props.image &&
    css`
      ${up('md')} {
        margin-bottom: 12px;
        font-size: 24px;
      }
    `}
`;

const BlogCardText = styled(CardText)<{ image: boolean; size: sizes }>`
  flex-grow: inherit;
  margin-bottom: 8px;

  ${BlogCardWrapper}:hover & {
    color: ${theme.palette.primary.main};
  }

  /* --- line-clipping --- */
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;

  ${(props) =>
    props.size === 'L' &&
    css`
      ${up('md')} {
        -webkit-line-clamp: 3;
      }
    `}
`;

const CardCaption = styled.p`
  margin: 0;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  color: rgba(32, 40, 64, 0.5);

  ${BlogCardWrapper}:hover & {
    color: ${theme.palette.primary.main};
  }
`;

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  text,
  link,
  caption = '',
  image,
  placeholderImage,
  size = 'S',
}) => {
  return (
    <BlogCardWrapper
      as={LinkWrapper}
      to={link}
      image={image ? 1 : 0}
      size={size}
      sm={6}
      md={size === 'S' ? 4 : 6}
    >
      {image && placeholderImage && (
        <BlogCardImage
          fluid={{
            ...placeholderImage,
            aspectRatio: size === 'S' ? 1.56 : 1.714,
          }}
        />
      )}

      <BlogCardTitle image={Boolean(image)} size={size}>
        {title}
      </BlogCardTitle>

      {text.length > 0 && (
        <BlogCardText image={Boolean(image)} size={size}>
          {text}
        </BlogCardText>
      )}

      {caption && <CardCaption>{caption}</CardCaption>}
    </BlogCardWrapper>
  );
};
