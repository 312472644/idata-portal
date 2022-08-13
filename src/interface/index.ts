// 路由接口定义
interface IRouter {
  install: (app: any) => void;
}

interface INav {
  title: string;
  path: string;
}

export { IRouter, INav };
