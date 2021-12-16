import React from 'react';
import styled from 'styled-components';
import { TextStyles } from '../../components/typography/typography-v2';
import { theme } from '../layout/theme';
import { Link, LinkButton } from '../../components/links/links';
import { up } from '../../components/style-utils/breakpoint';
import {
  Illustration,
  IllustrationSize,
} from '../../components/illustration/illustration';
import { IllustrationType } from '../../components/illustration/illustration-set';

export interface LeadContact {
  headline: string;
  title: string;
  email: string;
}

export interface LeadLink {
  title: string;
  href: string;
}

export interface LeadboxProps {
  title: string;
  illustration: IllustrationType;
  contact?: LeadContact;
  link?: LeadLink;
}

const Layout = styled.div`
  background-color: ${theme.palette.background.leadbox};
  color: ${theme.palette.text.default};

  margin-top: 80px;
  position: relative;

  padding: 120px 0;

  ${up('md')} {
    padding: 80px 0;
  }
`;
/**
 * Workaround for the legacy layout. We should not include all that margin & padding
 * within the leadbox component and rather provide a proper place in the layout.
 * Until being addressed we can use this Container to bleed into the footer
 * to create the illlusion that the footer floats over the leadbox.
 *
 * Without this container you will get undesired gaps in the backgrounnd.
 */
export const LeadboxFooterContainer = styled.div`
  background-color: ${theme.palette.background.leadbox};
  margin-top: 120px;
  padding-bottom: 380px;
  margin-bottom: -380px;

  ${up('md')} {
    margin-bottom: -420px;
  }

  ${Layout} {
    //restore the bleeding into the content
    margin-top: -72px;
  }
`;

const Content = styled.div`
  max-width: 320px;
  margin: auto;
  text-align: center;
`;

const Headline = styled.h2`
  ${TextStyles.headlineM}
  margin-bottom: 24px;
`;

const IllustrationStyled = styled(Illustration)`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  ${up('md')} {
    left: 108px;
    transform: translateY(-50%);
  }
`;

const ContactHeadline = styled.h3`
  ${TextStyles.textS}
  margin: 0;
  font-weight: bold;
`;

const ContactTitle = styled.p`
  ${TextStyles.textXS}
  margin: 0;
`;

const ContactMail = styled(Link)`
  ${TextStyles.textS}
  color: ${theme.palette.text.link.default};

  &:hover {
    border-bottom: 1px solid ${theme.palette.text.link.default};
  }
`;

interface LeadContactProps {
  contact: LeadContact;
}

const LeadContact = ({ contact }: LeadContactProps) => {
  return (
    <div>
      <ContactHeadline>{contact.headline}</ContactHeadline>
      <ContactTitle>{contact.title}</ContactTitle>
      <ContactMail to={`mailto:${contact.email}`}>{contact.email}</ContactMail>
    </div>
  );
};

interface LeadLinkProps {
  link: LeadLink;
}

export const LeadLink = ({ link }: LeadLinkProps) => {
  return <LinkButton to={link.href}>{link.title}</LinkButton>;
};

export const Leadbox = (props: LeadboxProps) => {
  return (
    <Layout>
      <IllustrationStyled
        size={IllustrationSize.LARGE}
        show={props.illustration}
      />
      <Content>
        <Headline>{props.title}</Headline>

        {props.contact && <LeadContact contact={props.contact} />}
        {props.link && <LeadLink link={props.link} />}
      </Content>
    </Layout>
  );
};
