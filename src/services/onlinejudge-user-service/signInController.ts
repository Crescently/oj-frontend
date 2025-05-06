// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getSignedDates GET /api/user/sign-in/get */
export async function getSignedDatesUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListSignInRecord_>('/api/user/sign-in/get', {
    method: 'GET',
    ...(options || {}),
  });
}

/** signIn POST /api/user/sign-in/post */
export async function signInUsingPost(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponse>('/api/user/sign-in/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
