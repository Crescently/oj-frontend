import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { Progress, Space, Tag } from 'antd';
import Typography from 'antd/lib/typography';
import { history } from '@@/core/history';
import TagInput from '@/pages/Question/AddQuestion/components/TagInput';
import { listQuestionVoByPageUsingPost } from '@/services/onlinejudge-question-service/questionController';
import { LikeOutlined, PlayCircleOutlined, StarOutlined } from '@ant-design/icons';
import './index.css';

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
      title: '序号',
      dataIndex: 'id',
      valueType: 'indexBorder',
      align: 'center',
      hideInSearch: true,
      width: 80,
    },
    {
      title: '题目',
      dataIndex: 'title',
      valueType: 'text',
      align: 'center',
      width: 200,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      align: 'center',
      width: 220,
      ellipsis: true,
      tooltip: '题目的知识点标签',
      render: (_, record) => {
        if (record?.tags) {
          return (
            <Space size={4}>
              {record?.tags.map((tag, index) => (
                <Tag key={index} style={{ margin: '2px 4px 2px 0' }} color="green">
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
      width: 180,
      render: (_, record) => {
        const acceptPercent: number = record.submitNum
          ? Math.round(((record.acceptedNum ?? 0) / record.submitNum) * 100 * 100) / 100
          : 0;
        return (
          <div style={{ marginRight: 12 }}>
            <Progress
              percentPosition={{ align: 'end', type: 'outer' }}
              percent={acceptPercent}
              strokeLinecap="butt"
              strokeWidth={16}
              format={(percent) => `${percent}%`}
            />
          </div>
        );
      },
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '点赞数',
      dataIndex: 'thumbNum',
      align: 'center',
      width: 100,
      hideInSearch: true,
      render: (text) => (
        <Space>
          <LikeOutlined style={{ color: '#eb2f96' }} />
          {text}
        </Space>
      ),
    },
    {
      title: '收藏数',
      dataIndex: 'favourNum',
      align: 'center',
      width: 100,
      hideInSearch: true,
      render: (text) => (
        <Space>
          <StarOutlined style={{ color: '#fadb14' }} />
          {text}
        </Space>
      ),
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
      align: 'center',
      width: 160,
      hideInSearch: true,
    },
    {
      title: '选项',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            key="submit"
            onClick={() => {
              history.push(`/submit/question/${record.id}`);
            }}
          >
            <PlayCircleOutlined style={{ marginRight: 4 }} />
            去做题
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
        rowClassName={() => 'hover-row'}
        search={{
          labelWidth: 80,
          span: 6,
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
