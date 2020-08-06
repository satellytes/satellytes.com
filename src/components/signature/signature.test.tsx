import { render } from '@testing-library/react';
import React from 'react';
import Signature from './signature';

const testData = [
  {
    author: 'John Doe',
    date: '2020-07-01',
  },
  {
    author: 'John Doe',
    date: new Date().toString(),
  },
  {
    author: 'John Doe',
    date: '2020-08-01',
  },
];

describe(Signature.name, () => {
  it('should render', () => {
    const signature = render(
      <Signature author={testData[0].author} date={testData[0].date} />,
    );
    expect(signature).toBeTruthy();
  });

  it('should contain author', () => {
    const { getByText } = render(
      <Signature author={testData[0].author} date={testData[0].date} />,
    );
    expect(getByText('von John Doe')).toBeTruthy();
  });

  describe('days label', () => {
    it('should render label "Tag" if date today', () => {
      const { findByText } = render(
        <Signature author={testData[1].author} date={testData[1].date} />,
      );
      expect(findByText('Tag')).toBeTruthy();
    });

    it('should render label "Tagen" if date earlier than today', () => {
      const { findByText } = render(
        <Signature author={testData[0].author} date={testData[0].date} />,
      );
      expect(findByText('Tagen')).toBeTruthy();
    });

    it('should render correct number of days', () => {
      const { getByText } = render(
        <Signature author={testData[2].author} date={testData[2].date} />,
      );
      const date = getByText('vor 5 Tagen');
      expect(date).toBeTruthy();
    });
  });
});
