import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import waitForExpect from 'wait-for-expect';

import '@/validators/vee-validate';

import { ContactFormModal } from '@/components';
import { Contact } from '@/models';
import { generateMockedContact } from '@/mocks/contacts';

let mockedContact: Contact = generateMockedContact();

describe('ContactFormModal test suit', () => {
  beforeEach(() => {
    mockedContact = generateMockedContact();
  });

  it('should component to be render', () => {
    const sut = mount<any>(ContactFormModal);

    expect(sut).toBeTruthy();
  });

  it('should emit close event', async () => {
    const sut = mount<any>(ContactFormModal, {
      props: {
        open: true,
        defaultValues: mockedContact,
      },
    });
    await flushPromises();

    const overlayWrapper = sut.get('div[data-testid="modal-container"]');

    overlayWrapper.trigger('click');

    await flushPromises();

    await waitForExpect(() => {
      expect(sut.emitted()).toHaveProperty('close');
    });
  });

  it('should emit close event when click in cancel button', async () => {
    const sut = mount<any>(ContactFormModal, {
      props: {
        open: true,
        defaultValues: mockedContact,
      },
    });
    await flushPromises();

    const cancelButton = sut.get('button[data-testid="cancel-button"]');

    cancelButton.trigger('click');

    await flushPromises();

    await waitForExpect(() => {
      expect(sut.emitted()).toHaveProperty('close');
    });
  });

  it('should import ContactFormModal asyncronous imports', async () => {
    const sut = await import('@/components/ContactFormModal.vue');
    expect(sut).toBeDefined();
  });
});
