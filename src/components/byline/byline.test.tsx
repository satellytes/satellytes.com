import { render } from '@testing-library/react';
import React from 'react';
import Byline from './byline';

const testData = [
  {
    author: 'Max Mustermann',
    date: new Date(Date.UTC(2020, 1, 21)),
    authorSummary: 'Developer Satellytes',
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

  it('should contain author and his position', () => {
    const author = byline.findByText(
      'von Max Mustermann, Developer Satellytes',
    );
    expect(author).toBeTruthy();
  });

  it('should contain date', () => {
    const date = byline.getByText('vor 10 Tagen');
    expect(date).toBeTruthy();
  });
});
