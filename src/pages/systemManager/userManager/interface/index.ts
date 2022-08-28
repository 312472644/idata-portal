import { ITableCommon } from '@interface/index';

export interface IUserQuery {
  userName: string;
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
