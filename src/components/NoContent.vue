<template>
  <div class="container">
    <img
      class="no-content-icon"
      src="@/assets/icons/ic-book.svg"
      alt="Book Icon"
    />
    <p class="no-content-description">{{ title }}</p>
    <create-button
      class="no-content-create-button"
      @click="$emit('create-contact')"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import CreateButton from './CreateButton.vue';

interface NoContentProps {
  hasOldValues?: boolean;
}

type EmitType = { (event: 'create-contact'): void };
defineEmits<EmitType>();
const props = defineProps<NoContentProps>();

const title = computed(() => {
  const selectedTitle = props.hasOldValues
    ? 'Nenhum contato encontrado.'
    : 'Nenhum contato foi criado ainda.';

  return selectedTitle;
});
</script>

<script lang="ts">
export default {
  name: 'NoContent',
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  min-height: calc(100vh - 98px);

  @media (max-width: 768px) {
    min-height: calc(100vh - 146px);
  }
}

.no-content-icon {
  width: 14.813rem;
  height: 12.5rem;
  object-fit: contain;
}

.no-content-create-button {
  height: 2.5rem;
}
</style>
