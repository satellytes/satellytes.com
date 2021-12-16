import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Pagination } from './pagination';

export default {
  component: Pagination,
  title: 'Components/UI/Pagination',
  parameters: {},
  argTypes: {},
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Regular = Template.bind({});
Regular.args = {
  amountOfPages: 3,
  onNextClick: () => {
    return;
  },
  onPreviousClick: () => {
    return;
  },
  onDropdownSelect: (selectedPage) => {
    return selectedPage;
  },
  currentPage: 0,
};

const ComponentWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const mockData = [
    'Blogpost: 1',
    'Blogpost: 2',
    'Blogpost: 3',
    'Blogpost: 4',
    'Blogpost: 5',
    'Blogpost: 6',
    'Blogpost: 7',
    'Blogpost: 8',
    'Blogpost: 9',
  ];

  const itemsPerPage = 2;
  const amountOfPages = Math.ceil(mockData.length / itemsPerPage);

  const onPrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const onDropdownSelect = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const isInRange = (blogpostIndex) => {
    const currentRange = [
      (currentPage + 1) * itemsPerPage - 2,
      (currentPage + 1) * itemsPerPage - 1,
    ];
    return currentRange.includes(blogpostIndex);
  };

  return (
    <div>
      {mockData.map((blogpost, index) => {
        if (isInRange(index)) {
          return <p key={blogpost}>{blogpost}</p>;
        }
      })}
      <Pagination
        amountOfPages={amountOfPages}
        currentPage={currentPage}
        onNextClick={onNextClick}
        onPreviousClick={onPrevClick}
        onDropdownSelect={onDropdownSelect}
      />
    </div>
  );
};

export const WithMockData = ComponentWithPagination.bind({});
