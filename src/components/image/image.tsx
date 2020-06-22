import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

interface ImageProps {
  imageName: string;
  alt: string;
}

const Image: React.FC<ImageProps> = ({ alt, imageName }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const image = data.images.edges.find((element) => {
        return element.node.relativePath.includes(imageName);
      });
      if (!image) {
        return null;
      }

      return (
        <Img
          alt={alt}
          sizes={{
            ...image.node.childImageSharp.fluid,
            aspectRatio: 1 / 1,
          }}
        />
      );
    }}
  />
);

export default Image;
