<template>
  <contact-form-modal :open="contactModalIsOpen" @close="closeContactModal" />
  <delete-contact-modal
    :open="deleteContactModalIsOpen"
    @close="closeDeleteContactModal"
  />
  <app-header
    :show-create-button="!!contacts.length"
    @create-contact="openContactModal"
  />
  <div class="content-container">
    <contact-table v-if="!!contacts.length" :value="contacts" />
    <no-content v-else @create-contact="openContactModal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import {
  AppHeader,
  NoContent,
  ContactFormModal,
  DeleteContactModal,
  ContactTable,
} from '@/components';
import { mockContacts } from '@/mocks/contacts';
import { Contact } from '@/models';

const contactModalIsOpen = ref<boolean>(false);
const deleteContactModalIsOpen = ref<boolean>(false);
const contacts = ref<Contact[]>(mockContacts);

function closeContactModal() {
  contactModalIsOpen.value = false;
}

function openContactModal() {
  contactModalIsOpen.value = true;
}

function closeDeleteContactModal() {
  deleteContactModalIsOpen.value = false;
}

// function openDeleteContactModal() {
//   deleteContactModalIsOpen.value = true;
// }
</script>

<style scoped lang="scss">
.content-container {
  padding: 1rem;
}
</style>
