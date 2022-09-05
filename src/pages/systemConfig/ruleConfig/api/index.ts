import { IResult, IResultPageVO } from '@interface/index';
import service from '@service/index';
import { AxiosPromise } from 'axios';
import { IRuleConfig } from '../interface';

const getRuleListAPI = (params: any): AxiosPromise<IResultPageVO<IRuleConfig>> => {
  return service({
    url: '/rule/list/page',
    method: 'POST',
    data: params,
  });
};

const deleteRuleAPI = (id: number) => {
  return service({
    url: `/rule/${id}`,
    method: 'DELETE',
  });
};

const createRuleAPI = (params: IRuleConfig): AxiosPromise<IResult<{}>> => {
  return service({
    url: '/rule/',
    method: 'POST',
    data: params,
  });
};

const updateRuleAPI = (id: number, params: IRuleConfig): AxiosPromise<IResult<{}>> => {
  return service({
    url: `/rule/${id}`,
    method: 'PUT',
    data: {
      ...params,
      id,
    },
  });
};

export { getRuleListAPI, deleteRuleAPI, createRuleAPI, updateRuleAPI };
