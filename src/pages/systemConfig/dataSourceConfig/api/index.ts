import { IResult, IResultPageVO } from '@interface/index';
import service from '@service/index';
import { AxiosPromise } from 'axios';
import { IDSConfig } from '../interface';

const getDSConfigListAPI = (params: any): AxiosPromise<IResultPageVO<IDSConfig>> => {
  return service({
    url: '/datasource/list/page',
    method: 'POST',
    data: params,
  });
};

const createDSConfigAPI = (params: IDSConfig): AxiosPromise<IResult<{}>> => {
  return service({
    url: '/datasource/',
    method: 'POST',
    data: params,
  });
};

const updateDSConfigAPI = (id: number, params: IDSConfig): AxiosPromise<IResult<{}>> => {
  return service({
    url: `/datasource/${id}`,
    method: 'PUT',
    data: {
      ...params,
      id,
    },
  });
};

const deleteDSConfigAPI = (id: number): AxiosPromise<IResult<{}>> => {
  return service({
    url: `/datasource/${id}`,
    method: 'DELETE',
  });
};

export { getDSConfigListAPI, createDSConfigAPI, updateDSConfigAPI, deleteDSConfigAPI };
