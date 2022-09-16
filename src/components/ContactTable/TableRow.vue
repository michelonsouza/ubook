<template>
  <tr :class="`table-row${isNew ? ' is-new' : ''}`" data-testid="table-row">
    <td class="name-column" data-testid="name-column">
      <div class="data-value name-column">
        <span
          class="avatar"
          aria-label="Avatar"
          :style="{ backgroundColor: contact.avatarColor }"
          >{{ contact?.name ? getFirstLetter(contact.name) : 'U' }}</span
        >
        <p>{{ contact?.name || 'N/A' }}</p>
      </div>
    </td>
    <td>
      <div class="data-value" data-testid="email-column">
        <p>{{ contact?.email || 'N/A' }}</p>
      </div>
    </td>
    <td>
      <div class="data-value" data-testid="phone-column">
        <p>
          {{ contact?.phone ? formatPhoneNumberMask(contact.phone) : 'N/A' }}
        </p>
      </div>
    </td>
    <td class="action" data-testid="action-column">
      <div class="data-value actions-container">
        <button
          class="action-button"
          type="button"
          :aria-label="`Editar ${contact?.name}`"
          :title="`Editar ${contact?.name}`"
          data-testid="edit-action"
          @click="$emit('edit-contact')"
        >
          <img
            v-if="theme === 'dark'"
            src="@/assets/icons/ic-edit-for-dark.svg"
            alt="Edit Icon"
          />
          <img v-else src="@/assets/icons/ic-edit.svg" alt="Edit Icon" />
        </button>
        <button
          class="action-button"
          type="button"
          :aria-label="`Excluir ${contact.name}`"
          :title="`Excluir ${contact.name}`"
          data-testid="delete-action"
          @click="$emit('delete-contact')"
        >
          <img
            v-if="theme === 'dark'"
            src="@/assets/icons/ic-delete-for-dark.svg"
            alt="Delete Icon"
          />
          <img v-else src="@/assets/icons/ic-delete.svg" alt="Delete Icon" />
        </button>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue';

import { GlobalStateType } from '@/contexts/UserSharedPreferences.vue';
import { Contact } from '@/models';
import { formatPhoneNumberMask, verifyIsNewContact } from '@/utils';

interface TableRowProps {
  contact: Contact;
}

type EmitType = {
  (event: 'edit-contact'): void;
  (event: 'delete-contact'): void;
};

const { theme } = inject<GlobalStateType>('global-state') || {};

const props = defineProps<TableRowProps>();
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
  name: 'TableRow',
};
</script>

<style scoped lang="scss">
.table-row {
  height: 2.5rem;
  transition: background-color 150ms ease;
  border-top: 1px solid var(--border-color);
  color: inherit;

  &:hover,
  &.is-new {
    background-color: var(--very-light-pink);
  }

  & > td {
    height: 2.5rem;
    padding: 0 0.5rem;
    color: inherit;

    &.action {
      text-align: right;
    }

    & > .data-value {
      display: flex;
      align-items: center;
      max-width: fit-content;
      &.name-column {
        gap: 1rem;
      }

      &.actions-container {
        gap: 1rem;
        justify-content: flex-end;
        max-width: initial;
        padding-left: 0.5rem;
      }
    }
  }
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

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  min-width: 1.5rem;
  height: 1.5rem;
  min-height: 1.5rem;
  border-radius: 50%;
  color: var(--white-two);
  font-size: 1rem;
  line-height: 1rem;
  text-transform: uppercase;
}
</style>
