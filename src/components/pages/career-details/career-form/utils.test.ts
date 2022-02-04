import { createFileId } from './utils';

describe('createFileId', () => {
  it('should work', () => {
    expect(createFileId('test.pdf')).toEqual('test');
    expect(createFileId('te_st.pdf')).toEqual('te_st');
    expect(createFileId('t.e.st.pdf')).toEqual('t_e_st');
    expect(createFileId('test')).toEqual('test');
  });
});
