import { createApp } from 'vue';
import Router from './routers';
import App from './App.vue';
import install from './components';
import 'element-plus/theme-chalk/src/message.scss';
import './styles/index.scss';
import './styles/root.scss';

const app = createApp(App);
install(app);
app.use(Router);
app.mount('#app');
