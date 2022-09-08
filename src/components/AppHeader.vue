<template>
  <header data-testid="app-header" class="header-container">
    <img
      data-testid="ubook-logo"
      class="ubook-logo"
      src="@/assets/images/ic-logo.svg"
      alt="Ubook Logo"
    />
    <div class="action-container">
      <create-button v-if="showCreateButton" @click="$emit('create-contact')" />
      <search-text-input
        placeholder="Buscar..."
        :value="value"
        @search="handleSearchContact"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { CreateButton, SearchTextInput } from '@/components';

export interface AppHeaderProps {
  value?: string;
  showCreateButton?: boolean;
}
export type EmitTypes = {
  (event: 'search-contact', value?: string): void;
  (event: 'create-contact'): void;
};

const emits = defineEmits<EmitTypes>();
defineProps<AppHeaderProps>();

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
  position: sticky;
  top: 0;
  background-color: var(--background);

  & > img {
    width: 147px;
    height: 32px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    & > img {
      align-self: center;
    }
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
