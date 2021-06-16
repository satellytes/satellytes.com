/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render } from '@testing-library/react';
import { Card } from './card';

const data = {
  title: 'card title',
  text: 'text',
  link: '/link',
};

describe('Card', () => {
  it('should render', () => {
    const card = render(<Card title={data.title} text={data.text} />);
    expect(card).toBeTruthy();
  });

  it('should show title', () => {
    const { getByText } = render(<Card title={data.title} text={data.text} />);
    expect(getByText(data.title)).toBeInTheDocument();
  });

  it('should show text', () => {
    const { getByText } = render(<Card title={data.title} text={data.text} />);
    expect(getByText(data.text)).toBeInTheDocument();
  });

  it('should show link, when provided', () => {
    const { getByText } = render(
      <Card title={data.title} text={data.text} link={data.link} />,
    );

    expect(getByText(/Apply/)).toBeInTheDocument();
  });

  it('link should direct to linked page', () => {
    const link = data.link;
    const { getByText } = render(
      <Card title={data.title} text={data.text} link={link} />,
    );

    expect(getByText(/Apply/).closest('a')).toHaveAttribute('href', link);
  });
});
