<template>
  <tr :class="`table-row${isNew ? ' is-new' : ''}`">
    <td class="name-column">
      <div class="data-value name-column">
        <span
          class="avatar"
          :style="{ backgroundColor: contact.avatarColor }"
          >{{ contact.name ? getFirstLetter(contact.name) : '' }}</span
        >
        <p>{{ contact.name }}</p>
      </div>
    </td>
    <td>
      <div class="data-value">
        <p>{{ contact?.email || '' }}</p>
      </div>
    </td>
    <td>
      <div class="data-value">
        <p>{{ contact?.phone ? formatPhoneNumberMask(contact.phone) : '' }}</p>
      </div>
    </td>
    <td class="action">
      <div class="data-value actions-container">
        <button
          class="action-button"
          type="button"
          :title="`Editar ${contact?.name}`"
          @click="$emit('edit-contact', contact)"
        >
          <img src="@/assets/icons/ic-edit.svg" alt="Edit Icon" />
        </button>
        <button
          class="action-button"
          type="button"
          :title="`Excluir ${contact.name}`"
          @click="$emit('delete-contact', contact)"
        >
          <img src="@/assets/icons/ic-delete.svg" alt="Edit Icon" />
        </button>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { Contact } from '@/models';
import { formatPhoneNumberMask } from '@/utils';

interface TableRowProps {
  contact: Contact;
}

type EmitType = {
  (event: 'edit-contact', contact: Contact): void;
  (event: 'delete-contact', contact: Contact): void;
};

const props = defineProps<TableRowProps>();
defineEmits<EmitType>();

const isNew = ref<boolean>(true);

function getFirstLetter(name: string): string {
  return name.charAt(0);
}

onMounted(() => {
  const time = setInterval(() => {
    const formatedDate = new Date(props.contact.createdAt).getTime() + 10000;
    const difference = formatedDate - new Date().getTime();

    if (difference < 0) {
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
  border-top: 1px solid var(--white);

  &:hover,
  &.is-new {
    background-color: var(--very-light-pink);
  }

  & > td {
    height: 2.5rem;
    padding: 0 0.5rem;

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
