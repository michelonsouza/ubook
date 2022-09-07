<template>
  <contact-form-modal />
  <header data-testid="app-header" class="header-container">
    <img
      data-testid="ubook-logo"
      src="@/assets/images/ic-logo.svg"
      alt="Ubook Logo"
    />
    <div class="action-container">
      <create-button @click="$emit('create-contact')" />
      <search-text-input
        placeholder="Buscar..."
        @search="handleSearchContact"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { CreateButton, SearchTextInput, ContactFormModal } from '@/components';

export interface AppHeaderProps {
  clearAfterSearch?: boolean;
  searchOnClick?: boolean;
  placeholder?: string;
  value?: string;
}
export type EmitTypes = {
  (event: 'search-contact', value?: string): void;
  (event: 'create-contact'): void;
};

const emits = defineEmits<EmitTypes>();

function handleSearchContact(value?: string): void {
  emits('search-contact', value);
}
</script>

<script lang="ts">
export default {
  name: 'AppHeader',
};
</script>

<style scoped lang="scss">
.header-container {
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 3.75rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

.action-container {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
  }
}
</style>
