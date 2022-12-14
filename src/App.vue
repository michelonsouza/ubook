<template>
  <user-shared-preferences>
    <switch-button v-if="showToggleTheme" />
    <contact-form-modal
      :open="contactModalIsOpen"
      :default-values="selectedContactToAction"
      @close="closeContactModal"
      @submit-form="handleCreateContact"
    />
    <delete-contact-modal
      :open="deleteContactModalIsOpen"
      :contact="selectedContactToAction"
      @close="closeDeleteContactModal"
      @delete-contact="handleDeleteContact"
    />
    <app-header
      :show-create-button="!!contacts.length"
      :value="searchText"
      @create-contact="openContactModal"
      @input="handleSearch"
    />
    <div class="content-container">
      <transition name="fade-content" mode="out-in">
        <no-content
          v-if="!computedContacts.length"
          :has-old-values="!!contacts.length"
          @create-contact="openContactModal"
        />
        <contact-table
          v-else-if="!!computedContacts.length && !isMobile"
          class="desktop-data-list"
          :value="computedContacts"
          :order="order"
          @edit-contact="data => handleSelectToAction('edit', data)"
          @delete-contact="data => handleSelectToAction('delete', data)"
          @order="handleChangeOrder"
        />
        <contact-card-list
          v-else-if="!!computedContacts.length && isMobile"
          :value="computedContacts"
          class="mobile-data-list"
          @edit-contact="data => handleSelectToAction('edit', data)"
          @delete-contact="data => handleSelectToAction('delete', data)"
        />
      </transition>
    </div>
  </user-shared-preferences>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

import {
  AppHeader,
  NoContent,
  ContactFormModal,
  DeleteContactModal,
  ContactTable,
  ContactCardList,
  SwitchButton,
} from '@/components';
import UserSharedPreferences from '@/contexts/UserSharedPreferences.vue';
import { Contact } from '@/models';
import { encryptStorage } from '@/utils';

export interface SearchTextInputEvent extends Event {
  target: HTMLInputElement;
}

type Order = 'asc' | 'desc';
type ContactOrderkeys = 'name' | 'email' | 'phone';

interface OrderType {
  key: ContactOrderkeys;
  order: Order;
}

const order = ref<OrderType | undefined>(undefined);
const oldContacts = encryptStorage.getItem<Contact[]>('contacts') || [];
const contactModalIsOpen = ref<boolean>(false);
const deleteContactModalIsOpen = ref<boolean>(false);
const contacts = ref<Contact[]>(oldContacts);
const searchText = ref<string>('');
const selectedContactToAction = ref<Contact | undefined>();
const isMobile = ref<boolean>(window.innerWidth < 768);
const showToggleThemeExists = localStorage.getItem(
  'user-shared-preferences:toggle-theme',
);

const showToggleTheme = computed(() => showToggleThemeExists === 'true');

function handleChangeOrder(newOrder?: OrderType): void {
  order.value = newOrder;
}

function getWindoWidth(event: any): void {
  const width = event.target.innerWidth;

  isMobile.value = width < 768;
}

const computedContacts = computed(() => {
  if (!searchText.value && !order.value) {
    return contacts.value;
  }

  let filteredContacts = contacts.value.filter(contact => {
    const nameExists = contact?.name
      ?.toLowerCase()
      ?.includes(searchText.value.toLowerCase());
    const emailExists = contact?.email
      ?.toLowerCase()
      ?.includes(searchText.value.toLowerCase());
    const phoneExists = contact?.phone
      ?.toLowerCase()
      ?.includes(searchText.value.toLowerCase());

    return nameExists || emailExists || phoneExists;
  });

  if (order.value?.key) {
    const parsedKey = order.value?.key as ContactOrderkeys;
    filteredContacts = filteredContacts.sort((contactA, contactB) => {
      const valueA = contactA[parsedKey] as string;
      const valueB = contactB[parsedKey] as string;

      if (!valueA || !valueB) {
        return 0;
      }

      return valueA.localeCompare(valueB);
    });

    if (order.value?.order === 'desc') {
      filteredContacts = filteredContacts.reverse();
    }
  }

  return filteredContacts;
});

function openContactModal() {
  contactModalIsOpen.value = true;
}

function closeContactModal() {
  contactModalIsOpen.value = false;
  selectedContactToAction.value = undefined;
}

function openDeleteContactModal() {
  deleteContactModalIsOpen.value = true;
}

function closeDeleteContactModal() {
  deleteContactModalIsOpen.value = false;
  selectedContactToAction.value = undefined;
}

function handleEditContact(data: Contact): void {
  closeContactModal();
  const contactExistsIndex = contacts.value.findIndex(
    contact => contact.id === data.id,
  );

  if (contactExistsIndex !== -1) {
    const newValue = contacts.value.map((contact, index) =>
      index !== contactExistsIndex
        ? contact
        : {
            ...contact,
            ...data,
          },
    );

    contacts.value = newValue;
    encryptStorage.setItem('contacts', newValue);
  }
}

function handleCreateContact(data: Contact): void {
  if (selectedContactToAction.value) {
    closeContactModal();
    handleEditContact(data);
    return;
  }

  closeContactModal();
  const newValue = [data, ...contacts.value];
  contacts.value = newValue;

  encryptStorage.setItem('contacts', newValue);
}

function handleDeleteContact(data?: Contact): void {
  closeDeleteContactModal();
  const newValue = contacts.value.filter(contact => contact.id !== data?.id);

  contacts.value = newValue;
  encryptStorage.setItem('contacts', newValue);
}

function handleSelectToAction(type: 'edit' | 'delete', data: Contact): void {
  selectedContactToAction.value = data;
  if (type === 'edit') {
    openContactModal();
    return;
  }
  openDeleteContactModal();
}

function handleSearch(event: Event): void {
  searchText.value = (event as SearchTextInputEvent).target.value || '';
}

onMounted(() => {
  window.addEventListener('resize', getWindoWidth);
  localStorage.setItem('user-shared-preferences:toggle-theme', 'true');
});

onUnmounted(() => {
  window.removeEventListener('resize', getWindoWidth);
});
</script>

<script lang="ts">
export default {
  name: 'RootApp',
};
</script>

<style scoped lang="scss">
.content-container {
  padding: 1rem;
}

.fade-content-enter-active,
.fade-content-leave-active {
  transition: opacity 200ms ease;
}

.fade-content-enter-from,
.fade-content-leave-to {
  opacity: 0;
}
</style>
