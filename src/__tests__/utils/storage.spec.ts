import { EncryptStorage } from 'encrypt-storage';

import { encryptStorage } from '@/utils';

describe('EncryptStorage', () => {
  it('should encryptStorage exists', () => {
    expect(encryptStorage).toBeInstanceOf(EncryptStorage);
  });
});
