import { createApp } from 'vue';

import Maska from 'maska';

import './style.css';
import App from './App.vue';

const app = createApp(App);

app.use(Maska);

app.mount('#app');
