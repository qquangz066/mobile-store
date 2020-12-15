import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {$axios, $http} from '@/http';
import services from '@/services';
import Toast, {useToast} from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

app.config.globalProperties.$http = $http;
app.config.globalProperties.$axios = $axios;
app.config.globalProperties.$services = services;
app.config.globalProperties.$money = (money) => money?.toLocaleString() + 'đ';
app.config.globalProperties.$toast = useToast();

app.use(store).use(router).use(Toast).mount('#app');

