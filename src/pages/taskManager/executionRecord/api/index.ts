import { IResult, IResultPageVO } from '@interface/index';
import service from '@service/index';
import { AxiosPromise } from 'axios';
import { IExecRecord } from '../interface';

const getTaskExecRecordListAPI = (params: any): AxiosPromise<IResultPageVO<IExecRecord>> => {
  return service({
    url: '/task/record/list/page',
    method: 'POST',
    data: params,
  });
};

const createTaskExecRecordAPI = (params: IExecRecord): AxiosPromise<IResult<{}>> => {
  return service({
    url: '/task/record/',
    method: 'POST',
    data: params,
  });
};

const updateTaskExecRecordAPI = (id: number, params: IExecRecord): AxiosPromise<IResult<{}>> => {
  return service({
    url: `/task/record/${id}`,
    method: 'PUT',
    data: {
      ...params,
      id,
    },
  });
};

const deleteTaskExecRecordAPI = (id: number): AxiosPromise<IResult<{}>> => {
  return service({
    url: `/task/record/${id}`,
    method: 'DELETE',
  });
};

export { getTaskExecRecordListAPI, createTaskExecRecordAPI, updateTaskExecRecordAPI, deleteTaskExecRecordAPI };
