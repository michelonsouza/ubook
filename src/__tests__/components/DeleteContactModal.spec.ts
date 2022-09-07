import { mount } from '@vue/test-utils';
import faker from 'faker';
import flushPromises from 'flush-promises';
import waitForExpect from 'wait-for-expect';

import '@/validators/vee-validate';

import { DeleteContactModal } from '@/components';
import {generateMockedContact} from '@/mocks/contacts';

describe('DeleteContactModal test suit', () => {
  it('should component to be render', () => {
    const sut = mount<any>(DeleteContactModal);

    expect(sut).toBeTruthy();
  });

  it('should emit close event', async () => {
    const sut = mount<any>(DeleteContactModal, {
      props: {
        open: true,
      },
    });

    const overlayWrapper = sut.get('div[data-testid="modal-container"]');

    overlayWrapper.trigger('click');

    expect(sut.emitted()).toHaveProperty('close');
  });

  it('should emit close event when close button is pressed', async () => {
    const sut = mount<any>(DeleteContactModal, {
      props: {
        open: true,
      },
    });

    await flushPromises();

    const cancelButton = sut.get('button[data-testid="cancel-button"]')

    cancelButton.trigger('click');
    await waitForExpect(() => {
      expect(sut.emitted()).toHaveProperty('close');
    });
  });

  it('should emit delete-contact event submit button is pressed', async () => {
    const contact = generateMockedContact();
    const sut = mount<any>(DeleteContactModal, {
      props: {
        open: true,
        contact,
      },
    });

    await flushPromises();

    const submitButton = sut.get('button[data-testid="submit-button"]')

    submitButton.trigger('click');
    const result = sut.emitted();

    await waitForExpect(() => {
      expect(result).toHaveProperty('delete-contact');
      expect((result['delete-contact'] as any[][])[0][0]).toEqual(contact);
    });
  });

  it('should emit close event when esc is pressed', async () => {
    const defaultSlot = `<div>${faker.random.words(3)}</div>`;
    const sut = mount<any>(DeleteContactModal, {
      props: {
        open: true,
      },
      slots: {
        default: defaultSlot,
      },
    });

    const keydownEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
      keyCode: 27,
    });

    window.dispatchEvent(keydownEvent);

    await flushPromises();

    expect(sut.emitted()).toHaveProperty('close');

    sut.unmount();
  });

  it('should import DeleteContactModal asyncronous imports', async () => {
    const sut = await import('@/components/DeleteContactModal.vue');
    expect(sut).toBeDefined();
  });
});
