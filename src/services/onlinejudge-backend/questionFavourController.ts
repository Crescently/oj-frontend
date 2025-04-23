// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /question_favour/ */
export async function doQuestionFavour(
  body: API.QuestionFavourAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInteger>('/question_favour/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /question_favour/my/list/page */
export async function listMyFavourQuestionByPage(
  body: API.QuestionQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageQuestionVO>('/question_favour/my/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
