import { mount } from '@vue/test-utils';
import faker from 'faker';

import { SearchTextInput } from '@/components';

describe('SearchTextInput test suit', () => {
  it('should component to be render', () => {
    const sut = mount<any>(SearchTextInput);

    expect(sut).toBeTruthy();
  });

  it('should input has the correct placeholder', () => {
    const placeholder = faker.random.words(3);
    const sut = mount<any>(SearchTextInput, {
      props: {
        placeholder,
      },
    });

    const inputElement = sut.get('input');

    expect(inputElement?.attributes().placeholder).toEqual(placeholder);
  });

  it('should input emit event with correct value', () => {
    const value = faker.random.words(3);
    const sut = mount<any>(SearchTextInput);

    const searchButton = sut.get('button');
    const inputElement = sut.get('input');
    inputElement.setValue(value);

    searchButton.trigger('click');

    expect(sut.emitted()).toHaveProperty('search');
  });

  it('should input not emit event when pass searchOnClick=false', () => {
    const value = faker.random.words(3);
    const sut = mount<any>(SearchTextInput, {
      props: {
        searchOnClick: false,
      },
    });

    const searchButton = sut.get('button');
    const inputElement = sut.get('input');
    inputElement.setValue(value);

    searchButton.trigger('click');

    expect(sut.emitted()).not.toHaveProperty('search');
  });

  it('should input clear value when pass clearAfterSearch=true', () => {
    const value = faker.random.words(3);
    const sut = mount<any>(SearchTextInput, {
      props: {
        clearAfterSearch: true,
      },
    });

    const searchButton = sut.get('button');
    const inputElement = sut.get('input');
    inputElement.setValue(value);

    searchButton.trigger('click');

    expect(inputElement.element.value).toEqual('');
  });

  it('should import SearchTextInput asyncronous imports', async () => {
    const sut = await import('@/components/SearchTextInput.vue');
    expect(sut).toBeDefined();
  });

  it('should import SearchTextInput asyncronous dynamic imports', async () => {
    const name = 'SearchTextInput';
    const sut = await import(`@/components/${name}.vue`);
    expect(sut).toBeDefined();
  });
});
