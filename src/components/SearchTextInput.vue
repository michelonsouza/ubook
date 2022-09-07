<template>
  <div data-testid="text-input-container" class="container">
    <input
      v-bind="$attrs"
      ref="inputRef"
      :value="value"
      class="text-input"
      data-testid="text-input"
      :placeholder="$props.placeholder"
    />
    <button
      data-testid="search-button"
      type="button"
      class="search-button"
      @click="handleSearch"
    >
      <img data-testid="search-icon" src="@/assets/icons/ic-search.svg" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, withDefaults } from 'vue';

export interface TextInputProps {
  clearAfterSearch?: boolean;
  searchOnClick?: boolean;
  placeholder?: string;
  value?: string;
}
export type SearchEmitType = { (event: 'search', value?: string): void };

const props = withDefaults(defineProps<TextInputProps>(), {
  clearAfterSearch: false,
  searchOnClick: true,
});
defineExpose(props);

const inputRef = ref<Ref<HTMLInputElement | null> | null>(null);
const emit = defineEmits<SearchEmitType>();

function handleSearch(): void {
  if (props.searchOnClick) {
    emit('search', inputRef?.value?.value);
  }

  if (inputRef?.value?.value && props.clearAfterSearch && props.searchOnClick) {
    inputRef.value.value = '';
  }
}
</script>

<script lang="ts">
export default {
  name: 'SearchTextInput',
  inheritAttrs: false,
};
</script>

<style scoped lang="scss">
.container {
  height: 2rem;
  border-radius: 4px;
  width: 100%;
  position: relative;
  transition: all 150ms ease;
  border: 1px solid transparent;
  overflow: hidden;
  display: flex;
  align-items: center;

  &:focus-within {
    border-color: var(--light-yellowish-green);
  }
}

.search-button {
  position: absolute;
  right: 0.5rem;
  border: 0;
  background: transparent;
  transition: opacity 150ms ease;

  &:hover {
    opacity: 0.7;
  }
}

.text-input {
  width: 100%;
  max-width: 100%;
  border: 0;
  height: 2rem;
  background: transparent;
  padding: 0.438rem 0.5rem 0.375rem;
  caret-color: var(--bluey-grey);
  color: var(--bluey-grey);
  background-color: var(--pale-grey);
  border-radius: 4px;
  outline: 0;

  &::placeholder {
    color: var(--bluey-grey);
  }
}
</style>
