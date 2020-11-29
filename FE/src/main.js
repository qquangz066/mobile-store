import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {$axios, $http} from '@/http';
import services from '@/services';

const app = createApp(App);

app.config.globalProperties.$http = $http;
app.config.globalProperties.$axios = $axios;
app.config.globalProperties.$services = services;

app.use(store).use(router).mount('#app');

