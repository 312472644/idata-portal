import { IResult, IResultPageVO } from '@interface/index';
import service from '@service/index';
import { AxiosPromise } from 'axios';
import { ITask } from '../interface';

const getTaskListAPI = (params: any): AxiosPromise<IResultPageVO<ITask>> => {
  return service({
    url: '/task/list/page',
    method: 'POST',
    data: params,
  });
};

const createTaskAPI = (params: ITask): AxiosPromise<IResult<{}>> => {
  return service({
    url: '/task/',
    method: 'POST',
    data: params,
  });
};

const updateTaskAPI = (id: number, params: ITask): AxiosPromise<IResult<{}>> => {
  return service({
    url: `/task/${id}`,
    method: 'PUT',
    data: {
      ...params,
      id,
    },
  });
};

const deleteTaskAPI = (id: number): AxiosPromise<IResult<{}>> => {
  return service({
    url: `/task/${id}`,
    method: 'DELETE',
  });
};

export { getTaskListAPI, createTaskAPI, updateTaskAPI, deleteTaskAPI };
