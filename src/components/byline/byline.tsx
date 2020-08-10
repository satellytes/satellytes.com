import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import React from 'react';
import styled from 'styled-components';
import SharedPanel from '../shared-panel/shared-panel';

export interface BylineProps {
  author: string;
  authorSummary: string;
  date: Date;
}

const BylineContainer = styled.div`
  color: #668cff;
  margin-top: 80px;
`;

const BylineDivider = styled.div`
  border-bottom: 2px solid #668cff;
  margin-bottom: 32px;
  width: 60px;
`;

const BylineAuthor = styled.p`
  font-weight: bold;
  margin: 10px 0;
`;

const BylineAuthorSummary = styled.p`
  font-weight: normal;
  margin: 10px 0;
`;

const BylineTimeFromPosted = styled.p`
  font-weight: normal;
  margin: 10px 0;
`;

const Byline: React.FC<BylineProps> = ({ author, date, authorSummary }) => {
  const timeFromPosted = formatDistanceToNow(new Date(date), {
    locale: de,
    addSuffix: true,
  });

  return (
    <BylineContainer>
      <BylineDivider />
      <BylineAuthor>von {author}</BylineAuthor>
      <BylineAuthorSummary>{authorSummary}</BylineAuthorSummary>
      <BylineTimeFromPosted>{timeFromPosted}</BylineTimeFromPosted>
      <SharedPanel facebookId="facebookId" />
    </BylineContainer>
  );
};

export default Byline;
