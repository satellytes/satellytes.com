import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Landingpage } from './landingpage/landingpage';
import { Service } from './service/service';
import { ILLUSTRATION_NAMES } from '../ui/illustration/illustration-set';

const mockProps = {
  string: 'Test',
  empty_list: [],
  empty_map: {},
  one_slug: {
    slug: 'test-service-header',
  },
  page: {
    title: 'Test Page Title',
    seoMetaText: 'Test Page Description',
    slug: 'test-page-slug',
  },
  leadbox: {
    title: 'Test Leadbox Title',
    illustration: ILLUSTRATION_NAMES[0],
    slug: 'test-leadbox',
  },
  contentfulList: {
    listItems: ['1', '2', '3'],
  },
};

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  it("The landingpage shouldn't have a11y problems", async () => {
    const { container } = render(
      <Landingpage
        title={mockProps.string}
        description={mockProps.string}
        positions={mockProps.empty_list}
        posts={mockProps.empty_list}
        officeImages={mockProps.empty_map}
        serviceHeader={mockProps.one_slug}
        serviceTeaser={mockProps.empty_list}
        careerHeader={mockProps.one_slug}
        blogHeader={mockProps.one_slug}
      />,
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("The service page shouldn't have a11y problems", async () => {
    const { container } = render(
      <Service
        page={mockProps.page}
        leadbox={mockProps.leadbox}
        servicesHeader={mockProps.one_slug}
        platformsHeader={mockProps.one_slug}
        productsServicesHeader={mockProps.one_slug}
        consultingHeader={mockProps.one_slug}
        productDesignHeader={mockProps.one_slug}
        platformsList={mockProps.contentfulList}
        productsServicesList={mockProps.contentfulList}
        consultingList={mockProps.contentfulList}
      />,
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
