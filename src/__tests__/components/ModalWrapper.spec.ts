import { mount } from '@vue/test-utils';
import faker from 'faker';
import flushPromises from 'flush-promises';
import waitForExpect from 'wait-for-expect';

import '@/validators/vee-validate';

import { ModalWrapper } from '@/components';

describe('ModalWrapper test suit', () => {
  it('should component to be render', () => {
    const sut = mount<any>(ModalWrapper);

    expect(sut).toBeTruthy();
  });

  it('should emit close event', async () => {
    const sut = mount<any>(ModalWrapper, {
      props: {
        open: true,
      },
    });

    const overlayWrapper = sut.get('div[data-testid="modal-container"]');

    overlayWrapper.trigger('click');

    expect(sut.emitted()).toHaveProperty('close');
  });

  it('should show footer slot when is passed', async () => {
    const footer = `<div>${faker.random.words(4)}</div>`;
    const sut = mount<any>(ModalWrapper, {
      props: {
        open: true,
      },
      slots: {
        footer,
      },
    });

    await flushPromises();

    const footerWrapper = sut.get('.modal-footer');

    await flushPromises();
    await waitForExpect(() => {
      expect(footerWrapper?.html()).toContain(footer);
    });
  });

  it('should emit close event when esc is pressed', async () => {
    const defaultSlot = `<div>${faker.random.words(3)}</div>`;
    const sut = mount<any>(ModalWrapper, {
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

  it('should import ModalWrapper asyncronous imports', async () => {
    const sut = await import('@/components/ModalWrapper.vue');
    expect(sut).toBeDefined();
  });
});
