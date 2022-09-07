import { mount } from '@vue/test-utils';
import faker from 'faker';

import CreateButton from './src/components/CreateButton.vue';

describe('CreateButton test suit', () => {
  it('should component to be render', () => {
    const sut = mount<any>(CreateButton);

    expect(sut).toBeTruthy();
  });

  it('should input emit event with correct value', () => {
    const sut = mount<any>(CreateButton);

    sut.trigger('click');

    expect(sut.emitted()).toHaveProperty('click');
  });
});
