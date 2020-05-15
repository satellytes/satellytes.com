import styled from 'styled-components';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import '@reach/tabs/styles.css';

export const StyledTabList = styled(TabList)``;

export const StyledTabs = styled(Tabs)``;

export const StyledTab = styled(Tab)`
  color: #668cff;
  background: none;

  &[data-selected] {
    color: #202840;
    background: lightblue;
  }
`;

export const StyledTabPanels = styled(TabPanels)``;

export const StyledTabPanel = styled(TabPanel)``;
