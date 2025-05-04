// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** userLogin POST /api/user/login */
export async function userLoginUsingPost(
  body: API.UserLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLoginUserVO_>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userLogout POST /api/user/logout */
export async function userLogoutUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** userRegister POST /api/user/register */
export async function userRegisterUsingPost(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUserInfo PUT /api/user/update */
export async function updateUserInfoUsingPut(
  body: API.UserUpdateInfoRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/api/user/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateAvatar PATCH /api/user/update/avatar */
export async function updateAvatarUsingPatch(
  body: API.UserUpdateAvatarRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/api/user/update/avatar', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updatePassword PATCH /api/user/update/pwd */
export async function updatePasswordUsingPatch(
  body: API.UserUpdatePwdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/api/user/update/pwd', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserInfo GET /api/user/userInfo */
export async function getUserInfoUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVO_>('/api/user/userInfo', {
    method: 'GET',
    ...(options || {}),
  });
}
