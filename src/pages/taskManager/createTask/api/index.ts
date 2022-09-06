import { IResult, IResultPageVO } from '@interface/index';
import { ITask, ITaskFieldMapping, ITaskStep } from '@pages/taskManager/taskList/interface';
import service from '@service/index';
import { AxiosPromise } from 'axios';

const createTaskAPI = (params: ITask): AxiosPromise<IResult<ITask>> => {
  return service({
    url: '/task/',
    method: 'POST',
    data: params
  });
};

const updateTaskAPI = (id: string, params: ITask): AxiosPromise<IResult<ITask>> => {
  return service({
    url: `/task/${id}`,
    method: 'PUT',
    data: {
      ...params,
      id
    }
  });
};

const getTaskDetailAPI = (id: string): AxiosPromise<IResult<ITask>> => {
  return service({
    url: `/task/${id}`,
    method: 'GET'
  });
};

const createTaskStepAPI = (params: ITaskStep): AxiosPromise<IResult<ITaskStep>> => {
  return service({
    url: '/task/step/',
    method: 'POST',
    data: params
  });
};

const updateTaskStepAPI = (id: string, params: ITaskStep): AxiosPromise<IResult<ITaskStep>> => {
  return service({
    url: `/task/step/${id}`,
    method: 'PUT',
    data: {
      ...params,
      id
    }
  });
};

const getTaskStepDetailAPI = (id: string): AxiosPromise<IResult<ITaskStep>> => {
  return service({
    url: `/task/step/${id}`,
    method: 'GET'
  });
};

const getFieldMappingDetailAPI = (id: string): AxiosPromise<IResult<ITaskFieldMapping>> => {
  return service({
    url: `/task/fieldmapping/${id}`,
    method: 'GET'
  });
};

const createFieldMappingAPI = (params: ITaskFieldMapping): AxiosPromise<IResult<ITaskFieldMapping>> => {
  return service({
    url: '/task/fieldmapping/',
    method: 'POST',
    data: params
  });
};

const updateFieldMappingAPI = (id: string, params: ITaskFieldMapping): AxiosPromise<IResult<ITaskFieldMapping>> => {
  return service({
    url: `/task/fieldmapping/${id}`,
    method: 'PUT',
    data: {
      ...params,
      id
    }
  });
};

export {
  createTaskAPI,
  updateTaskAPI,
  getTaskDetailAPI,
  createTaskStepAPI,
  updateTaskStepAPI,
  getTaskStepDetailAPI,
  getFieldMappingDetailAPI,
  createFieldMappingAPI,
  updateFieldMappingAPI
};
