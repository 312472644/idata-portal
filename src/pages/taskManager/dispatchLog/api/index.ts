import { IResultPageVO } from '@interface/index';
import service from '@service/index';
import { AxiosPromise } from 'axios';
import { IDispatchLog } from '../interface';

const getDispatchLogListAPI = (params: any): AxiosPromise<IResultPageVO<IDispatchLog>> => {
  return service({
    url: '/task/errlog/list/page',
    method: 'POST',
    data: params,
  });
};

export { getDispatchLogListAPI };
