import styled from 'styled-components';
import { TabList, Tab, TabPanels } from '@reach/tabs';
import '@reach/tabs/styles.css';

export const StyledTabList = styled(TabList)`
  background: none;
  padding-bottom: 18px;
  overflow-x: scroll;
  transform: translateX(-14px);
  white-space: nowrap;
  width: 100%;
`;

export const StyledTab = styled(Tab)`
  position: relative;
  font-size: 20px;
  font-weight: bold;
  margin: 4px 8px 0 4px;

  &[data-reach-tab] {
    color: #668cff;
    border: none;
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

export const StyledTabPanels = styled(TabPanels)`
  line-height: 1.5;
`;
