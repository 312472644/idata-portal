import { IQuery, IResult, IResultPageVO } from '@interface/index';
import service from '@service/index';
import { AxiosPromise } from 'axios';
import { IUser, IUserQuery } from '../interface';

const getUserListAPI = (params: IQuery<IUserQuery>): AxiosPromise<IResultPageVO<IUser>> => {
  return service({
    url: '/userinfo/list/page',
    method: 'POST',
    data: params,
  });
};

const deleteUserAPI = (id: number): AxiosPromise<IResult<Record<string, any>>> => {
  return service({
    url: `/userinfo/${id}`,
    method: 'DELETE',
  });
};

export { getUserListAPI, deleteUserAPI };
