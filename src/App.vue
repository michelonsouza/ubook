<template>
  <contact-form-modal :open="contactModalIsOpen" @close="closeModal" />
  <div>
    <app-header
      :show-create-button="!!contacts.length"
      @create-contact="openModal"
    />
    <no-content @create-contact="openModal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { AppHeader, NoContent, ContactFormModal } from '@/components';
import { Contact } from '@/models';

const contactModalIsOpen = ref<boolean>(false);
const contacts = ref<Contact[]>([]);

function closeModal() {
  contactModalIsOpen.value = false;
}

function openModal() {
  contactModalIsOpen.value = true;
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
