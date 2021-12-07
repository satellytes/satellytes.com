import React from 'react';
import { ComponentStory } from '@storybook/react';
import { TeaserGrid } from './teaser-grid';
import { Teaser } from '../teaser';

const Template: ComponentStory<typeof TeaserGrid> = ({ children, ...rest }) => (
  <TeaserGrid {...rest}>{children}</TeaserGrid>
);

const ExampleTeaser = () => (
  <Teaser title="Enterprise Applikationen & Libraries" linkTo="/example">
    Teams aus Designern, Produktmanagern, Entwicklern, Supportmitarbeitern,
    Marketingspezialisten usw. bringen die richtige Mischung aus Know-how und
    Erfahrung mit und sorgen dafür, dass auch mal über den Tellerrand geschaut
    wird.
  </Teaser>
);

export const SingleChild = Template.bind({});
SingleChild.args = {
  children: <ExampleTeaser key={0} />,
};

export const ThreeChildren = Template.bind({});
ThreeChildren.args = {
  children: [
    <ExampleTeaser key={0} />,
    <ExampleTeaser key={1} />,
    <ExampleTeaser key={2} />,
  ],
};

export const FourChildren = Template.bind({});
FourChildren.args = {
  children: [
    <ExampleTeaser key={0} />,
    <ExampleTeaser key={1} />,
    <ExampleTeaser key={2} />,
    <ExampleTeaser key={3} />,
  ],
};
