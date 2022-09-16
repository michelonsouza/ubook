<template>
  <div
    class="root"
    :title="`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`"
    role="presentation"
    @click="toggleTheme"
  >
    <div class="container">
      <div class="track" />
      <div :class="`circle${isActive ? ' active' : ''}`">
        <transition name="slide" mode="out-in">
          <light-icon v-if="theme === 'light'" />
          <dark-icon v-else />
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';

import {
  GlobalStateType,
  UpdateThemeFnType,
} from '@/contexts/UserSharedPreferences.vue';

import DarkIcon from './DarkIcon.vue';
import LightIcon from './LightIcon.vue';

const { theme } = inject<GlobalStateType>('global-state') || {};
const updateTheme = inject<UpdateThemeFnType>('update-theme');

const isActive = computed(
  () => typeof theme === 'object' && theme?.value === 'dark',
);

function toggleTheme() {
  const newValue =
    typeof theme === 'object' && theme.value === 'dark' ? 'light' : 'dark';

  if (updateTheme) {
    updateTheme(newValue);
  }
}
</script>

<script lang="ts">
export default {
  name: 'SwitchButton',
};
</script>

<style scoped lang="scss">
.root {
  position: fixed;
  max-width: fit-content;
  bottom: 1rem;
  left: 1rem;
  z-index: 100;
  cursor: pointer;

  @media (max-width: 768px) {
    top: 1.4rem;
    right: 1rem;
    bottom: initial;
    left: initial;
  }
}
.container {
  display: flex;
  align-items: center;
  position: relative;
  color: inherit;
  max-width: fit-content;
}

.track {
  width: 50px;
  height: 20px;
  border-radius: 10px;
  background-color: var(--border-color);
}

:root:not(.dark) {
  & .track {
    background-color: var(--white);
  }
}

.circle {
  width: 30px;
  min-width: 30px;
  height: 30px;
  min-height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--accent-color);
  box-shadow: 0 0 4px 3px rgba(255, 255, 255, 0.1);
  position: absolute;
  color: var(--white-two);
  transition: all 200ms ease;
  overflow: hidden;

  &.active {
    margin-left: calc(100% - 30px);
  }
}

:root:not(.dark) {
  & .circle {
    box-shadow: 0 0 4px 3px rgba(0, 0, 0, 0.05);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 100ms ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(12px);
  opacity: 0;
}
</style>
