<template>
  <div class="container">
    <img
      class="no-content-icon"
      src="@/assets/icons/ic-book.svg"
      alt="Book Icon"
    />
    <p class="no-content-description">Nenhum contato foi criado ainda.</p>
    <create-button
      class="no-content-create-button"
      @click="$emit('create-contact')"
    />
  </div>
</template>

<script setup lang="ts">
import CreateButton from './CreateButton.vue';

export type EmitType = { (event: 'create-contact'): void };
defineEmits<EmitType>();
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
  min-height: calc(100vh - 66px);

  @media (max-width: 768px) {
    min-height: calc(100vh - 114px);
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
