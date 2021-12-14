import React from 'react';
import { ComponentStory } from '@storybook/react';
import { Teaser } from './teaser';
import ExampleImage from '../../../blog-posts/images/angular.png';
import styled from 'styled-components';
import {
  Illustration,
  IllustrationSize,
} from '../../components/illustration/illustration';
import { ILLUSTRATION_NAMES } from '../../components/illustration/illustration-set';

const Template: ComponentStory<typeof Teaser> = (args) => <Teaser {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  title: 'Teaser Title',
  children:
    'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna.',
  linkTo: '/blog',
};

const icons = {};
{
  ILLUSTRATION_NAMES.forEach((name) => {
    icons[name] = (
      <Illustration key={name} show={name} size={IllustrationSize.MEDIUM} />
    );
  });
}

export const WithIllustration = Template.bind({});
WithIllustration.args = {
  ...Regular.args,
  illustration: 'space_shuttle_043',
};
WithIllustration.argTypes = {
  image: {
    options: ILLUSTRATION_NAMES,
    mapping: icons,
  },
};

const SampleImage = styled.img`
  width: 100%;
`;

export const WithImage = Template.bind({});
WithImage.args = {
  ...Regular.args,
  topline: 'Topline',
  dateFormatted: '15th November 2021',
  image: <SampleImage src={ExampleImage} alt="" />,
};
WithImage.parameters = {
  controls: { exclude: ['cover'] },
};
