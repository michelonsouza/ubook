import { mount } from '@vue/test-utils';

import { NoContent } from '@/components';

describe('NoContent test suit', () => {
  it('should component to be render', () => {
    const sut = mount<any>(NoContent);

    expect(sut).toBeTruthy();
  });

  it('should emit create-contact event', () => {
    const sut = mount<any>(NoContent, {
      props: {
        showCreateButton: true,
      }
    });
    const createButton = sut.get('button[data-testid="create-button"]');

    createButton.trigger('click');

    expect(sut.emitted()).toHaveProperty('create-contact');
  });

  it('should import NoContent asyncronous imports', async () => {
    const sut = await import('@/components/NoContent.vue');
    expect(sut).toBeDefined();
  });
});
