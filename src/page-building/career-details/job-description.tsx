import React from 'react';
import styled from 'styled-components';
import { TextTitle } from '../../components/typography/typography';
import { up } from '../../components/style-utils/breakpoint';
import { SyPersonioJobSection } from '../../types';

export const SectionHeadline = styled(TextTitle)`
  margin-top: 40px;
  margin-bottom: 16px;

  ${up('md')} {
    margin-top: 80px;
  }
`;

const PersonioHtml = styled.div`
  font-size: 16px;
  line-height: 150%;

  margin-top: 0;
  margin-bottom: 16px;

  & > ul {
    list-style: none;
    line-height: 150%;

    padding-left: 0;

    > li:before {
      content: '·';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
    }

    > li {
      position: relative;
      padding-left: 16px;
      margin-bottom: 16px;
    }
  }
`;

interface JobDescriptionProps {
  sections: SyPersonioJobSection[];
}
export const JobDescription = ({ sections }: JobDescriptionProps) => {
  return (
    <>
      {sections?.map(({ headline, descriptionHtml }, index) => {
        return (
          <div key={index}>
            <SectionHeadline>{headline}</SectionHeadline>
            <PersonioHtml
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          </div>
        );
      })}
    </>
  );
};
