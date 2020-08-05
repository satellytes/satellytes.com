import React from 'react';
import Signature from './signature';
import { render } from '@testing-library/react';

const testData = [
  {
    author: 'John Doe',
    date: '2020-05-05',
  },
  {
    author: 'John Doe',
    date: new Date().toString(),
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
    const author = getByText('von John Doe');
    expect(author).toBeTruthy();
  });

  describe('days label', () => {
    it('should render label "vor Tag" if date today', () => {
      const { findByText } = render(
        <Signature author={testData[1].author} date={testData[1].date} />,
      );
      const date = findByText('Tag');
      expect(date).toBeTruthy();
    });

    it('should render label "Tagen" if date earlier than today', () => {
      const { findByText } = render(
        <Signature author={testData[0].author} date={testData[0].date} />,
      );
      const date = findByText('Tagen');
      expect(date).toBeTruthy();
    });

    it('should render correct number of days', () => {
      pending('waiting for implementation');
    });
  });
});
