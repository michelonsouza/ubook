<template>
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
    <contact-table
      v-if="!!computedContacts.length"
      :value="computedContacts"
      @edit-contact="data => handleSelectToAction('edit', data)"
      @delete-contact="data => handleSelectToAction('delete', data)"
    />
    <no-content v-else @create-contact="openContactModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import {
  AppHeader,
  NoContent,
  ContactFormModal,
  DeleteContactModal,
  ContactTable,
} from '@/components';
import { Contact } from '@/models';
import { encryptStorage } from '@/utils';

export interface SearchTextInputEvent extends Event {
  target: HTMLInputElement;
}

const oldContacts = encryptStorage.getItem<Contact[]>('contacts') || [];
const contactModalIsOpen = ref<boolean>(false);
const deleteContactModalIsOpen = ref<boolean>(false);
const contacts = ref<Contact[]>(oldContacts);
const searchText = ref<string>('');
const selectedContactToAction = ref<Contact | undefined>();

const computedContacts = computed(() => {
  if (!searchText.value) {
    return contacts.value;
  }

  return contacts.value.filter(contact => {
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
  closeContactModal();
  if (selectedContactToAction.value) {
    handleEditContact(data);
    return;
  }

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
</script>

<style scoped lang="scss">
.content-container {
  padding: 1rem;
}
</style>
