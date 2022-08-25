import { ITableCommon } from '@interface/index';

export interface IRuleConfig extends ITableCommon {
  id: number;
  ruleName: string; // 名称,
  ruleType: string; // 类型 下拉引擎/表达式,
  ruleStatus: string; // 状态,
  ruleLanguage: string; //语言,
  ruleCode: string; // 代码,
  comments: number; //描述,
}
