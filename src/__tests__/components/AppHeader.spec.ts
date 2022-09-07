import { mount } from '@vue/test-utils';

import { AppHeader } from '@/components';

describe('AppHeader test suit', () => {
  it('should component to be render', () => {
    const sut = mount(AppHeader);

    expect(sut).toBeTruthy();
  });

  it('should emit create-contact event', () => {
    const sut = mount(AppHeader, {
      props: {
        showCreateButton: true,
      }
    });
    const createButton = sut.get('button[data-testid="create-button"]');

    createButton.trigger('click');

    expect(sut.emitted()).toHaveProperty('create-contact');
  });

  it('should import AppHeader asyncronous imports', async () => {
    const sut = await import('@/components/AppHeader.vue');
    expect(sut).toBeDefined();
  });
});
