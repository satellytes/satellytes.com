import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ImageContentBlock from './image-contentBlock';

export default {
  component: ImageContentBlock,
  title: 'Components/ImageContentBlock',
} as ComponentMeta<typeof ImageContentBlock>;

const Template: ComponentStory<typeof ImageContentBlock> = (args) => (
  <ImageContentBlock {...args} />
);

export const Regular = Template.bind({});
Regular.args = {};
