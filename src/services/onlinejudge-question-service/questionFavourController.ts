// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** doQuestionFavour POST /api/question/favour/ */
export async function doQuestionFavourUsingPost(
  body: API.QuestionFavourAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/question/favour/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyFavourQuestionByPage POST /api/question/favour/my/list/page */
export async function listMyFavourQuestionByPageUsingPost(
  body: API.QuestionQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageQuestionVO_>('/api/question/favour/my/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
