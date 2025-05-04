// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addUser PUT /api/user/admin/add */
export async function addUserUsingPut(body: API.UserAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponse>('/api/user/admin/add', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteUser DELETE /api/user/admin/delete */
export async function deleteUserUsingDelete(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/api/user/admin/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listUserByPage POST /api/user/admin/list */
export async function listUserByPageUsingPost(
  body: API.UserQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUser_>('/api/user/admin/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUser PUT /api/user/admin/update */
export async function updateUserUsingPut(
  body: API.UserInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/api/user/admin/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
