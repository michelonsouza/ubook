<template>
  <modal-wrapper :open="open" :title="title" @close="$emit('close')">
    <Form
      v-slot="{ meta, values }"
      :initial-values="defaultValues"
      @submit="onSubmit"
    >
      <div class="form-wrapper">
        <div class="field-container">
          <Field v-slot="{ field }" name="name">
            <label for="name">Nome</label>
            <input id="name" v-bind="field" type="text" />
            <ErrorMessage name="name" />
          </Field>
        </div>
        <div class="field-container">
          <Field v-slot="{ field }" name="email" rules="email">
            <label for="email">E-mail</label>
            <input id="email" v-bind="field" type="text" />
            <ErrorMessage name="email" />
          </Field>
        </div>
        <div class="field-container phone-field-container">
          <Field v-slot="{ field }" name="phone" rules="phone">
            <label for="phone-number">Telefone</label>
            <input
              id="phone-number"
              v-maska="mask"
              v-bind="field"
              type="text"
            />
            <ErrorMessage name="phone" />
          </Field>
        </div>
      </div>
      <div class="form-footer">
        <button
          class="action-button cancel-button"
          type="button"
          data-testid="cancel-button"
          @click="$emit('close')"
        >
          Cancelar
        </button>
        <button
          class="action-button submit-button"
          type="submit"
          data-testid="submit-button"
          :disabled="
            !meta.valid ||
            (!meta.touched && !meta.valid) ||
            (!values.email && !values.phone && !values.name)
          "
        >
          Salvar
        </button>
      </div>
    </Form>
  </modal-wrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { maska } from 'maska';
import { v4 as uuid } from 'uuid';
import { Form, Field, ErrorMessage } from 'vee-validate';

import { Contact } from '@/models';
import { generateRandomColor } from '@/utils';

import ModalWrapper from './ModalWrapper.vue';

export interface ClickEvent extends MouseEvent {
  target: HTMLElement;
}

export interface ContactFormProps {
  defaultValues?: Partial<Contact>;
  open?: boolean;
}

export type EmitsType = {
  (event: 'close'): void;
  (event: 'submit-form', value: Contact): void;
};

// exposes `v-maska` directive
const vMaska = maska;

const mask = ['(##) ####-####', '(##) #####-####'];

const props = defineProps<ContactFormProps>();
const emit = defineEmits<EmitsType>();

const title = computed(
  () =>
    `${
      props.defaultValues?.name ||
      props.defaultValues?.email ||
      props.defaultValues?.phone
        ? 'Editar'
        : 'Criar novo'
    } contato`,
);
defineExpose(props);

function onSubmit(data: Partial<Contact>): void {
  const id = props?.defaultValues?.id || uuid();
  const avatarColor =
    props?.defaultValues?.avatarColor || generateRandomColor();
  const createdAt = props?.defaultValues?.createdAt || new Date().toISOString();
  const phone = data?.phone
    ? data.phone.replaceAll(/[()\s-]/gi, '')
    : data?.phone;
  const formatedData: Contact = {
    ...(props?.defaultValues || {}),
    ...data,
    id,
    avatarColor,
    createdAt,
    phone,
  };
  emit('submit-form', formatedData);
}
</script>

<script lang="ts">
export default {
  name: 'ContactFormModal',
};
</script>

<style scoped lang="scss">
.form-wrapper {
  width: 100%;
  padding: 1.3rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  transition: all 150ms ease;
}

.cancel-button {
  color: var(--accent-color);

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.submit-button {
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16),
    0 0 0 0.5px var(--black-8), inset 0 0 0 0.5px var(--black-8),
    0 2px 4px 0.5px var(--black-8-16);
  background-color: var(--accent-color);
  color: var(--white-two);

  &:disabled {
    opacity: 0.32;
    cursor: not-allowed;
  }
}

.field-container {
  display: flex;
  flex-direction: column;

  &.phone-field-container {
    width: 8rem;
  }

  & > input {
    border-radius: 4px;
    border: solid 1px var(--border-color);
    background-color: var(--paper-color);
    height: 2rem;
    caret-color: var(--bluey-grey);
    //color: var(--dark);
    color: inherit;
    padding-left: 0.5rem;
  }

  & > span[role='alert'] {
    color: var(--accent-color);
  }
}
</style>
