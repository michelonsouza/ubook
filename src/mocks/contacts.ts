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

const fakerFunctions: Record<keyof Contact, () => string> = {
  id: () => faker.datatype.uuid(),
  name: () => `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: () => faker.internet.email(),
  phone: () => faker.phone.phoneNumber('##9########'),
  avatarColor: () => generateRandomColor(),
  createdAt: () => new Date().toISOString(),
};

export function generateMockedContact(excludeValues?: string[]): Contact {
  return {
    id: excludeValues?.includes('id') ? '' : fakerFunctions.id(),
    name: excludeValues?.includes('name') ? '' : fakerFunctions.name(),
    email: excludeValues?.includes('email') ? '' : fakerFunctions.email(),
    phone: excludeValues?.includes('phone') ? '' : fakerFunctions.phone(),
    avatarColor: fakerFunctions.avatarColor(),
    createdAt: fakerFunctions.createdAt(),
  };
}

export function generateMockedContacts(
  excludeValues?: (keyof Contact)[],
  length = 15,
): Contact[] {
  return Array(length)
    .fill(0)
    .map(() => generateMockedContact(excludeValues));
}
