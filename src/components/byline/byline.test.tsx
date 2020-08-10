import { render } from '@testing-library/react';
import React from 'react';
import Byline from './byline';

const testData = [
  {
    author: 'John Doe',
    date: new Date(Date.UTC(2020, 1, 21)),
    authorSummary: 'Frontend developer',
  },
];

describe('Byline', () => {
  let byline: any;

  beforeAll(() => {
    Date.now = jest.fn(() => new Date(Date.UTC(2020, 1, 31)).valueOf());
  });

  beforeEach(() => {
    byline = render(
      <Byline
        author={testData[0].author}
        date={testData[0].date}
        authorSummary={testData[0].authorSummary}
      />,
    );
  });

  it('should render', () => {
    expect(byline).toBeTruthy();
  });

  it('should contain author', () => {
    const author = byline.findByText('von John Done');
    expect(author).toBeTruthy();
  });

  it('should contain author summary', () => {
    const summary = byline.getByText('Frontend developer');
    expect(summary).toBeTruthy();
  });

  it('should contain date', () => {
    const date = byline.getByText('vor 10 Tagen');
    expect(date).toBeTruthy();
  });
});
