import React from 'react';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { listQuestionSubmitVoByPageUsingPost } from '@/services/onlinejudge-question-service/questionController';
import { useModel } from '@@/exports';
import Typography from 'antd/lib/typography';

interface QuestionStatusPageProps {
  questionId: number;
}

const QuestionStatusPage: React.FC<QuestionStatusPageProps> = ({ questionId }) => {
  const { initialState } = useModel('@@initialState');

  const columns: ProColumns<API.QuestionSubmitVO>[] = [
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
    },

    {
      title: '使用语言',
      dataIndex: 'language',
      valueType: 'text',
    },
    {
      title: '消耗内存',
      dataIndex: 'judgeInfo',
      render: (_, record) => {
        // 使用解构语法提取判题信息并设置默认值
        const { memory } = record.judgeInfo || {};
        // 格式化显示内容
        const formatMemory = memory ? `${memory} KB` : null;
        return <Typography.Text>{formatMemory}</Typography.Text>;
      },
    },
    {
      title: '执行时间',
      dataIndex: 'judgeInfo',
      render: (_, record) => {
        // 使用解构语法提取判题信息并设置默认值
        const { time } = record.judgeInfo || {};
        // 格式化显示内容
        const formatTime = time ? `${time} ms` : null;
        return <Typography.Text>{formatTime}</Typography.Text>;
      },
    },
  ];
  return (
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
          questionId: questionId,
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
  );
};

export default QuestionStatusPage;
