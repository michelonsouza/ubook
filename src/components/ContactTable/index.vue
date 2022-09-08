<template>
  <div class="table-wrapper">
    <table class="table-container">
      <tr class="table-row table-head">
        <th class="name-column">Contatos</th>
        <th>Email</th>
        <th>Telefone</th>
        <th></th>
      </tr>
      <table-row
        v-for="contact in value"
        :key="contact.id"
        :contact="contact"
        @edit-contact="$emit('edit-contact', contact)"
        @delete-contact="$emit('delete-contact', contact)"
      />
    </table>
  </div>
</template>

<script setup lang="ts">
import { Contact } from '@/models';

import TableRow from './TableRow.vue';

interface ContactTableProps {
  value: Contact[];
}

type EmitType = {
  (event: 'edit-contact', contact: Contact): void;
  (event: 'delete-contact', contact: Contact): void;
};

defineProps<ContactTableProps>();
defineEmits<EmitType>();
</script>

<script lang="ts">
export default {
  name: 'ContactTable',
};
</script>

<style scoped lang="scss">
.table-wrapper {
  border: 1px solid var(--white);
  border-radius: 4px;
  background-color: var(--white-two);
}
.table-container {
  border-radius: 4px;
  width: 100%;
  border-collapse: collapse;
}
.table-row.table-head {
  height: 2.5rem;
  transition: background-color 150ms ease;

  & > th {
    border-bottom: 1px solid var(--white);
    text-align: left;
    padding: 0 0.5rem;
    color: var(--bluey-grey);

    &.name-column {
      padding-left: 3rem;
    }
  }
}
</style>
