import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Landingpage } from './landingpage/landingpage';
import { Service } from './service/service';
import { ILLUSTRATION_NAMES } from '../ui/illustration/illustration-set';

const mockProps = {
  title: 'Test Title',
  description: 'Test Description',
  positions: [],
  posts: [],
  officeImages: {},
  serviceHeader: {
    slug: 'test-service-header',
  },
  serviceTeaser: [],
  careerHeader: {
    slug: 'test-career-header',
  },
  blogHeader: {
    slug: 'test-blog-header',
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
  servicesHeader: {
    slug: 'test-services-header',
  },
  platformsHeader: {
    slug: 'test-platforms-header',
  },
  productsServicesHeader: {
    slug: 'test-products-services-header',
  },
  consultingHeader: {
    slug: 'test-consulting-header',
  },
  productDesignHeader: {
    slug: 'test-product-design-header',
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
        title={mockProps.title}
        description={mockProps.description}
        positions={mockProps.positions}
        posts={mockProps.posts}
        officeImages={mockProps.officeImages}
        serviceHeader={mockProps.serviceHeader}
        serviceTeaser={mockProps.serviceTeaser}
        careerHeader={mockProps.careerHeader}
        blogHeader={mockProps.blogHeader}
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
        servicesHeader={mockProps.servicesHeader}
        platformsHeader={mockProps.platformsHeader}
        productsServicesHeader={mockProps.productsServicesHeader}
        consultingHeader={mockProps.consultingHeader}
        productDesignHeader={mockProps.productDesignHeader}
        platformsList={mockProps.contentfulList}
        productsServicesList={mockProps.contentfulList}
        consultingList={mockProps.contentfulList}
      />,
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
