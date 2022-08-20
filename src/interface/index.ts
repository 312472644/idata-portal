import { App } from '@vue/runtime-dom';

// 路由接口定义
interface IRouter {
  install: (app: App<Element>) => void;
}

interface INav {
  title: string;
  path: string;
}

interface IPageVO<T> {
  pageSize: number;
  pageNumber: number;
  total: number;
  pageCount: number;
  list: T;
}

// 不带分页接口定义
interface IResult<T> {
  code: number;
  data: T;
  messageW: string;
  success: boolean;
}

// 带分页接口定义
interface IResultPageVO<T extends IPageVO<T>> {
  code: number;
  data: T;
  messageW: string;
  success: boolean;
}

export { IRouter, INav, IResult, IResultPageVO };
