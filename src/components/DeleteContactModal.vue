<template>
  <modal-wrapper :open="open" title="Excluir contato" @close="handleClose">
    <div class="content-container">
      <p>Deseja realmente excluir o contato?</p>
    </div>
    <template #footer>
      <div class="action-container">
        <button
          class="action-button cancel-button"
          type="button"
          data-testid="cancel-button"
          @click="$emit('close')"
        >
          Cancelar
        </button>
        <button
          class="action-button delete-button"
          type="button"
          data-testid="submit-button"
          @click="handleDeleteContact"
        >
          Excluir
        </button>
      </div>
    </template>
  </modal-wrapper>
</template>

<script setup lang="ts">
import { Contact } from '@/models';

import ModalWrapper from './ModalWrapper.vue';

interface DeleteContactModalProps {
  open?: boolean;
  contact: Contact;
}

type EmitType = {
  (event: 'close'): void;
  (event: 'delete-content', contact: Contact): void;
};

const props = defineProps<DeleteContactModalProps>();
const emit = defineEmits<EmitType>();

function handleClose(): void {
  emit('close');
}

function handleDeleteContact() {
  emit('delete-content', props.contact);
}
</script>

<script lang="ts">
export default {
  name: 'DeleteContactModal',
};
</script>

<style scoped lang="scss">
.content-container {
  padding: 1.219rem 1.125rem 3.563rem 1.5rem;
}

.action-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}

.action-button {
  height: 2rem;
  display: flex;
  align-items: center;
  width: fit-content;
  font-size: 0.875rem;
  font-weight: 500;
  border: 0;
  background: transparent;
  border-radius: 16px;
  padding: 0.5rem 1rem;
}

.cancel-button {
  color: var(--accent-color);
}

.delete-button {
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16),
    0 0 0 0.5px var(--black-8), inset 0 0 0 0.5px var(--black-8),
    0 2px 4px 0.5px var(--black-8-16);
  background-color: var(--accent-color);
  color: var(--white-two);

  &:disabled {
    opacity: 0.32;
  }
}
</style>
