<template>
  <div class="container">
    <contact-card
      v-for="contact in value"
      :key="contact.id"
      :contact="contact"
      @edit-contact="$emit('edit-contact', contact)"
      @delete-contact="$emit('delete-contact', contact)"
    />
  </div>
</template>

<script setup lang="ts">
import { Contact } from '@/models';

import ContactCard from './ContactCard.vue';

interface ContactCardListProps {
  value: Contact[];
}

type EmitType = {
  (event: 'edit-contact', contact: Contact): void;
  (event: 'delete-contact', contact: Contact): void;
};

defineProps<ContactCardListProps>();
defineEmits<EmitType>();
</script>

<script lang="ts">
export default {
  name: 'ContactCardList',
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
}
</style>
