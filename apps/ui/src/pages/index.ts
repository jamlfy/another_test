import { createMemoryHistory, createRouter } from 'vue-router';

import Login from './login.vue';
import Stock from './Stock.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/:name', component: Stock },
];

export default createRouter({
  history: createMemoryHistory(),
  routes,
});
