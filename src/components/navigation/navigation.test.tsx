import React from 'react';
import Navigation from './navigation';
import { render } from '@testing-library/react';

describe('<Navigation />', () => {
  it('should render', () => {
    const navigation = render(<Navigation />);
    expect(navigation).toMatchSnapshot();
  });

  it('should display title', () => {
    const { getByText } = render(<Navigation />);
    const navigation = getByText('Nav');
    expect(navigation).toBeInTheDocument();
  });
});
