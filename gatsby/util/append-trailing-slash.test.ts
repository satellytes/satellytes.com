import { appendTrailingSlash } from './append-trailing-slash';

describe('appendTrailingSlash', () => {
  test('should add a trailing slash if its missing', () => {
    const path = appendTrailingSlash('/this-is-a-url-path');
    expect(path).toBe('/this-is-a-url-path/');
  });

  test('should not add a traling slash if there is already one', () => {
    const path = appendTrailingSlash('/this-is-a-url-path/');
    expect(path).toBe('/this-is-a-url-path/');
  });
});
