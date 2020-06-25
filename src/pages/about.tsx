import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import {
  PageTitle,
  SubTitle,
  Text,
  LargeText,
  TextTitle,
} from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import TeamMemberImageGrid from '../components/image-grids/team-member-image-grid';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';

const AboutSubTitle = styled(SubTitle)`
  margin-top: 80px;
  margin-bottom: 40px;

  ${up('md')} {
    margin-top: 160px;
  }
`;

const AboutPage: React.FC = () => {
  const data = useStaticQuery(query);

  return (
    <Layout>
      <SEO title="About" />
      <Grid>
        <GridItem xs={12} md={8}>
          <PageTitle>About us</PageTitle>
          <LargeText>
            We are a growing bunch of passionate geeks with the highest
            ambitions
          </LargeText>
          <AboutSubTitle>Thinking</AboutSubTitle>
        </GridItem>
      </Grid>
      <Grid>
        <GridItem xs={12} sm={6} md={4}>
          <TextTitle>Transparent</TextTitle>
          <Text>
            Viele Agenturen schicken ihre besten Leute zum Kunden, im
            Hintergrund arbeiten aber dann ganz andere. Nicht bei uns: Die
            Leute, die sie kennenlernen, sind auch Ihr Team.
          </Text>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <TextTitle>Individuell & effizient</TextTitle>
          <Text>
            Wir empfehlen Ihnen die Lösung, die für Ihr Unternehmen und für Ihre
            Nutzer am sinnvollsten ist – nicht das, was wir am besten verkaufen
            können, weil wir es schon in der Schublade haben. Trotzdem versuchen
            wir immer einen möglichst wirtschaftlichen Weg zu finden, Ihr
            Projekt zu realisieren.
          </Text>
        </GridItem>
        <GridItem xs={0} md={4} />
        <GridItem xs={12} sm={6} md={4}>
          <TextTitle>Nachhaltig</TextTitle>
          <Text>
            Seien Sie sicher, dass es unser oberstes Ziel ist, fehlerfreie und
            sicherste Services zu realisieren, die nicht in einem Jahr schon
            wieder überholt werden müssen. Dazu testen wir jeden neuen
            Prototypen und Release und dokumentieren und veröffentlichen dann
            stets alles in wiederverwendbaren und erweiterbaren Pattern
            Libraries.
          </Text>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <TextTitle>Up to date</TextTitle>
          <Text>
            Wir wissen was geht. Wir kennen jeden neuen Trend, jedes neue Tool
            und Framework. Wir arbeiten immer nach den neusten Standards und
            stellen trotzdem gleichzeitig sicher, dass alle Ihre Kunden mit
            jedem ihrer Endgeräte das bestmögliche Nutzererlebnis haben.
          </Text>
        </GridItem>
        <GridItem xs={12} md={8}>
          <AboutSubTitle>Team</AboutSubTitle>
        </GridItem>
      </Grid>
      <TeamMemberImageGrid
        teamMembers={teamMemberData}
        imagePlaceholder={data.imagePlaceholder.childImageSharp.fluid}
      />
    </Layout>
  );
};

export default AboutPage;

// TODO: where should we put this data?
const teamMemberData = [
  {
    name: 'Gholam Abdol',
    role: 'CEO, Partner',
    links: [
      { title: 'LinkedIn', url: 'https://de.linkedin.com/' },
      { title: 'XING', url: 'https://www.xing.com' },
    ],
  },
  {
    name: 'Eric Singhartinger',
    role: 'CEO, CXO, Partner',
    links: [{ title: 'LinkedIn', url: 'https://de.linkedin.com/' }],
  },
  {
    name: 'Georgios Kaleadis',
    role: 'CTO, Partner',
    links: [
      { title: 'LinkedIn', url: 'https://de.linkedin.com/' },
      { title: 'XING', url: 'https://www.xing.com' },
      { title: 'GitHub', url: 'https://www.github.com' },
    ],
  },
  { name: 'Mark Altmann', role: 'Backend' },
  {
    name: 'Kateryna Bugaieva',
    role: 'Frontend',
    links: [
      { title: 'LinkedIn', url: 'https://de.linkedin.com/' },
      { title: 'XING', url: 'https://www.xing.com' },
      { title: 'GitHub', url: 'https://www.github.com' },
      { title: 'Twitter', url: 'https://www.twitter.com' },
    ],
  },
  { name: 'Fabian Dietenberger', role: 'Fullstack' },
  { name: 'Arthur Erdös', role: 'Backend' },
  { name: 'Klara Fleischmann', role: 'Frontend' },
  { name: 'Felix Hamann', role: 'Frontend' },
  { name: 'Pavel Katkov', role: 'Frontend' },
  { name: 'Leif Lampater', role: 'Frontend' },
  { name: 'Verena May', role: 'UX/UI' },
  { name: 'Erin McGrath', role: 'Frontend' },
  { name: 'Christian Ott', role: 'Backend' },
  { name: 'Mauro Pereira', role: 'Frontend' },
];

const query = graphql`
  query {
    imagePlaceholder: file(relativePath: { regex: "/astronaut/" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
