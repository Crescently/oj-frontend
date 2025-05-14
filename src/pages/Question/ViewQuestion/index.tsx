import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { Progress, Space, Tag } from 'antd';
import Typography from 'antd/lib/typography';
import { history } from '@@/core/history';
import TagInput from '@/pages/Question/AddQuestion/components/TagInput';
import { listQuestionVoByPageUsingPost } from '@/services/onlinejudge-question-service/questionController';

interface questionParams {
  title?: string;
  tags?: string[];
}

const ViewQuestion = () => {
  const actionRef = useRef<ActionType>();

  const [questionParams, setQuestionParams] = useState<questionParams>({
    title: '',
    tags: [],
  });

  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: '题目ID',
      dataIndex: 'id',
      valueType: 'index',
      hideInSearch: true,
    },
    {
      title: '题目',
      dataIndex: 'title',
      valueType: 'text',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      render: (_, record) => {
        if (record?.tags) {
          return (
            <Space size={4}>
              {record?.tags.map((tag, index) => (
                <Tag key={index} style={{ margin: '2px 4px 2px 0' }} color={'green'}>
                  {tag.trim()}
                </Tag>
              ))}
            </Space>
          );
        }
        return <Tag>空</Tag>;
      },
      renderFormItem: () => {
        return <TagInput />;
      },
    },
    {
      title: '通过率',
      dataIndex: 'acceptedNum',
      render: (_, record) => {
        const acceptPercent: number = record.submitNum
          ? Math.round(((record.acceptedNum ?? 0) / record.submitNum) * 100 * 100) / 100 // 保留两位小数
          : 0;
        return (
          <Progress
            percentPosition={{ align: 'end', type: 'outer' }}
            percent={acceptPercent}
            strokeLinecap="butt"
            strokeWidth={16}
            format={(percent) => `${percent}%`}
          />
        );
      },
      hideInSearch: true,
    },
    {
      title: '点赞数',
      dataIndex: 'thumbNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '收藏数',
      dataIndex: 'favourNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={'middle'}>
          <Typography.Link
            key={'submit'}
            onClick={() => {
              history.push(`/submit/question/${record.id}`);
            }}
          >
            做题
          </Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title={'浏览题目'}>
      <ProTable<API.QuestionVO, API.QuestionQueryRequest>
        actionRef={actionRef}
        rowKey="id"
        search={{
          span: 8,
          labelWidth: 64,
        }}
        pagination={{
          pageSize: 10,
        }}
        params={questionParams}
        onSubmit={(params) => {
          const { title, tags } = params;
          setQuestionParams((prevState) => {
            return {
              ...prevState,
              title: title || '',
              tags: tags || ([] as string[]),
            };
          });
          actionRef.current?.reload();
        }}
        request={async (params) => {
          const res = await listQuestionVoByPageUsingPost(params);
          if (res.data) {
            return {
              data: res.data.records,
              success: true,
              total: res.data.total,
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default ViewQuestion;
