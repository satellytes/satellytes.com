import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Landingpage } from './landingpage/landingpage';
import { Service } from './service/service';
import { ILLUSTRATION_NAMES } from '../ui/illustration/illustration-set';
import { CareerPage } from './career/career-page';
import { Layout } from 'gatsby-plugin-image';
import { AboutUsPage } from './about-us/about-us-page';

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
  gatsbyImageData: {
    layout: 'fixed' as Layout,
    width: 100,
    height: 100,
    images: {
      fallback: {
        src: 'test',
        srcSet: 'test',
        sizes: 'test',
      },
    },
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

  it("The career page shouldn't have a11y problems", async () => {
    const { container } = render(
      <CareerPage
        positions={mockProps.empty_list}
        heroImageData={mockProps.gatsbyImageData}
        officeImages={mockProps.empty_map}
        page={mockProps.page}
        leadbox={mockProps.leadbox}
        introductionHeader={mockProps.one_slug}
        applicationProcessHeader={mockProps.one_slug}
        openingsHeader={mockProps.one_slug}
        cultureHeader={mockProps.one_slug}
        perksHeader={mockProps.one_slug}
        cultureTeaser={mockProps.empty_list}
        perksTeaser={mockProps.empty_list}
        applicationProcessAccordion={mockProps.empty_list}
      />,
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("The about page shouldn't have a11y problems", async () => {
    const { container } = render(
      <AboutUsPage
        title={mockProps.string}
        description={mockProps.string}
        team={mockProps.empty_list}
        heroImageData={mockProps.gatsbyImageData}
        impressions={mockProps.empty_list}
        sectionHeaderImpressions={mockProps.one_slug}
        sectionHeaderTeam={mockProps.one_slug}
        leadbox={mockProps.leadbox}
      />,
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
