import { createApp } from 'vue';
import Router from './routers';
import App from './App.vue';
import store from './store';
import install from './components';
import 'element-plus/theme-chalk/src/message.scss';
import './styles/index.scss';
import './styles/root.scss';
import './styles/reset.scss';
import './assets/font/iconfont.css';

const app = createApp(App);
install(app);
app.use(store as any);
app.use(Router);
app.mount('#app');
