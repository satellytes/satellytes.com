import { formatDistanceToNow } from 'date-fns';
import { enGB } from 'date-fns/locale';
import React from 'react';
import styled from 'styled-components';

export interface BylineProps {
  author?: string;
  authorSummary?: string;
  date: Date;
  readingTime: string;
}

const BylineContainer = styled.div`
  color: ${(props) => props.theme?.palette?.text?.secondary};
`;

const BylineAuthor = styled.p`
  margin: 0 8px 0 0;
  line-height: 150%;
  display: inline-block;
`;

const BylineTimeFromPosted = styled.p`
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 0;
`;

const Byline: React.FC<BylineProps> = ({
  readingTime,
  author,
  date,
  authorSummary,
}) => {
  if (!author && !authorSummary) {
    return null;
  }

  const timeFromPosted = formatDistanceToNow(new Date(date), {
    locale: enGB,
    addSuffix: true,
  });

  return (
    <BylineContainer>
      <BylineTimeFromPosted>
        {timeFromPosted} ({readingTime})
      </BylineTimeFromPosted>
      <BylineAuthor>
        {author}, {authorSummary}
      </BylineAuthor>
    </BylineContainer>
  );
};

export default Byline;
