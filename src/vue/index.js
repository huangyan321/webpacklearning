import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
export const vueInstance = createApp(App).use(router).mount('#app');
