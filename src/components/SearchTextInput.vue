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
      <img
        v-if="theme === 'dark'"
        data-testid="search-icon"
        src="@/assets/icons/ic-search-for-dark.svg"
        alt="Search Icon"
        class="search-icon"
      />
      <img
        v-else
        data-testid="search-icon"
        src="@/assets/icons/ic-search.svg"
        alt="Search Icon"
        class="search-icon"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, withDefaults, inject } from 'vue';

import { GlobalStateType } from '@/contexts/UserSharedPreferences.vue';

export interface TextInputProps {
  clearAfterSearch?: boolean;
  searchOnClick?: boolean;
  placeholder?: string;
  value?: string;
}
export type SearchEmitType = { (event: 'search', value?: string): void };

const { theme } = inject<GlobalStateType>('global-state') || {};

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
  caret-color: var(--search-carret-color);
  color: var(--search-color);
  background-color: var(--search-background-color);
  border-radius: 4px;
  outline: 0;

  &::placeholder {
    color: var(--search-color);
  }
}

.search-icon {
  width: 1rem;
  height: 1rem;
}
</style>
