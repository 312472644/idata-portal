import { createApp } from 'vue';
import Router from './routers';
import App from './App.vue';
import store from './store';
import installComponents from './components';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/theme-chalk/src/index.scss';
import './styles/index.scss';
import './styles/root.scss';
import './styles/reset.scss';
import './assets/font/iconfont.css';

const app = createApp(App);
installComponents(app);
app.use(ElementPlus, { locale: zhCn });
app.use(store as any);
app.use(Router);
app.mount('#app');
