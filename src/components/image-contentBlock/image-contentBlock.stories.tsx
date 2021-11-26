import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ExampleImage from '../../images/office/sy-office-01.jpg';
import ImageContentBlock from './image-contentBlock';
import styled from 'styled-components';

export default {
  component: ImageContentBlock,
  title: 'Components/ImageContentBlock',
  argTypes: {
    textAlign: {
      options: ['left', 'right', 'bottom'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof ImageContentBlock>;

const SampleImage = styled.img`
  width: 100%;
`;

const Template: ComponentStory<typeof ImageContentBlock> = (args) => (
  <ImageContentBlock {...args}>
    <SampleImage alt="" src={ExampleImage} />
  </ImageContentBlock>
);

export const Regular = Template.bind({});
Regular.args = {
  textAlign: 'right',
  description:
    'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. ',
  attribution: {
    source: 'www.somelink.de',
    creator: 'Banksy',
  },
};
