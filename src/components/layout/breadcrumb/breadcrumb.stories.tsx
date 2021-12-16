import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Breadcrumb } from './breadcrumb';

export default {
  component: Breadcrumb,
  title: 'Components/Layout/Breadcrumb',
} as ComponentMeta<typeof Breadcrumb>;

const Template: ComponentStory<typeof Breadcrumb> = (args) => (
  <Breadcrumb {...args} />
);

export const Regular = Template.bind({});
Regular.args = {
  breadcrumbEntries: [
    { pathname: '/', label: 'Main' },
    { pathname: '/blog', label: 'Blog' },
    { pathname: '/blog/howto-blog-post/', label: 'How to do a blog post' },
  ],
};
