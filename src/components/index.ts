import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { App } from '@vue/runtime-dom';

const componentMap = {
  ...ElementPlusIconsVue,
};

// 注册所有组件
const install = (app: App<Element>) => {
  for (const [key, component] of Object.entries(componentMap)) {
    app.component(key, component);
  }
};

export default install;
