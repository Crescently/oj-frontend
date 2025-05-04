import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { listQuestionSubmitVoByPageUsingPost } from '@/services/onlinejudge-question-service/questionController';
import React from 'react';
import { Space } from 'antd';
import Typography from 'antd/lib/typography';
import { history } from '@@/core/history';
import { useModel } from '@umijs/max';
import { ClockCircleOutlined, DatabaseOutlined, MessageOutlined } from '@ant-design/icons';

const QuestionHistory: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  const columns: ProColumns<API.QuestionSubmitVO>[] = [
    {
      title: '题目ID',
      dataIndex: 'questionId',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '题目名称',
      render: (_, record) => {
        return <Typography.Text>{record.questionVO?.title}</Typography.Text>;
      },
    },
    {
      title: '使用语言',
      dataIndex: 'language',
      valueType: 'text',
    },
    {
      title: '判题信息',
      dataIndex: 'judgeInfo',
      render: (_, record) => {
        // 使用解构语法提取判题信息并设置默认值
        const { message, memory, time } = record.judgeInfo || {};

        // 格式化显示内容
        const formatMemory = memory ? `${memory} KB` : null;
        const formatTime = time ? `${time} ms` : null;

        return (
          <Space size={8} style={{ flexWrap: 'wrap' }}>
            {/* 消息 - 突出显示 */}
            {message && (
              <Typography.Text
                strong
                type={message === '成功' ? 'success' : 'danger'}
                style={{ lineHeight: 1.5 }}
              >
                <MessageOutlined style={{ marginRight: 4 }} />
                {message}
              </Typography.Text>
            )}

            {/* 内存消耗 - 使用蓝色系 */}
            {formatMemory && (
              <Typography.Text type="secondary" style={{ display: 'flex', alignItems: 'center' }}>
                <DatabaseOutlined style={{ marginRight: 4, color: '#1890ff' }} />
                内存：{formatMemory}
              </Typography.Text>
            )}

            {/* 时间消耗 - 使用绿色系 */}
            {formatTime && (
              <Typography.Text type="secondary" style={{ display: 'flex', alignItems: 'center' }}>
                <ClockCircleOutlined style={{ marginRight: 4, color: '#52c41a' }} />
                时间：{formatTime}
              </Typography.Text>
            )}
          </Space>
        );
      },
      hideInSearch: true,
    },
    {
      title: '题目状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '等待中',
        },
        1: {
          text: '判题中',
        },
        2: {
          text: '成功',
        },
        3: {
          text: '失败',
        },
      },
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
              history.push(`/submit/question/${record.questionId}`);
            }}
          >
            查看详情
          </Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title={'提交记录'}>
      <ProTable<API.QuestionSubmitVO, API.QuestionSubmitQueryRequest>
        rowKey="id"
        search={false}
        pagination={{
          pageSize: 10,
        }}
        request={async (params) => {
          const res = await listQuestionSubmitVoByPageUsingPost({
            ...params,
            userId: initialState?.currentUser?.id ?? 0,
          });
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

export default QuestionHistory;
