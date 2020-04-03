import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { Grid, GridItem } from '../components/grid/grid';

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Home" />
    <Grid>
      <GridItem md={2} />
      <GridItem md={8}>
        <h2>
          <div>Full Stack</div>
          <div>Digital Service</div>
          <div>Agency</div>
        </h2>
        <p>We offer only what we are truly great at</p>
        <div>
          <div>Service</div>
          <div>Full Stack</div>
          <div>
            Satellytes ist eine Digital-Agentur, die um große Unternehmen kreist
            und ihnen bei der Transformation und Optimierung digitaler Services
            und Interfaces hilft. Wir bieten „Full Stack“ an, also den gesamten
            Prozess von Ideation bis zur Implementierung des letzten
            performanten Funnels und der letzten Zeile wunderschönen Codes.
          </div>
          <button>All Services</button>
        </div>
        <p>We are into relationships, not one-night-stands.</p>
      </GridItem>
      <GridItem md={2} />
    </Grid>
  </Layout>
);

export default IndexPage;
