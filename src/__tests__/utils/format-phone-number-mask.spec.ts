import faker from 'faker';

import { formatPhoneNumberMask } from '@/utils';

const phoneNumberRegex = /\([0-9]{2}\)\s[0-9]{5}-[0-9]{4}/;

describe('formatPhoneNumberMask suit', () => {
  it('should formatPhoneNumberMask return correct value', () => {
    const phoneNumber = faker.phone.phoneNumber('##9########');
    const phoneNumberFormated = formatPhoneNumberMask(phoneNumber);
    const isPhone = phoneNumberRegex.test(phoneNumberFormated);

    expect(isPhone).toBe(true);
  });

  it('should formatPhoneNumberMask return empty string when passes null', () => {
    const phoneNumberFormated = formatPhoneNumberMask(null);

    expect(phoneNumberFormated).toBe('');
  });
});
