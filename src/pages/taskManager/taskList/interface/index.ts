import { ITableCommon } from '@interface/index';

export interface ITask extends ITableCommon {
  id?: number;
  taskName: string;
  taskStatus: string;
  executePlan: string; // 执行计划(corn表达式) 或者下拉 多少分钟一次
  startReadDataTime: string; // 开始读取数据时间 yyyy-MM-dd HH:mm:ss
  timeStampField: string; // 时间戳字段
  localStorage: string; // 本地存储：是/否
  storageTime: string; // 本地保存时长 单位(月) 0永不过期
  lastExecuteNo?: string; // 最后执行批次
  lastExecuteTime?: string; //最后执行时间 yyyy-MM-dd HH:mm:ss
}

export interface ITaskFieldMapping extends ITableCommon {
  id?: string;
  taskId: string;
  taskStepId: string;
  sourceFieldName: string; // 源字段名称
  sourceFieldType: string; // 源字段类型
  sourceFieldLength: number; // 源字段长度
  targetFieldName: string; // 目标字段名称
  targetFieldLength: number; // 目标字段长度
  targetFieldType: string; // 目标字段类型
  seqNo: number; // 序号
  changeData: string; // 装换数据：是/否
  changeRule: string; // 装换规则
}

export interface ITaskStep extends ITableCommon {
  id?: string;
  taskId: string;
  stepName: string; // 步骤名称
  stepSeq: string; // 步骤序号
  sourceDsType: string; // 源数据源类型
  sourceDsId: string; // 源数据源id
  startReadDataTime: string; // 开始读取数据时间
  timeStampField: string; // 时间戳字段
  targetDsType: string; // 目标数据源类型
  targetDsId: string; // 目标数据源id
  updateData: string; //更新数据：是
  updateKey: string; // 更新key：支持多个
}
