import { App } from 'vue';
import permission from './permission';

const directiveMap = {
  permission
};

const registerDirectives = (app: App<Element>) => {
  for (const [, directive] of Object.entries(directiveMap)) {
    directive(app);
  }
};

export default registerDirectives;
