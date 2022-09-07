<template>
  <transition name="fade">
    <div v-if="$props.open" class="container" data-testid="modal-container">
      <div class="form-container" data-testid="modal-form-container">
        <header class="form-header" data-testid="modal-form-header">
          <h3 class="form-title" data-testid="modal-form-title">{{ title }}</h3>
        </header>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { Contact } from '@/models';

export interface ContactFormProps {
  defaultValues?: Contact;
  open?: boolean;
}

const props = withDefaults(defineProps<ContactFormProps>(), {});
const title = computed(
  () => `${props.defaultValues ? 'Editar' : 'Adicionar'} contato`,
);
defineExpose(props);
</script>

<script lang="ts">
export default {
  name: 'ContactFormModal',
};
</script>

<style scoped lang="scss">
.container {
  z-index: 100;
  position: fixed;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 25.188rem;
  background-color: rgba(0, 0, 0, 0.4);
}

.form-container {
  width: 27rem;
  max-width: calc(100% - 2rem);
  height: 21.375rem;
  max-height: calc(100% - 2rem);
  padding: 1rem 0;
  border-radius: 16px;
  box-shadow: 0 16px 10px 0 var(--black-8-16);
  background-color: var(--white-two);
  display: flex;
  flex-direction: column;
}

.form-header {
  padding: 1rem;
  padding-bottom: 0.78rem;
  padding-top: 0;
  border-bottom: 1px solid var(--border-color);
}

.form-title {
  font-size: 1rem;
  color: var(--dark);
  font-weight: 400;
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
