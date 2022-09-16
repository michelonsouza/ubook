<template>
  <slot />
</template>

<script setup lang="ts">
import { toRefs, readonly, provide, reactive, onMounted, Ref } from 'vue';

export type Theme = 'light' | 'dark';

export interface GlobalStateType {
  theme: Ref<Theme>;
  showToggleTheme: Ref<boolean>;
}

export type UpdateThemeFnType = (theme: Theme) => void;
export type UpdateShowToggleThemeFnType = (value: boolean) => void;

const html = document.querySelector('html') as unknown as HTMLElement;

const userTheme: 'light' | 'dark' | null = localStorage.getItem(
  'user-shared-preferences:theme',
) as 'light' | 'dark' | null;
const showToggleThemeExists =
  (localStorage.getItem('user-shared-preferences:toggle-theme') as
    | 'true'
    | 'false'
    | null) || 'true';
const state = reactive({
  theme: userTheme || 'light',
  showToggleTheme: showToggleThemeExists === 'true',
});

provide('global-state', toRefs(readonly(state)));

const updateShowToggleTheme = (value: boolean): void => {
  state.showToggleTheme = value;
};

const updateTheme = (value: 'light' | 'dark'): void => {
  state.theme = value;
  html?.setAttribute('class', '');
  html?.classList?.add(value);
  localStorage.setItem('user-shared-preferences:theme', value);
};

provide('updateShowToggleTheme', updateShowToggleTheme);
provide('update-theme', updateTheme);

onMounted(() => {
  if (state.theme === 'dark') {
    html?.classList?.add('dark');
    localStorage.setItem('user-shared-preferences:theme', 'dark');
    return;
  }

  html?.classList?.remove('dark');
  state.theme = 'light';
  localStorage.setItem('user-shared-preferences:theme', 'light');
});
</script>

<script lang="ts">
export default {
  name: 'UserSharedPreferencesContext',
};
</script>
