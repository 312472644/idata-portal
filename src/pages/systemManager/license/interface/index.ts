import { ITableCommon } from '@interface/index';

export interface ILicense extends ITableCommon {
  id: number;
  license: string;
  hostInfo: string; // 主机信息
  status: string;
  effDate: Date;
}
