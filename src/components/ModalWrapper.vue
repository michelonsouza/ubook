<template>
  <transition name="fade">
    <div
      v-if="open"
      role="presentation"
      class="container"
      data-testid="modal-container"
      @click="modalClose"
    >
      <div
        class="modal-content-container"
        data-testid="modal-content-container"
      >
        <slot v-if="showHeader" name="header">
          <header class="modal-header" data-testid="modal-header">
            <h3 class="modal-title" data-testid="modal-title">{{ title }}</h3>
          </header>
        </slot>
        <slot :open="open" />
        <div v-if="showFooter" class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed, useSlots } from 'vue';

export interface ClickEvent extends MouseEvent {
  target: HTMLElement;
}

export interface ModalProps {
  open?: boolean;
  title?: string;
}

export type EmitsType = {
  (event: 'close'): void;
};

const slots = useSlots();

const props = defineProps<ModalProps>();
const emit = defineEmits<EmitsType>();

const showFooter = computed(() => !!slots?.footer);
const showHeader = computed(() => !!props?.title);

function modalClose(event: MouseEvent): void {
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
  name: 'ModalWrapper',
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

.modal-content-container {
  width: 27rem;
  max-width: calc(100% - 2rem);
  max-height: calc(100% - 2rem);
  padding: 1rem 0;
  border-radius: 16px;
  box-shadow: 0 16px 10px 0 var(--black-8-16);
  background-color: var(--white-two);
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 1rem;
  padding-bottom: 0.78rem;
  padding-top: 0;
  border-bottom: 1px solid var(--border-color);
}

.modal-footer {
  padding: 1rem;
  padding-top: 0.938rem;
  padding-bottom: 0;
  border-top: 1px solid var(--border-color);
}

.modal-title {
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
