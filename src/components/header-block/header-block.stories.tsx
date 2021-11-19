import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import HeaderBlock from './header-block';

export default {
  component: HeaderBlock,
  title: 'Components/HeaderBlock',
} as ComponentMeta<typeof HeaderBlock>;

const Template: ComponentStory<typeof HeaderBlock> = (args) => (
  <HeaderBlock {...args}>
    Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi
    leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam
    eget risus varius blandit sit amet non magna.
  </HeaderBlock>
);

export const Regular = Template.bind({});
Regular.args = {
  topline: 'Topline',
  headline: 'Headline',
  date: 'vor 3 Tagen',
  author: 'von Fabian Dietenberger, Frontend Engineer, Satellytes',
  illustration: 'rocket_011',
  large: true,
};
