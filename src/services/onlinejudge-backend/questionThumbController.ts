// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /question_thumb/ */
export async function doThumb(body: API.QuestionThumbAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseInteger>('/question_thumb/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
