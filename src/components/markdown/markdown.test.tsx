import React from 'react';
import { render } from '@testing-library/react';
import { Markdown } from './markdown';

describe('<Markdown />', () => {
  it('should render', () => {
    const { container } = render(<Markdown />);
    expect(container).toBeTruthy();
  });

  it('should render text', () => {
    const { container } = render(
      <Markdown>
        {'this is just plain text\n\nafter 2 empty lines its new text'}
      </Markdown>,
    );

    expect(container.querySelectorAll('p')).toHaveLength(2);
  });

  it('should render all headers with their appropriate level', () => {
    const { container } = render(
      <Markdown>
        {'# header\n## header 2\n## header 2\n### header 3 '}
      </Markdown>,
    );

    expect(container.querySelectorAll('h2')).toHaveLength(3);
    expect(container.querySelectorAll('h3')).toHaveLength(1);
  });

  it('should render a list', () => {
    const { container } = render(<Markdown>{'- item1 \n - item2'}</Markdown>);

    expect(container.querySelectorAll('ul')).toHaveLength(1);
    expect(container.querySelectorAll('li')).toHaveLength(2);
  });

  it('should render code blocks', () => {
    const { container } = render(
      <Markdown>{'```\nhere is some code\n```'}</Markdown>,
    );

    expect(container.querySelectorAll('pre')).toHaveLength(1);
  });

  it('should render inline code', () => {
    const { container } = render(<Markdown>{'`inline code`'}</Markdown>);

    expect(container.querySelectorAll('code')).toHaveLength(1);
  });
});
