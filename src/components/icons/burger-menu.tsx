import React from 'react';
import styled from 'styled-components';

export const BurgerMenu = () => (
  <Wrapper>
    <div className="bar" />
    <div className="bar" />
    <div className="bar" />
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .bar {
    height: 2px;
    margin-bottom: 2px;
    background-color: white;
    border-radius: 2px;
  }

  .bar:nth-child(1) {
    transition: all 0.1s 0.2s;
    width: 12px;
  }

  .bar:nth-child(2) {
    transition: all 0.1s 0.1s;
    width: 10px;
  }

  .bar:nth-child(3) {
    transition: all 0.1s;
    width: 8px;
    margin-bottom: 0px;
  }

  &:hover {
    .bar:nth-child(1) {
      transition: all 0.1s;
      width: 18px;
    }
    .bar:nth-child(2) {
      transition: all 0.1s 0.1s;
      width: 14px;
    }
    .bar:nth-child(3) {
      transition: all 0.1s 0.2s;
      width: 10px;
    }
  }
`;
