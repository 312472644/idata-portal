import { ITableCommon } from '@interface/index';

export interface IDicConfig extends ITableCommon {
  id: number;
  code: string; // 配置编码
  codeCn: string; // 中文名称
  codeEn: string; // 英文名称
  configType: string; // 配置类型
  fieldName: string; // 字段名称
}
