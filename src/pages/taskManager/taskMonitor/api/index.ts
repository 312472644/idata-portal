import { IResult } from '@interface/index';
import service from '@service/index';
import { AxiosPromise } from 'axios';

const getTaskMonitorListAPI = (params: any): AxiosPromise<IResult<any>> => {
  return service({
    url: '/task/monitor/list',
    method: 'POST',
    data: params
  });
};

export { getTaskMonitorListAPI };
