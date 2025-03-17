import './styles.scss';
import { createApp } from 'vue';
import App from './app/App.vue';
import routes from "./pages";
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';

const pinia = createPinia();
const app = createApp(App)
	.use(router)
	.use(pinia)
	.use(PrimeVue)
	.mount('#root');

