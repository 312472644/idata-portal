import { IResult, IResultPageVO } from '@interface/index';
import service from '@service/index';
import { AxiosPromise } from 'axios';
import { IAutConfig } from '../interface';

const getDsAuthListAPI = (params: any): AxiosPromise<IResultPageVO<IAutConfig>> => {
  return service({
    url: '/datasource/auth/list/page',
    method: 'POST',
    data: params,
  });
};

const createDsAuthAPI = (params: IAutConfig): AxiosPromise<IResult<{}>> => {
  return service({
    url: '/datasource/auth/',
    method: 'POST',
    data: params,
  });
};

const updateDsAuthAPI = (id: number, params: IAutConfig): AxiosPromise<IResult<{}>> => {
  return service({
    url: `/datasource/auth/${id}`,
    method: 'PUT',
    data: {
      ...params,
      id,
    },
  });
};

const deleteDsAuthAPI = (id: number): AxiosPromise<IResult<{}>> => {
  return service({
    url: `/datasource/auth/${id}`,
    method: 'DELETE',
  });
};

export { createDsAuthAPI, getDsAuthListAPI, updateDsAuthAPI, deleteDsAuthAPI };
