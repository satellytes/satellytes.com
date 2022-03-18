import {
  PERSONIO_SLUG_FIELD_NAME,
  extractPersonioSlug,
} from './extract-personio-slug';

describe('extractPersonioSlug', () => {
  test('should find and return the given slug', () => {
    const slug = extractPersonioSlug([
      {
        name: PERSONIO_SLUG_FIELD_NAME,
        value: 'the-slug',
      },
      {
        name: 'other',
        value: 'bad',
      },
    ]);

    expect(slug).toBe('the-slug');
  });

  test('strips html tags', () => {
    const slug = extractPersonioSlug([
      {
        name: PERSONIO_SLUG_FIELD_NAME,
        value: '<p>my-slug</p>',
      },
    ]);

    expect(slug).toBe('my-slug');
  });

  test('should return null when slug is not present', () => {
    const slug = extractPersonioSlug([
      {
        name: 'other',
        value: 'bad',
      },
    ]);

    expect(slug).toBe(null);
  });

  test('null for empty values', () => {
    const slug = extractPersonioSlug([
      {
        name: PERSONIO_SLUG_FIELD_NAME,
        value: '   ',
      },
    ]);

    expect(slug).toBe(null);
  });

  test('null for empty values wrapped in html', () => {
    const slug = extractPersonioSlug([
      {
        name: PERSONIO_SLUG_FIELD_NAME,
        value: '<p>    </p>',
      },
    ]);

    expect(slug).toBe(null);
  });
});
