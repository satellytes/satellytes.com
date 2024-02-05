import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Landingpage } from './landingpage/landingpage';
import { Service } from './service/service';
import { ILLUSTRATION_NAMES } from '../ui/illustration/illustration-set';
import { CareerPage } from './career/career-page';
import { Layout } from 'gatsby-plugin-image';
import { AboutUsPage } from './about-us/about-us-page';
import { BlogPage } from './blog/blog-page';
import { AboutUsImpressionTileSize } from '../../types';

const testContentfulList = {
  listItems: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
};
const testIGatsbyImageData = {
  layout: 'fixed' as Layout,
  width: 100,
  height: 100,
  images: {
    fallback: {
      src: '../../assets/images/office/sy-office-01.jpg',
      srcSet: 'test',
      sizes: 'test',
    },
  },
};
const testContentfulVacancy = {
  id: 'test-id',
  name: 'Test Title',
  slug: 'test-slug',
  content: {
    raw: JSON.stringify({
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Test Content',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    }),
  },
  schedule: 'Test Schedule',
  createdAt: '01-01-0001',
  shortDescription: {
    shortDescription: 'Test short description',
  },
  socialCardFile: {
    childImageSharp: {
      gatsbyImageData: testIGatsbyImageData,
    },
  },
};
const testContentfulVacancyList = [
  { ...testContentfulVacancy, id: 'test-id-1' },
  { ...testContentfulVacancy, id: 'test-id-2' },
  { ...testContentfulVacancy, id: 'test-id-3' },
];
const testTitle = 'Test Title';
const testDescription =
  'Test Description lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
const testBlogPostTeaser = {
  fields: {
    path: '/blog/test',
  },
  heroImage: {
    image: testIGatsbyImageData,
  },
  id: 'test-id-2',
  publicationDate: '01-01-0001',
  teaserText:
    'Test teaser text lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  title: testTitle,
};
const testBlogPostTeaserList = [
  { ...testBlogPostTeaser, id: 'test-id-4' },
  { ...testBlogPostTeaser, id: 'test-id-5' },
  { ...testBlogPostTeaser, id: 'test-id-6' },
];
const testOfficeImage = {
  relativePath: '../../assets/images/office/sy-office-01.jpg',
  childImageSharp: {
    gatsbyImageData: testIGatsbyImageData,
  },
};
const testOfficeImages = { [testOfficeImage.relativePath]: testOfficeImage };
const testContentfulSectionHeader = {
  kicker: 'Test kicker',
  headline: 'Test headline',
  illustration: ILLUSTRATION_NAMES[0],
  slug: 'test-slug',
};
const testContentfulTeaserItem = {
  description: {
    description: testDescription,
  },
  title: testTitle,
  children: [<p key={'test-key'}>{testDescription}</p>],
};
const testContentfulTeaserItemList = [
  testContentfulTeaserItem,
  testContentfulTeaserItem,
  testContentfulTeaserItem,
];
const testContentfulAccordionItem = {
  title: testTitle,
  paragraph: {
    paragraph: testDescription,
  },
  illustration: ILLUSTRATION_NAMES[0],
};
const testContentfulAccordionItemList = [
  testContentfulAccordionItem,
  testContentfulAccordionItem,
  testContentfulAccordionItem,
];
const testContentfulPage = {
  title: testTitle,
  seoMetaText: testDescription,
  slug: 'test-page-slug',
  content: {
    raw: JSON.stringify({
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Test Content',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    }),
  },
};
const testLeadbox = {
  title: testTitle,
  illustration: ILLUSTRATION_NAMES[0],
  slug: 'test-leadbox',
  contact: {
    headline: testTitle,
    title: testTitle,
    email: 'test@example.com',
  },
};
const SyTeamMember = {
  id: 'test-id-3',
  name: 'Test Name',
  image: testIGatsbyImageData,
};
const testSyTeamMemberList = [
  { ...SyTeamMember, id: 'test-id-7' },
  { ...SyTeamMember, id: 'test-id-8' },
  { ...SyTeamMember, id: 'test-id-9' },
];
const testContentfulAboutUsImpression = {
  tileSize: 'portrait' as AboutUsImpressionTileSize,
  id: 'test-id-4',
  image: testIGatsbyImageData,
};
const testContentfulAboutUsImpressionList = [
  { ...testContentfulAboutUsImpression, id: 'test-id-10' },
  { ...testContentfulAboutUsImpression, id: 'test-id-11' },
  { ...testContentfulAboutUsImpression, id: 'test-id-12' },
];

expect.extend(toHaveNoViolations);

// Suppress warnings about gatsby-plugin-react-i18next
beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

// Restore warnings
afterEach(() => {
  (console.warn as jest.Mock).mockRestore();
});

describe('Accessibility Tests', () => {
  it("The landingpage shouldn't have a11y problems", async () => {
    const { container } = render(
      <Landingpage
        title={testTitle}
        description={testDescription}
        positions={testContentfulVacancyList}
        posts={testBlogPostTeaserList}
        officeImages={testOfficeImages}
        serviceHeader={testContentfulSectionHeader}
        serviceTeaser={testContentfulTeaserItemList}
        careerHeader={testContentfulSectionHeader}
        blogHeader={testContentfulSectionHeader}
      />,
    );
    const results = await axe(container, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa'],
      },
    });

    expect(results).toHaveNoViolations();
  });

  it("The service page shouldn't have a11y problems", async () => {
    const { container } = render(
      <Service
        page={testContentfulPage}
        leadbox={testLeadbox}
        servicesHeader={testContentfulSectionHeader}
        platformsHeader={testContentfulSectionHeader}
        productsServicesHeader={testContentfulSectionHeader}
        consultingHeader={testContentfulSectionHeader}
        productDesignHeader={testContentfulSectionHeader}
        platformsList={testContentfulList}
        productsServicesList={testContentfulList}
        consultingList={testContentfulList}
      />,
    );
    const results = await axe(container, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa'],
      },
    });

    expect(results).toHaveNoViolations();
  });

  it("The career page shouldn't have a11y problems", async () => {
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    const { container } = render(
      <CareerPage
        positions={testContentfulVacancyList}
        heroImageData={testIGatsbyImageData}
        officeImages={testOfficeImages}
        page={testContentfulPage}
        leadbox={testLeadbox}
        introductionHeader={testContentfulSectionHeader}
        applicationProcessHeader={testContentfulSectionHeader}
        openingsHeader={testContentfulSectionHeader}
        cultureHeader={testContentfulSectionHeader}
        perksHeader={testContentfulSectionHeader}
        cultureTeaser={testContentfulTeaserItemList}
        perksTeaser={testContentfulTeaserItemList}
        applicationProcessAccordion={testContentfulAccordionItemList}
      />,
    );
    const results = await axe(container, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa'],
      },
    });

    expect(results).toHaveNoViolations();
  });

  it("The about page shouldn't have a11y problems", async () => {
    const { container } = render(
      <AboutUsPage
        title={testTitle}
        description={testDescription}
        team={testSyTeamMemberList}
        heroImageData={testIGatsbyImageData}
        impressions={testContentfulAboutUsImpressionList}
        sectionHeaderImpressions={testContentfulSectionHeader}
        sectionHeaderTeam={testContentfulSectionHeader}
        leadbox={testLeadbox}
      />,
    );
    const results = await axe(container, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa'],
      },
    });

    expect(results).toHaveNoViolations();
  });

  it("The blog page shouldn't have a11y problems", async () => {
    const { container } = render(
      <BlogPage
        posts={testBlogPostTeaserList}
        header={testContentfulSectionHeader}
        pagination={{
          numberOfPages: 1,
          currentPage: 1,
        }}
      />,
    );
    const results = await axe(container, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa'],
      },
    });

    expect(results).toHaveNoViolations();
  });
});
