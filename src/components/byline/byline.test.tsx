import { render } from '@testing-library/react';
import React from 'react';
import Byline from './byline';

const testData = {
  author: 'Max Mustermann',
  date: new Date(Date.UTC(2020, 1, 21)),
  authorSummary: 'Developer Satellytes',
};

describe('Byline', () => {
  let byline: any;

  beforeAll(() => {
    Date.now = jest.fn(() => new Date(Date.UTC(2020, 1, 31)).valueOf());
  });

  beforeEach(() => {
    byline = render(
      <Byline
        readingTime="1min read"
        author={testData.author}
        date={testData.date}
        authorSummary={testData.authorSummary}
      />,
    );
  });

  it('should render', () => {
    expect(byline).toBeTruthy();
  });

  it('should contain author and his position', () => {
    const author = byline.getByText('Max Mustermann, Developer Satellytes');
    expect(author).toBeInTheDocument();
  });

  it('should contain date', () => {
    const date = byline.getByText(/10 days ago/);
    expect(date).toBeInTheDocument();
  });
});
