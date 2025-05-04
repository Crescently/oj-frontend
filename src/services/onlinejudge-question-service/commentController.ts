// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addComment POST /api/question/comment/add */
export async function addCommentUsingPost(
  body: API.CommentAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/api/question/comment/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listCommentVOByPage POST /api/question/comment/list/page/vo */
export async function listCommentVoByPageUsingPost(
  body: API.CommentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCommentVO_>('/api/question/comment/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
