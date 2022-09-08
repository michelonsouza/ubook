import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';

import { ContactTable } from '@/components';
import { generateMockedContacts } from '@/mocks/contacts';
import { Contact } from '@/models';

let contacts: Contact[] = generateMockedContacts();

describe('ContactTable test suit', () => {
  beforeEach(() => {
    contacts = generateMockedContacts();
  });

  it('should component to be render', () => {
    const sut = mount<any>(ContactTable, {
      props: {
        value: []
      }
    });

    expect(sut).toBeTruthy();
  });

  it('should ContactTable emit edit-contact event', () => {
    const sut = mount<any>(ContactTable, {
      props: {
        value: contacts,
      },
    });

    const editButton = sut.get('button[data-testid="edit-action"]');
    editButton.trigger('click');

    expect(sut.emitted()).toHaveProperty('edit-contact');
  });

  it('should ContactTable emit delete-contact event', () => {
    const sut = mount<any>(ContactTable, {
      props: {
        value: contacts,
      },
    });

    const deleteButton = sut.get('button[data-testid="delete-action"]');
    deleteButton.trigger('click');

    expect(sut.emitted()).toHaveProperty('delete-contact');
  });

  it('should ContactTable row have "N/A" for name, email and phone values', async () => {
    const defaultValue = 'N/A';
    
    const sut = mount<any>(ContactTable, {
      props: {
        value: generateMockedContacts(['email', 'name', 'phone'], 10),
      },
    });

    await flushPromises();

    const nameColumn = sut.find('td[data-testid="name-column"] > div > p');
    const emailColumn = sut.find('div[data-testid="email-column"] > p');
    const phoneColumn = sut.find('div[data-testid="phone-column"] > p');
    
    expect(nameColumn.text()).toEqual(defaultValue);
    expect(emailColumn.text()).toEqual(defaultValue);
    expect(phoneColumn.text()).toEqual(defaultValue);
  });

  it('should import ContactTable asyncronous imports', async () => {
    const sut = await import('@/components/ContactTable/index.vue');
    expect(sut).toBeDefined();
  });
});
