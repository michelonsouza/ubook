import { EncryptStorage } from 'encrypt-storage';

import { encryptStorage } from '@/utils';

describe('EncryptStorage suit', () => {
  it('should encryptStorage exists', () => {
    expect(encryptStorage).toBeInstanceOf(EncryptStorage);
  });
});
