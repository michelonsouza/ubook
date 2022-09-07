import { mount,  } from '@vue/test-utils';
import faker from 'faker';

import TextInput from '@/components/TextInput.vue';

describe('TextInput test suit', () => {
  it('should component to be render', () => {
    const sut = mount<any>(TextInput);

    expect(sut).toBeTruthy();
  });

  it('should input has the correct placeholder', () => {
    const placeholder = faker.random.words(3);
    const sut = mount<any>(TextInput, {
      props: {
        placeholder,
      }
    });

    const inputElement = sut.get('input');

    expect(inputElement?.attributes().placeholder).toEqual(placeholder);
  });

  it('should input emit event with correct value', () => {
    const value = faker.random.words(3);
    const sut = mount<any>(TextInput);

    const searchButton = sut.get('button');
    const inputElement = sut.get('input');
    inputElement.setValue(value);

    searchButton.trigger('click');

    expect(sut.emitted()).toHaveProperty('search');
  });

  it('should input not emit event when pass searchOnClick=false', () => {
    const value = faker.random.words(3);
    const sut = mount<any>(TextInput, {
      props: {
        searchOnClick: false,
      }
    });

    const searchButton = sut.get('button');
    const inputElement = sut.get('input');
    inputElement.setValue(value);

    searchButton.trigger('click');

    expect(sut.emitted()).not.toHaveProperty('search');
  });

  it('should input clear value when pass clearAfterSearch=true', () => {
    const value = faker.random.words(3);
    const sut = mount<any>(TextInput, {
      props: {
        clearAfterSearch: true,
      }
    });

    const searchButton = sut.get('button');
    const inputElement = sut.get('input');
    inputElement.setValue(value);

    searchButton.trigger('click');

    expect(inputElement.element.value).toEqual('');
  });
});
