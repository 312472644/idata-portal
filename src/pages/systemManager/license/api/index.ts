import { IResult, IResultPageVO } from '@interface/index';
import service from '@service/index';
import { AxiosPromise } from 'axios';
import { ILicense } from '../interface';

const getLicenseListAPI = (params: any): AxiosPromise<IResultPageVO<ILicense>> => {
  return service({
    url: '/license/list/page',
    method: 'POST',
    data: params,
  });
};

const createLicenseAPI = (params: ILicense): AxiosPromise<IResult<{}>> => {
  return service({
    url: '/license/',
    method: 'POST',
    data: params,
  });
};

const updateLicenseAPI = (id: number, params: ILicense): AxiosPromise<IResult<{}>> => {
  return service({
    url: `/license/${id}`,
    method: 'PUT',
    data: {
      ...params,
      id,
    },
  });
};

const deleteLicenseAPI = (id: number): AxiosPromise<IResult<{}>> => {
  return service({
    url: `/license/${id}`,
    method: 'DELETE',
  });
};

export { getLicenseListAPI, createLicenseAPI, updateLicenseAPI, deleteLicenseAPI };
