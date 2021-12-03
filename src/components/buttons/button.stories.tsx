import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './button';
import { IconButton } from './icon-button';
import { Icon, IconSize } from '../../new-components/icon/icon';
import styled from 'styled-components';

// export default {
//   component: Button,
//   subcomponents: { IconButton },
//   title: 'Components/Button',
//   argTypes: {
//     onClick: { action: 'onChange' },
//   },
// };

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>{args.children}</Button>
);

export const Regular = Template.bind({});
Regular.args = {
  children: 'Alle Services',
  onClick: () => console.log('clicked'),
};

const IconWrapper = styled.div`
  color: white;
`;

const TemplateIcon: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args}>
    <IconWrapper>
      <Icon show="clone" />
    </IconWrapper>
  </IconButton>
);
export const WithIcon = TemplateIcon.bind({});
WithIcon.args = {
  onClick: () => console.log('clicked'),
};
