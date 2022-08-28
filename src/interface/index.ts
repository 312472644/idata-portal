import { App } from '@vue/runtime-dom';

// 路由接口定义
interface IRouter {
  install: (app: App<Element>) => void;
}

// 面包屑接口
interface INav {
  title: string;
  path: string;
}

// 分页组件参数
interface IPagination {
  pageSize: number;
  pageNumber: number;
  total?: number;
}

// 查询条件
interface IQuery<T> {
  search: T;
  page?: {
    pageSize: number;
    pageNumber: number;
  };
}

interface IPageVO<T> {
  pageSize: number;
  pageNumber: number;
  total: number;
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
interface IResultPageVO<T> {
  code: number;
  data: {
    list: T[];
    pageSize?: number;
    pageNumber?: number;
    total?: number;
  };
  message: string | null;
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

export { IRouter, INav, IResult, IResultPageVO, ITableCommon, IPagination, IQuery, IPageVO };
