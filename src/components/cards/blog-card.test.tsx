/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render } from '@testing-library/react';
import { BlogCard } from './blog-card';

const data = {
  title: 'card title',
  text: 'text',
  link: '/link/',
  placeholderImage: {
    aspectRatio: NaN,
    src: '',
    srcSet: '',
    sizes: '',
  },
};

describe('BlogCard', () => {
  it('should render', () => {
    const card = render(
      <BlogCard title={data.title} text={data.text} link={data.link} />,
    );
    expect(card).toBeTruthy();
  });

  it('should link to blog page (link)', () => {
    const { queryByRole } = render(
      <BlogCard title={data.title} text={data.text} link={data.link} />,
    );

    expect(queryByRole('link')).toHaveAttribute('href', data.link);
  });
});
