// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** doThumb POST /api/question/thumb/ */
export async function doThumbUsingPost(
  body: API.QuestionThumbAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/question/thumb/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
