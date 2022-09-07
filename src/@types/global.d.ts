import { EncryptStorage } from 'encrypt-storage';

declare global {
  interface Window {
    encryptStorage?: EncryptStorage;
  }
}
