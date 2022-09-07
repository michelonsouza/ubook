/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';

import { Contact } from '@/models';
import { generateRandomColor } from '@/utils';

export const mockContacts: Contact[] = Array(15)
  .fill(0)
  .map(() => ({
    id: faker.datatype.uuid(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber('##9########'),
    avatarColor: generateRandomColor(),
    createdAt: new Date().toISOString(),
  }));
