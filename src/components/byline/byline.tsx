import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import React from 'react';
import styled from 'styled-components';

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
`;

const BylineAuthorSummary = styled.p`
  font-weight: normal;
`;

const BylineTimeFromPosted = styled.p`
  font-weight: normal;
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
    </BylineContainer>
  );
};

export default Byline;
