import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Layout } from '../../layout/layout';
import { LeadboxProps } from '../../content/leadbox/leadbox';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { Office } from './office';
import { Team } from './team';
import { SyTeamMember } from '../../../types';
import { Hero } from '../../content/heroes/support';

interface AboutUsPageProps {
  team: SyTeamMember[];
}

export const AboutUsPage = (props: AboutUsPageProps) => {
  const { t } = useTranslation();

  const leadbox: LeadboxProps = {
    illustration: 'astronaut_020',
    title: t('about-us.leadbox.title'),
    link: {
      title: t('about-us.leadbox.link'),
      href: '/career',
    },
  };

  return (
    <Layout
      transparentHeader={true}
      light={true}
      leadbox={leadbox}
      hero={<Hero title={t<string>('about-us.title')} />}
    >
      <ContentBlockContainer>
        <Team team={props.team} />
      </ContentBlockContainer>

      <ContentBlockContainer>
        <Office />
      </ContentBlockContainer>
    </Layout>
  );
};
