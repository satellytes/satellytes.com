import React from 'react';
import Header from './header';
import { render } from '@testing-library/react';

describe('<Header />', () => {
  it('should render', () => {
    const title = 'Test title';
    const { getByText } = render(<Header siteTitle={title} />);
    const header = getByText(title);
    expect(header).toBeInTheDocument();
  });
});
