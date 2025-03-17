import { createMemoryHistory, createRouter } from 'vue-router'

import Login from './login.vue'
import Chart from './chart.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/:name', component: Chart },
];

export default createRouter({
  history: createMemoryHistory(),
  routes,
});