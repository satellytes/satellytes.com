import { getFilenameWithoutFiletype } from './career-file-upload-type';

describe('career-file-upload-type', () => {
  it('should extract a filename', () => {
    expect(getFilenameWithoutFiletype('test.pdf')).toEqual('test');
    expect(getFilenameWithoutFiletype('te-st.pdf')).toEqual('te-st');
    expect(getFilenameWithoutFiletype('t.e.st.pdf')).toEqual('t.e.st');
    expect(getFilenameWithoutFiletype('test')).toEqual('test');
  });
});
