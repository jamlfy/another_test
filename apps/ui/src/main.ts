import './styles.scss';
import { createApp } from 'vue';
import App from './app/App.vue';
import routes from "./pages";
import PrimeVue from 'primevue/config';

const app = createApp(App)
	.use(router)
	.use(PrimeVue)
	.mount('#root');

