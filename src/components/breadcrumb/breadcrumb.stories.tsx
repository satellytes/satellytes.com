import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Breadcrumb } from './breadcrumb';
import Header from '../header/header';
import { GlobalStyle } from '../layout/global-style';
import AngularIMG from '../../../blog-posts/images/angular.png';

export default {
  component: Breadcrumb,
  title: 'Components/Breadcrumb',
  decorators: [
    (Story) => (
      <>
        <GlobalStyle $lightTheme={true} />
        <Story />
      </>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Breadcrumb>;

const Template: ComponentStory<typeof Breadcrumb> = (args) => (
  <Breadcrumb {...args} />
);
const CustomHeader = (transparent = false) => (
  <Header
    siteTitle={'Satellytes'}
    transparent={transparent}
    $lightTheme={true}
  />
);

export const Regular = Template.bind({});
Regular.args = {
  breadcrumbEntries: [
    { pathname: '/', label: 'main' },
    { pathname: '/blog', label: 'blog' },
  ],
};

export const WithCustomLabel = Template.bind({});
WithCustomLabel.args = {
  breadcrumbEntries: [
    { pathname: '/', label: 'main' },
    { pathname: '/blog', label: 'blog' },
    { pathname: '/blog/howto-blog-post/', label: 'howto-blog-post' },
  ],
  customLabel: 'How to do a blog post',
};

export const WithHeader = Template.bind({});
WithHeader.args = {
  breadcrumbEntries: [
    { pathname: '/', label: 'main' },
    { pathname: '/blog', label: 'blog' },
    { pathname: '/blog/howto-blog-post/', label: 'howto-blog-post' },
  ],
  customLabel: 'How to do a blog post',
};
WithHeader.decorators = [
  (Story) => (
    <>
      {CustomHeader()}
      <Story />
    </>
  ),
];

export const WithHero = Template.bind({});
WithHero.args = {
  ...Regular.args,
  hasHero: true,
};
WithHero.decorators = [
  (Story) => (
    <>
      {CustomHeader(true)}
      <img style={{ width: '100%' }} alt={''} src={AngularIMG} />
      <Story />
    </>
  ),
];
