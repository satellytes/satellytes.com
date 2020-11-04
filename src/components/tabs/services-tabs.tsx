import React from 'react';
import styled from 'styled-components';
import { TabList, Tab, TabPanels, TabPanel, Tabs } from '@reach/tabs';
import { up } from '../breakpoint/breakpoint';
import '@reach/tabs/styles.css';
import { Markdown } from '../markdown/markdown';

interface ServicesTabsProps {
  tabs: {
    title: string;
    content: string;
  }[];
}

const StyledTabList = styled(TabList)`
  background: none;
  padding-bottom: 18px;
  overflow-x: auto;
  margin-bottom: 16px;
  margin-left: -16px;
  white-space: nowrap;
  width: calc(100% + 32px);

  ${up('md')} {
    height: 100%;
    width: 100%;
  }
`;

const StyledTab = styled(Tab)`
  position: relative;
  display: inline-block;
  font-size: 20px;
  font-weight: bold;

  &[data-reach-tab] {
    color: #668cff;
    border: none;
    display: inline-block;
    margin: 4px 8px 0 4px;

    &:last-of-type {
      border-right: 8px solid transparent;
    }
  }

  &[data-selected] {
    color: #202840;

    /* custom underline on selected tab */
    &:before {
      content: '';
      background: black;
      position: absolute;
      bottom: -10px;
      left: 12px;
      width: 20px;
      height: 3px;
      border-radius: 1px;
    }
  }
`;

const StyledTabPanels = styled(TabPanels)`
  line-height: 1.5;
`;

const ServicesTabs: React.FC<ServicesTabsProps> = ({ tabs }) => {
  return (
    <Tabs defaultIndex={0}>
      <StyledTabList>
        {tabs.map((tab, index) => (
          <StyledTab key={index}>{tab.title}</StyledTab>
        ))}
      </StyledTabList>
      <StyledTabPanels>
        {tabs.map((tab, index) => (
          <TabPanel key={index}>
            <Markdown>{tab.content}</Markdown>
          </TabPanel>
        ))}
      </StyledTabPanels>
    </Tabs>
  );
};

export default ServicesTabs;
