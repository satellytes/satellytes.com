import React from 'react';
import { ComponentStory } from '@storybook/react';
import { Teaser, TeaserProps } from './teaser';
import ExampleImage from '../../../blog-posts/images/angular.png';
import styled from 'styled-components';
import { Illustration, IllustrationSize } from '../illustration/illustration';
import { ILLUSTRATION_NAMES } from '../illustration/illustration-set';
import { Grid, GridItem } from '../grid/grid';

const Template: ComponentStory<typeof Teaser> = (args) => <Teaser {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  title: 'Leadbox Title',
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
  cover: (
    <Illustration show={'space_shuttle_043'} size={IllustrationSize.MEDIUM} />
  ),
};
WithIllustration.argTypes = {
  cover: {
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
  cover: <SampleImage src={ExampleImage} alt="" />,
};
WithImage.parameters = {
  controls: { exclude: ['cover'] },
};

const StyledGrid = styled(Grid)`
  row-gap: 30px;
`;

interface TeaserGridTemplateProps {
  amountOfTeasers: number;
  teaserType: 'Regular' | 'WithImage' | 'WithIllustration';
}

const TeaserGridTemplate = ({
  amountOfTeasers,
  teaserType,
}: TeaserGridTemplateProps) => {
  const teaser =
    teaserType === 'WithImage' ? (
      <WithImage {...(WithImage.args as TeaserProps)} />
    ) : teaserType === 'WithIllustration' ? (
      <WithIllustration {...(WithIllustration.args as TeaserProps)} />
    ) : (
      <Regular {...(Regular.args as TeaserProps)} />
    );
  const teasers: JSX.Element[] = [];

  for (let i = 0; i < amountOfTeasers; i++) {
    teasers.push(
      <GridItem sm={6} md={4}>
        {teaser}
      </GridItem>,
    );
  }

  return <StyledGrid>{teasers}</StyledGrid>;
};

export const TeaserGrid = TeaserGridTemplate.bind({}) as any;
TeaserGrid.args = {
  amountOfTeasers: 10,
  teaserType: 'Regular',
};
TeaserGrid.argTypes = {
  teaserType: {
    control: {
      type: 'select',
      options: ['Regular', 'WithImage', 'WithIllustration'],
    },
  },
};
TeaserGrid.parameters = {
  controls: {
    exclude: ['title', 'topline', 'dateFormatted', 'cover', 'linkTo'],
  },
};
