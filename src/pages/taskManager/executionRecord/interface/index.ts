import { ITableCommon } from '@interface/index';

export interface IExecRecord extends ITableCommon {
  id: number;
  batchNo: string; // 执行批次
  taskId: string; // 任务id
  taskStepId: number; // 任务步骤id
  status: string;
  readDataStartTime: string; // 读取数据开始时间
  readDataEndTime: string; // 读取数据结束时间
  readTotalCount: number; // 读取数据总数
  execResult: string; // 执行结果：例如成功多少 失败多少
  execMethod: string; // 执行方式：手动/自动
}

export interface IExecRecordDetail {
  id: number;
  batchNo: string; // 执行批次
  content: string; // 内容
  createdDate: string;
}
