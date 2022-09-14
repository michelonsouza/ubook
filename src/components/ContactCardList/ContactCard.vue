<template>
  <div :class="`card-container${isNew ? ' is-new' : ''}`">
    <span
      class="avatar"
      :style="{ backgroundColor: contact.avatarColor }"
      aria-label="Avatar"
      >{{ contact.name ? getFirstLetter(contact.name) : 'U' }}</span
    >
    <div class="info-container">
      <p>{{ contact?.name || 'N/A' }}</p>
      <p>{{ contact?.email || 'N/A' }}</p>
      <p>
        {{ contact?.phone ? formatPhoneNumberMask(contact.phone) : 'N/A' }}
      </p>
    </div>
    <div class="actions-container">
      <button
        class="action-button"
        type="button"
        :aria-label="`Editar ${contact?.name}`"
        :title="`Editar ${contact?.name}`"
        data-testid="edit-action"
        @click="$emit('edit-contact')"
      >
        <img src="@/assets/icons/ic-edit.svg" alt="Edit Icon" />
      </button>
      <button
        class="action-button"
        type="button"
        :aria-label="`Excluir ${contact.name}`"
        :title="`Excluir ${contact.name}`"
        data-testid="delete-action"
        @click="$emit('delete-contact')"
      >
        <img src="@/assets/icons/ic-delete.svg" alt="Delete Icon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { Contact } from '@/models';
import { formatPhoneNumberMask, verifyIsNewContact } from '@/utils';

interface ContactCardProps {
  contact: Contact;
}

type EmitType = {
  (event: 'edit-contact'): void;
  (event: 'delete-contact'): void;
};

const props = defineProps<ContactCardProps>();
defineEmits<EmitType>();

const isNew = ref<boolean>(verifyIsNewContact(props.contact.createdAt));

function getFirstLetter(name: string): string {
  return name.charAt(0);
}

onMounted(() => {
  /* c8 ignore next 8 */
  const time = setInterval(() => {
    const isNewContact = verifyIsNewContact(props.contact.createdAt);

    if (!isNewContact) {
      isNew.value = false;
      clearInterval(time);
    }
  }, 1000);
});
</script>

<script lang="ts">
export default {
  name: 'ContactCard',
};
</script>

<style scoped lang="scss">
.card-container {
  display: flex;
  padding: 0.5rem;
  border-radius: 4px;
  align-items: center;
  width: 100%;
  min-height: 5.625rem;
  gap: 1rem;
  border: 1px solid var(--white);
  background-color: var(--white-two);
  transition: background-color 150ms ease;

  &:hover,
  &.is-new {
    background-color: var(--very-light-pink);
  }
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  min-width: 3rem;
  height: 3rem;
  min-height: 3rem;
  border-radius: 50%;
  color: var(--white-two);
  font-size: 1.5rem;
  line-height: 1rem;
  text-transform: uppercase;
}

.info-container {
  display: flex;
  flex-direction: column;
  color: var(--dark);
  font-size: 1rem;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  & * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.actions-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;
}
.action-button {
  border: 0;
  background-color: transparent;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  & > img {
    width: 1rem;
    height: 1rem;
  }
}
</style>
