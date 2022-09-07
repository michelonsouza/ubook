<template>
  <transition name="fade">
    <div
      v-if="open"
      role="presentation"
      class="container"
      data-testid="modal-container"
      @click="handleClose"
    >
      <div class="form-container" data-testid="modal-form-container">
        <header class="form-header" data-testid="modal-form-header">
          <h3 class="form-title" data-testid="modal-form-title">{{ title }}</h3>
        </header>
        <Form
          v-slot="{ meta }"
          :initial-values="defaultValues"
          @submit="onSubmit"
        >
          <div class="form-wrapper">
            <div class="field-container">
              <Field v-slot="{ field }" name="name" rules="required">
                <label for="name">Nome</label>
                <input id="name" v-bind="field" type="text" />
                <ErrorMessage name="name" />
              </Field>
            </div>
            <div class="field-container">
              <Field v-slot="{ field }" name="email" rules="required|email">
                <label for="email">E-mail</label>
                <input id="email" v-bind="field" type="text" />
                <ErrorMessage name="email" />
              </Field>
            </div>
            <div class="field-container phone-field-container">
              <Field v-slot="{ field }" name="phone" rules="required|phone">
                <label for="phone-number">Telefone</label>
                <!-- @ts-ignore-start -->
                <input
                  id="phone-number"
                  v-maska="['(##) ####-####', '(##) #####-####']"
                  v-bind="field"
                  type="text"
                />
                <ErrorMessage name="phone" />
                <!-- @ts-ignore-end -->
              </Field>
            </div>
          </div>
          <footer class="form-footer">
            <button
              class="action-button cancel-button"
              type="button"
              @click="$emit('close')"
            >
              Cancelar
            </button>
            <button
              class="action-button submit-button"
              type="submit"
              :disabled="!meta.valid"
            >
              Salvar
            </button>
          </footer>
        </Form>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue';

import { maska } from 'maska';
import { v4 as uuid } from 'uuid';
import { Form, Field, ErrorMessage } from 'vee-validate';

import { Contact } from '@/models';

export interface ClickEvent extends MouseEvent {
  target: HTMLElement;
}

export interface ContactFormProps {
  defaultValues?: Contact;
  open?: boolean;
}

export type EmitsType = {
  (event: 'close'): void;
  (event: 'submit-form', value: Partial<Contact>): void;
};

// exposes `v-maska` directive
const vMaska = maska;

const props = withDefaults(defineProps<ContactFormProps>(), {
  defaultValues: {
    id: uuid(),
  },
});
const emit = defineEmits<EmitsType>();

const title = computed(
  () => `${props.defaultValues ? 'Editar' : 'Criar novo'} contato`,
);
defineExpose(props);

function onSubmit(data: Partial<Contact>): void {
  emit('submit-form', {
    ...(props.defaultValues || {}),
    ...data,
    createdAt: new Date().toISOString(),
  });
}

function handleClose(event: MouseEvent): void {
  if ((event as ClickEvent).target.dataset.testid === 'modal-container') {
    emit('close');
  }
}

function closeOnEsc(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    emit('close');
  }
}

onMounted(() => {
  window.addEventListener('keydown', closeOnEsc);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', closeOnEsc);
});
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
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
}

.form-container {
  width: 27rem;
  max-width: calc(100% - 2rem);
  //height: 21.375rem;
  max-height: calc(100% - 2rem);
  padding: 1rem 0;
  border-radius: 16px;
  box-shadow: 0 16px 10px 0 var(--black-8-16);
  background-color: var(--white-two);
  display: flex;
  flex-direction: column;
}

.form-wrapper {
  width: 100%;
  padding: 1.3rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-header {
  padding: 1rem;
  padding-bottom: 0.78rem;
  padding-top: 0;
  border-bottom: 1px solid var(--border-color);
}

.form-footer {
  padding: 1rem;
  padding-top: 0.938rem;
  padding-bottom: 0;
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}

.action-button {
  height: 2rem;
  display: flex;
  align-items: center;
  width: fit-content;
  font-size: 0.875rem;
  font-weight: 500;
  border: 0;
  background: transparent;
  border-radius: 16px;
  padding: 0.5rem 1rem;
}

.cancel-button {
  color: var(--accent-color);
}

.submit-button {
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16),
    0 0 0 0.5px var(--black-8), inset 0 0 0 0.5px var(--black-8),
    0 2px 4px 0.5px var(--black-8-16);
  background-color: var(--accent-color);
  color: var(--white-two);

  &:disabled {
    opacity: 0.32;
  }
}

.form-title {
  font-size: 1rem;
  color: var(--dark);
  font-weight: 400;
  margin: 0;
}

.field-container {
  display: flex;
  flex-direction: column;

  &.phone-field-container {
    width: 8rem;
  }

  & > input {
    border-radius: 4px;
    border: solid 1px #c0c3d2;
    background-color: var(--white-two);
    height: 2rem;
    caret-color: var(--bluey-grey);
    color: var(--dark);
    padding-left: 0.5rem;
  }

  & > span[role='alert'] {
    color: var(--accent-color);
  }
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
