import { ITableCommon } from '@interface/index';

export interface IDSConfig extends ITableCommon {
  id: number;
  dsName: string; // 数据源名称
  dsType: string; // 数据源类型
  dsAuthId: string; // 数据源认证id
  status: string;
  sqlStr: string;
  tableName: string;
  requestAddress: string; // API请求地址
  requestMethod: string; // API请求方式
  requestBody: string; // API请求参数
  requestHeader: string; // API请求头
  connectionTimeout: number; // API请求超时时长 单位s Default 60
  retryCount: number;
  paging: string; // 是否分页
  pageNoPath: string; //是否分页路径
  pageSizePath: string; // 每页大小路径
  totalPath: string; // 总记录路径
  responseOkPath: string; // 响应成功路径
  responseOkMark: string; // 响应成功标识
  responseDataPath: string; // 响应数据路径
}
