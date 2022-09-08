import { EncryptStorage } from 'encrypt-storage';

export const encryptStorage = new EncryptStorage(
  import.meta.env.VITE_APP_ENCRYPT_STORAGE_SECRET_KEY,
  {
    prefix: import.meta.env.VITE_APP_ENCRYPT_STORAGE_PREFIX,
  },
);

delete window.EncryptStorage;
delete window.AsyncEncryptStorage;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (globalThis as any).EncryptStorage;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (globalThis as any).AsyncEncryptStorage;

if (import.meta.env.VITE_APP_NODE_ENV !== 'production') {
  window.encryptStorage = encryptStorage;
}
