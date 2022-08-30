import { IResult, IResultPageVO } from '@interface/index';
import service from '@service/index';
import { AxiosPromise } from 'axios';
import { IDicConfig } from '../interface';

const getDicListAPI = (params: any): AxiosPromise<IResultPageVO<IDicConfig>> => {
  return service({
    url: '/sysconfig/list/page',
    method: 'POST',
    data: params,
  });
};

const createDicAPI = (params: IDicConfig): AxiosPromise<IResult<{}>> => {
  return service({
    url: '/sysconfig/',
    method: 'POST',
    data: params,
  });
};

const updateDicAPI = (id: number, params?: IDicConfig) => {
  return service({
    url: `/sysconfig/${id}`,
    method: 'PUT',
    data: {
      ...params,
      id,
    },
  });
};

const deleteDicAPI = (id: number) => {
  return service({
    url: `/sysconfig/${id}`,
    method: 'DELETE',
  });
};

export { getDicListAPI, createDicAPI, updateDicAPI, deleteDicAPI };
