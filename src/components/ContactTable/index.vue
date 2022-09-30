<template>
  <div class="table-wrapper">
    <table class="table-container" data-testid="contact-table">
      <tr class="table-row table-head" data-testid="table-head-row">
        <th
          data-testid="th-name-column"
          class="name-column"
          role="presentation"
          @click="handleOrder('name')"
        >
          Contatos
          <img
            v-if="theme === 'dark' && getShowOrder('name')"
            :class="`order-icon${order?.order === 'desc' ? ' arrow-down' : ''}`"
            src="@/assets/icons/ic-arrow-up-dark.svg"
            alt="Arrow Icon"
          />
          <img
            v-if="theme !== 'dark' && getShowOrder('name')"
            :class="`order-icon${order?.order === 'desc' ? ' arrow-down' : ''}`"
            src="@/assets/icons/ic-arrow-up.svg"
            alt="Arrow Icon"
          />
          <span v-if="!getShowOrder('name')" class="fake-icon">&nbsp;</span>
        </th>
        <th
          data-testid="th-email-column"
          role="presentation"
          @click="handleOrder('email')"
        >
          Email
          <img
            v-if="theme === 'dark' && getShowOrder('email')"
            :class="`order-icon${order?.order === 'desc' ? ' arrow-down' : ''}`"
            src="@/assets/icons/ic-arrow-up-dark.svg"
            alt="Arrow Icon"
          />
          <img
            v-if="theme !== 'dark' && getShowOrder('email')"
            :class="`order-icon${order?.order === 'desc' ? ' arrow-down' : ''}`"
            src="@/assets/icons/ic-arrow-up.svg"
            alt="Arrow Icon"
          />
          <span v-if="!getShowOrder('email')" class="fake-icon">&nbsp;</span>
        </th>
        <th
          data-testid="th-phone-column"
          role="presentation"
          @click="handleOrder('phone')"
        >
          Telefone
          <img
            v-if="theme === 'dark' && getShowOrder('phone')"
            :class="`order-icon${order?.order === 'desc' ? ' arrow-down' : ''}`"
            src="@/assets/icons/ic-arrow-up-dark.svg"
            alt="Arrow Icon"
          />
          <img
            v-if="theme !== 'dark' && getShowOrder('phone')"
            :class="`order-icon${order?.order === 'desc' ? ' arrow-down' : ''}`"
            src="@/assets/icons/ic-arrow-up.svg"
            alt="Arrow Icon"
          />
          <span v-if="!getShowOrder('phone')" class="fake-icon">&nbsp;</span>
        </th>
        <th data-testid="th-actions-column" style="width: 90px"></th>
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
import { inject } from 'vue';

import { GlobalStateType } from '@/contexts/UserSharedPreferences.vue';
import { Contact } from '@/models';

import TableRow from './TableRow.vue';

type Order = 'asc' | 'desc';

type OrderType = {
  key: 'name' | 'email' | 'phone';
  order: Order;
};

interface ContactTableProps {
  value: Contact[];
  order?: OrderType;
}

type EmitType = {
  (event: 'edit-contact', contact: Contact): void;
  (event: 'delete-contact', contact: Contact): void;
  (event: 'order', order?: OrderType): void;
};

const { theme } = inject<GlobalStateType>('global-state') || {};

const props = defineProps<ContactTableProps>();
const emits = defineEmits<EmitType>();

function handleOrder(key: 'name' | 'email' | 'phone'): void {
  if (!props?.order) {
    emits('order', { key, order: 'asc' });
  }

  const { order, key: oldKey } = props?.order || {};
  let newOrder: 'asc' | 'desc' = 'asc';

  if (key === oldKey && order === 'desc') {
    emits('order', undefined);
    return;
  }

  if (key === oldKey) {
    newOrder = order === 'asc' ? 'desc' : 'asc';
  }

  emits('order', { key, order: newOrder });
}

function getShowOrder(key: 'name' | 'email' | 'phone'): boolean {
  if (!props?.order) {
    return false;
  }

  return props.order.key === key;
}
</script>

<script lang="ts">
export default {
  name: 'ContactTable',
};
</script>

<style scoped lang="scss">
.table-wrapper {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--paper-color);
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
    border-bottom: 1px solid var(--border-color);
    text-align: left;
    padding: 0 0.5rem;
    color: var(--bluey-grey);

    &:not([data-testid='th-actions-column']) {
      cursor: pointer;
    }

    &.name-column {
      padding-left: 3rem;
    }
  }
}

:root.dark .table-row.table-head > th {
  color: var(--white);
}

.fake-icon {
  margin-left: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
  display: inline-block;
  transform: translateY(2px);
}
.order-icon {
  margin-left: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
  transform: translateY(2px);
  transition: transform 200ms ease;
  &.arrow-down {
    transform: rotate(180deg) translateY(-4px);
  }
}
</style>
