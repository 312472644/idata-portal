import { IResult } from '@interface/index';
import { AxiosPromise } from 'axios';
import service from '../service/index';

const registerAPI = (params: {
  userName: string;
  password: string;
}): AxiosPromise<IResult<{ user: string; token: string }>> => {
  return service({
    url: '/userinfo/register',
    method: 'POST',
    data: params,
  });
};

const loginAPI = (params: {
  userName: string;
  password: string;
}): AxiosPromise<IResult<{ user: string; token: string }>> => {
  return service({
    url: '/userinfo/login',
    method: 'POST',
    data: params,
  });
};

export { registerAPI, loginAPI };
