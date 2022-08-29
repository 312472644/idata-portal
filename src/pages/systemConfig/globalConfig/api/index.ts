import { IResultPageVO } from '@interface/index';
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

export { getDicListAPI };
