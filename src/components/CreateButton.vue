<template>
  <button data-testid="create-button" class="create-button" v-bind="$attrs">
    <img
      data-testid="plus-icon"
      src="@/assets/icons/ic-plus.svg"
      alt="Plus icon"
    />
    <span data-testid="button-text">Criar contato</span>
  </button>
</template>

<script lang="ts">
export default {
  name: 'CreateButton',
};
</script>

<style scoped lang="scss">
.create-button {
  width: 9rem;
  min-width: 9rem;
  height: 2rem;
  padding: 0.5rem 1.375rem 0.5rem 1rem;
  border-radius: 20px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16),
    0 0 0 0.5px var(--black-8), inset 0 0 0 0.5px var(--black-8),
    0 2px 4px 0.5px var(--black-8-16);
  background-color: var(--light-yellowish-green);
  border: 0;
  color: var(--accent-color);
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: opacity 150ms ease;

  &:hover {
    opacity: 0.7;
  }

  & > img {
    width: 1rem;
    height: 1rem;
  }
}
</style>
