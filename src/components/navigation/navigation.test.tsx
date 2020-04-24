import React from 'react';
import Navigation from './navigation';
import { render } from '@testing-library/react';

describe('<Navigation />', () => {
  it('should render', () => {
    const title = 'Test title';
    const { getByText } = render(<Navigation siteTitle={title} />);
    const navigation = getByText(title);
    expect(navigation).toBeInTheDocument();
  });
});
