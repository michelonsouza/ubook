<a href="https://ubook-schedule.netlify.app/" style="margin-bottom: 30px; display: block;" target="_blank">
  <img width="400" src="./docs/resources/ic-logo.svg" />
</a>

 [![Version](https://img.shields.io/github/package-json/v/michelonsouza/ubook/main)](https://github.com/michelonsouza/ubook/blob/main/package.json#L4) [![Code Size](https://img.shields.io/github/languages/code-size/michelonsouza/ubook)](https://github.com/michelonsouza/ubook) [![Coverage Status](https://coveralls.io/repos/github/michelonsouza/ubook/badge.svg?branch=main)](https://coveralls.io/github/michelonsouza/ubook?branch=main) [![CodeQL](https://github.com/michelonsouza/ubook/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/michelonsouza/ubook/actions/workflows/codeql-analysis.yml) [![Netlify Status](https://api.netlify.com/api/v1/badges/b1b07203-9a6c-4bbc-bdd1-c190723aba52/deploy-status)](https://app.netlify.com/sites/ubook-schedule/deploys)

## Oline app
<a href="https://ubook-schedule.netlify.app/" target="_blank">Ubook</a>
# Before run this project
Copy `.env.example` and rename to `.env`

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
