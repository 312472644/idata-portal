import { ITableCommon } from '@interface/index';

export interface IQuery {
  roleName?: string;
  permissionName?: string;
  pageIndex: number;
  pageSize: number;
}

export interface IUser extends ITableCommon {
  id: number;
  userName: string;
  password: string;
  userRole: string;
  status: string;
  secretKey: string;
  lastLoginTime: string;
  failTimes: string;
}
