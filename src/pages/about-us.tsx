import { graphql, PageProps } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';
import SEO from '../components/layout/seo';
import { AboutUsPage } from '../components/pages/about-us/about-us-page';
import { SyTeamMember } from '../types';

interface AboutUsQueryProps {
  allContentfulTeamMember: {
    nodes: SyTeamMember[];
  };
}

const AboutUs = (props: PageProps<AboutUsQueryProps>) => {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title={`${t('about-us.title')} | Satellytes`}
        location={props.location}
      />
      <AboutUsPage team={props.data.allContentfulTeamMember.nodes} />
    </>
  );
};

export default AboutUs;
export const AboutUsPageQuery = graphql`
  query ($language: String!) {
    allContentfulTeamMember(filter: { node_locale: { eq: "en" } }) {
      nodes {
        id
        name
        image {
          gatsbyImageData(
            width: 400
            aspectRatio: 1
            layout: CONSTRAINED
            placeholder: DOMINANT_COLOR
            formats: [AUTO, WEBP, AVIF]
            cropFocus: FACE
            resizingBehavior: FILL
            jpegProgressive: false
          )
        }
      }
    }

    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
