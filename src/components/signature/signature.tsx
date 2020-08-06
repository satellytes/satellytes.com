import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import React from 'react';
import styled from 'styled-components';

export interface SignatureProps {
  author: string;
  date: string;
}

const SignatureContainer = styled.div`
  color: #668cff;
  margin-top: 80px;
`;

const SignatureDivider = styled.div`
  border-bottom: 2px solid #668cff;
  margin-bottom: 32px;
  width: 60px;
`;

const SignatureAuthor = styled.p`
  font-weight: bold;
`;

const SignatureDaysPassed = styled.p`
  font-weight: normal;
`;

const Signature: React.FC<SignatureProps> = ({ author, date }) => {
  const daysPassed = differenceInCalendarDays(new Date(), new Date(date));
  const daysText = daysPassed > 2 ? 'Tagen' : 'Tag';

  return (
    <SignatureContainer>
      <SignatureDivider />
      <SignatureAuthor>von {author}</SignatureAuthor>
      <SignatureDaysPassed>
        vor {daysPassed} {daysText}
      </SignatureDaysPassed>
    </SignatureContainer>
  );
};

export default Signature;
