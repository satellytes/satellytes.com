import React from 'react';
import { render } from '@testing-library/react';
import { Markdown } from './markdown';

describe('<Markdown />', () => {
  it('should render', () => {
    const { container } = render(<Markdown data={``} />);
    expect(container).toBeTruthy();
  });

  it('should render text', () => {
    const { container } = render(
      <Markdown
        data={'this is just plain text\n\nafter 2 empty lines its new text'}
      />,
    );

    expect(container.querySelectorAll('p')).toHaveLength(2);
  });

  it('should render headers', () => {
    const { container } = render(
      <Markdown data={'# header \n  ## header 2 \n ## header 2'} />,
    );

    expect(container.querySelectorAll('h1')).toHaveLength(1);
    expect(container.querySelectorAll('h3')).toHaveLength(2);
  });

  it('should render a list', () => {
    const { container } = render(<Markdown data={'- item1 \n - item2'} />);

    expect(container.querySelectorAll('ul')).toHaveLength(1);
    expect(container.querySelectorAll('li')).toHaveLength(2);
  });

  it('should render code blocks', () => {
    const { container } = render(
      <Markdown data={'```\nhere is some code\n```'} />,
    );

    expect(container.querySelectorAll('pre')).toHaveLength(1);
  });

  it('should render inline code', () => {
    const { container } = render(<Markdown data={'`inline code`'} />);

    expect(container.querySelectorAll('code')).toHaveLength(1);
  });
});
