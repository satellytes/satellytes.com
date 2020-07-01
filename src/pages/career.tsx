import React from 'react';
import styled from 'styled-components';

import SEO from '../components/seo';
import Layout from '../components/layout/layout';
import { theme } from '../components/layout/theme';
import { up } from '../components/breakpoint/breakpoint';
import {
  PageTitle,
  LargeText,
  Text,
  SubTitle as TypoSubTitle,
} from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { CareerGrid } from '../components/card-grids/career-grid';

const SubTitle = styled(TypoSubTitle)`
  margin: 80px 0 40px;

  ${up('md')} {
    margin: 160px 0 40px;
  }
`;

const Note = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 110%;
  letter-spacing: -0.15px;
  color: #202840;
`;

const StyledText = styled(Text)`
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const StyledLink = styled.a`
  color: ${theme.palette.text.darkLinkColor.default};
  text-decoration: none;

  &:hover {
    color: ${theme.palette.text.darkLinkColor.hover};
  }
`;

const CareerPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Career" />
      <Grid center>
        <GridItem md={8}>
          <PageTitle>Career</PageTitle>
          <LargeText>
            It’s not a job you do, it’s a career your choose.
          </LargeText>
          <StyledText>
            Satellytes bewirbt sich bei dir. Wir sind Geeks, die das was sie
            tun, richtig gut und gerne tun, aber noch viel lieber
            weitervermitteln. Denn zusammen schaffen wir mehr. Wir wollen mit
            dir arbeiten – egal ob Junior oder Senior – und unser Wissen und
            unsere Jahrzehnte an Erfahrung an dich weitergeben. Das Wichtigste
            was du mitbringen musst: Neugier und Leidenschaft für die Sache —
            den Rest machen wir zusammen.
          </StyledText>
          <StyledText>
            Bewirb dich jetzt bei uns als UI- und/oder UX-Designer, Frontend-
            oder Backend-Developer. Deine Ausbildung ist sekundär, wenn du eine
            schnelle Auffassungsgabe hast, sympathisch bist und einfach richtig
            Bock hast.
          </StyledText>
        </GridItem>
      </Grid>
      <Grid center>
        <GridItem xs={12}>
          <SubTitle as="h2">Opportunities</SubTitle>
        </GridItem>

        <GridItem xs={12}>
          <CareerGrid careerData={careerData} />
        </GridItem>

        <GridItem xs={12}>
          <Note>
            Oder schicke deine Bewerbung an:{' '}
            {/* TODO: clarify, what actually needs to happen here */}
            <StyledLink href="#">team@satellytes.com</StyledLink>
          </Note>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default CareerPage;

// TODO: proper data handling
const careerData = [
  {
    role: 'Junior UI Designer',
    description:
      'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna.',
    link: '/career',
  },
  {
    role: 'Senior Frontend–Developer',
    description:
      'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna.',
    link: '/career',
  },
  {
    role: 'Junior UI Designer',
    description:
      'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna.',
    link: '/career',
  },
  {
    role: 'UX Designers All levels',
    description:
      'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna.',
    link: '/career',
  },
  {
    role: 'Junior Backend-Developer',
    description:
      'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna.',
    link: '/career',
  },
  {
    role: 'UX Designers All levels',
    description:
      'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna.',
    link: '/career',
  },
];
