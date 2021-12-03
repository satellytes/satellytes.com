import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ExampleImage from '../../images/office/sy-office-01.jpg';
import { Image } from './image-content-block';
import styled from 'styled-components';

const SampleImage = styled.img`
  width: 100%;
`;

const Template: ComponentStory<typeof Image> = (args) => (
  <Image {...args}>
    <SampleImage alt="" src={ExampleImage} />
  </Image>
);

export const Regular = Template.bind({});
Regular.args = {
  textAlign: 'right',
  description:
    'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. ',
  attribution: {
    source: 'https://www.example.com',
    creator: 'Banksy',
  },
};
