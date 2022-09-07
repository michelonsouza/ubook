<template>
  <contact-form-modal :open="open" @close="open = false" />
  <header data-testid="app-header" class="header-container">
    <img
      data-testid="ubook-logo"
      src="@/assets/images/ic-logo.svg"
      alt="Ubook Logo"
    />
    <div class="action-container">
      <create-button @click="open = true" />
      <search-text-input
        placeholder="Buscar..."
        @search="handleSearchContact"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

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
const open = ref<boolean>(false);

function closeOnEsc(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    open.value = false;
  }
}

function handleSearchContact(value?: string): void {
  emits('search-contact', value);
}

onMounted(() => {
  window.addEventListener('keydown', closeOnEsc);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', closeOnEsc);
});
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
