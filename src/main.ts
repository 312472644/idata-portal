import { createApp } from 'vue';
import Router from './routers';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.use(ElementPlus);
app.use(Router);
app.mount('#app');
