import React from 'react';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { Intro, UnorderedList } from './support';
import { ContentfulList, ContentfulSectionHeader } from '../../../types';

interface ConsultingProps {
  header: ContentfulSectionHeader;
  list: ContentfulList;
}

export const Consulting = ({ header, list }: ConsultingProps) => {
  return (
    <ContentBlockContainer>
      <Intro
        illustration={header.illustration}
        headline={header.headline}
        kicker={header.kicker}
      >
        <p>{header.paragraphs?.[0]?.paragraph?.paragraph as string}</p>
      </Intro>

      <UnorderedList>
        {list.listItems?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </UnorderedList>
    </ContentBlockContainer>
  );
};
