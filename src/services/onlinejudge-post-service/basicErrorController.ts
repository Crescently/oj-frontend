// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** error GET /api/post/error */
export async function errorUsingGet(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/post/error', {
    method: 'GET',
    ...(options || {}),
  });
}

/** error PUT /api/post/error */
export async function errorUsingPut(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/post/error', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** error POST /api/post/error */
export async function errorUsingPost(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/post/error', {
    method: 'POST',
    ...(options || {}),
  });
}

/** error DELETE /api/post/error */
export async function errorUsingDelete(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/post/error', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** error PATCH /api/post/error */
export async function errorUsingPatch(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/post/error', {
    method: 'PATCH',
    ...(options || {}),
  });
}
