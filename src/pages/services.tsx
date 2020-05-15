import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import {
  PageTitle,
  CaptionText,
  LargeText,
  SubTitle,
} from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import ServicesTabs from '../components/tabs/services-tabs';

const ServicesSectionTitle = styled(SubTitle)`
  margin-top: 80px;

  ${up('md')} {
    margin-top: 160px;
  }
`;

const OthersCaptionText = styled(CaptionText)`
  margin-top: -16px;
  margin-bottom: 32px;

  ${up('md')} {
    margin-top: -24px;
    margin-bottom: 40px;
  }
`;

const ServicesPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Services" />
      <Grid>
        <GridItem>
          <PageTitle>Services</PageTitle>
        </GridItem>
        <GridItem xs={12} md={8}>
          <LargeText>
            We are not doing wordpress websites fire and forget style, but
            enterprise size projects, with a state of the interface and tech
            stack.
          </LargeText>
          <LargeText>
            We are really good at creating design systems for complex web
            applications and self-testing, high performance pattern libraries.
          </LargeText>
          <CaptionText>
            By the way: That’s what we also do with our employees. Apply
          </CaptionText>
          <ServicesSectionTitle>
            Here is a list of stuff we are really good at:
          </ServicesSectionTitle>
          <ServicesTabs />
          <ServicesSectionTitle>
            And that’s where others are way better:
          </ServicesSectionTitle>
          <LargeText>
            Marketing, Texting, Photoshopping, Illustrating just to name a few
            ...
          </LargeText>
          <OthersCaptionText>
            but boy are we good at networking and collaborating. We can get the
            right people for you into the team.
          </OthersCaptionText>
          <div>TODO: ImageGrid</div>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default ServicesPage;
