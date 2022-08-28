import { ITableCommon } from '@interface/index';

export interface IDispatchLog extends ITableCommon {
  id: number;
  taskId: string;
  batchNo: string; // 执行批次
  taskStepId: number; // 任务步骤id
  inParam: string; // 输入参数
  outData: string; // 输出内容
  errInfo: string; // 异常信息
  status: string;
  lastExecuteNo: string; // 最后执行批次
  lastExecuteTime: string; //最后执行时间 yyyy-MM-dd HH:mm:ss
}
