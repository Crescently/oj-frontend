// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /user/login */
export async function userLogin(body: API.UserLoginRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLoginUserVO>('/user/login', {
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

/** 此处后端没有提供注释 PATCH /user/update/avatar */
export async function updateAvatar(
  body: API.UserUpdateAvatarRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/user/update/avatar', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /user/update/pwd */
export async function updatePassword(
  body: API.UserUpdatePwdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/user/update/pwd', {
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
  return request<API.BaseResponseUserVO>('/user/userInfo', {
    method: 'GET',
    ...(options || {}),
  });
}
