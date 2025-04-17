// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /question_submit/list/page */
export async function listQuestionVoByPage(
  body: API.QuestionSubmitQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageQuestionSubmitVO>('/question_submit/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /question_submit/submit */
export async function doQuestionSubmit(
  body: API.QuestionSubmitAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/question_submit/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
