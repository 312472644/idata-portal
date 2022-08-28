// 响应状态
enum responseStatusCode {
  // 请求成功
  responseOk = 200,
  // 请求参数为空
  requestParamIsNull = 40001,
  // 参数校验错误,缺失关键参数
  requestParamIsError = 40002,
  // 数据重复
  requestIsRepeat = 40010,
  // 用户未登录
  userNotLogin = 40101,
  // 用户没有token
  userNoToken = 40102,
  // 无效token
  tokenIsInValid = 40103,
  // token过期
  tokenTimeout = 40104,
  // 用户信息错误
  userError = 40201,
  // 用户没有权限
  noPermission = 40301,
  // 系统错误
  systemError = 50001,
}

export { responseStatusCode };
