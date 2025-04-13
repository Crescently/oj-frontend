// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /user/login */
export async function userLogin(body: API.UserLoginRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseUserLoginResponse>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/logout */
export async function userLogout(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/register */
export async function userRegister(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /user/update */
export async function updateUserInfo(
  body: API.UserUpdateInfoRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/user/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /user/updateAvatar */
export async function updateAvatar(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateAvatarParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/user/updateAvatar', {
    method: 'PATCH',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /user/updatePwd */
export async function updatePassword(
  body: API.UserUpdatePwdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/user/updatePwd', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/userInfo */
export async function getUserInfo(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVo>('/user/userInfo', {
    method: 'GET',
    ...(options || {}),
  });
}
