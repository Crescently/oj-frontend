// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addPostComment POST /api/post/comment/add */
export async function addPostCommentUsingPost(
  body: API.PostCommentAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/api/post/comment/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listPostCommentVOByPage POST /api/post/comment/list/page/vo */
export async function listPostCommentVoByPageUsingPost(
  body: API.PostCommentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostCommentVO_>('/api/post/comment/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
