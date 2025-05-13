// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** doPostThumb POST /api/post/thumb/ */
export async function doPostThumbUsingPost(
  body: API.PostThumbAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/post/thumb/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
