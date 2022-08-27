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
  message: string;
  success: boolean;
}

// 带分页接口定义
interface IResultPageVO<T extends IPageVO<T>> {
  code: number;
  data: T;
  messageW: string;
  success: boolean;
}

// 每个表共有部分
interface ITableCommon {
  createdBy: string; //创建人
  createdDate: string; // 创建时间
  updatedBy: string; // 更新人
  updatedDate: string; // 更新时间
  lastUpdatedDate: string; // 最后更新时间
}

export { IRouter, INav, IResult, IResultPageVO, ITableCommon };
