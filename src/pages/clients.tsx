import React from 'react';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import {
  CaptionText,
  PageTitle,
  LargeText,
} from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import ImageCard from '../components/image-card/image-card';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import { InternalLink } from '../components/links/internal-link';

const ImageCardGrid = styled(Grid)`
  grid-column-gap: 24px;
  margin-top: 40px;

  ${up('md')} {
    margin-top: 80px;
  }
`;

const ClientsPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Clients" />
      <Grid>
        <GridItem xs={12} md={8}>
          <PageTitle>Clients</PageTitle>
          <LargeText>
            We are showing clients not projects since we are aiming for long
            term relationships.
          </LargeText>
          <LargeText>
            For all of the listed clients, we have done or are still doing
            (major parts of) their web applications.
          </LargeText>
          <CaptionText>Not just a set of banners or a microsite.</CaptionText>
        </GridItem>
      </Grid>
      <ImageCardGrid>
        <GridItem xs={12} sm={4}>
          <InternalLink to="/">
            <ImageCard
              alt="Lewandowski"
              imageName="lewandowski.png"
              title="Client One"
              largeTitle
            />
          </InternalLink>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <InternalLink to="/">
            <ImageCard
              alt="Lewandowski"
              imageName="lewandowski.png"
              title="Client Two"
              largeTitle
            />
          </InternalLink>
        </GridItem>
        <GridItem xs={12} sm={4}></GridItem>
        <GridItem xs={12} sm={4}></GridItem>
        <GridItem xs={12} sm={4}>
          <InternalLink to="/">
            <ImageCard
              alt="Lewandowski"
              imageName="lewandowski.png"
              title="Client Three"
              largeTitle
            />
          </InternalLink>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <InternalLink to="/">
            <ImageCard
              alt="Lewandowski"
              imageName="lewandowski.png"
              title="Client Four"
              largeTitle
            />
          </InternalLink>
        </GridItem>
        <GridItem xs={12} sm={4}>
          <InternalLink to="/">
            <ImageCard
              alt="Lewandowski"
              imageName="lewandowski.png"
              title="Client Five"
              largeTitle
            />
          </InternalLink>
        </GridItem>
      </ImageCardGrid>
    </Layout>
  );
};

export default ClientsPage;
