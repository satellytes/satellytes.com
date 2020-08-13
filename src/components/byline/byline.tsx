import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import React from 'react';
import styled from 'styled-components';
import { BylineArrow } from '../icons/byline-arrow';

export interface BylineProps {
  author: string;
  authorSummary: string;
  date: Date;
}

const BylineContainer = styled.div`
  color: #668cff;
  margin-top: 40px;
  margin-bottom: 32px;
`;

const BylineAuthor = styled.p`
  font-weight: bold;
  font-weight: normal;
  margin: 0px 8px 0px 0px;
  line-height: 150%;
  display: inline-block;
`;

const BylineTimeFromPosted = styled.p`
  font-weight: bold;
  margin-top: 0px;
`;

const Byline: React.FC<BylineProps> = ({
  author,
  date,
  authorSummary,
}) => {
  const timeFromPosted = formatDistanceToNow(new Date(date), {
    locale: de,
    addSuffix: true,
  });

  return (
    <BylineContainer>
      <BylineTimeFromPosted>{timeFromPosted}</BylineTimeFromPosted>
      <BylineAuthor>
        von {author}, {authorSummary}
      </BylineAuthor>
      <BylineArrow />
    </BylineContainer>
  );
};

export default Byline;
