import { ITableCommon } from '@interface/index';

export interface IAutConfig extends ITableCommon {
  id?: number;
  authName: string; // 认证名称
  authType: string; //数据源认证类型
  status: string;
  connectStr: string; //数据库连接串
  userName: string;
  password: string;
  dbSchema: string;
  dbVersion: string; // 数据库版本
  requestAddress: string; // API请求地址
  requestMethod: string; // API请求方式
  requestBody: string; //API请求参数
  requestHeader: string; //API请求头
  connectionTimeout: string; //API请求超时时长 单位s Default 60
  retryCount: number; // API请求重试次数 Default 1
  responseOkPath: string; // 响应成功路径
  responseOkMark: string; // 响应成功标识
  responseDataPath: string; // 响应数据路径
}
