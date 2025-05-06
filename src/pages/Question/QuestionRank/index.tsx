import { PageContainer } from '@ant-design/pro-components';
import { history, useRequest } from '@umijs/max';
import {
  Button,
  Divider,
  List,
  Space,
  Splitter,
  Table,
  TableProps,
  Tag,
  theme,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import {
  listQuestionSubmitVoByPageUsingPost,
  listQuestionVoByPageUsingPost,
} from '@/services/onlinejudge-question-service/questionController';

const QuestionRank = () => {
  const { token } = theme.useToken();
  const [selectedQuestion, setSelectedQuestion] = useState<API.QuestionVO>();
  const [pageParams, setPageParams] = useState({ current: 1, pageSize: 10 });

  // 获取题目列表
  const { data: questionData, loading: listLoading } = useRequest(
    () => listQuestionVoByPageUsingPost(pageParams),
    { refreshDeps: [pageParams] },
  );

  const {
    data: rankData,
    loading: rankLoading,
    run: fetchRank,
  } = useRequest((qid: number) => listQuestionSubmitVoByPageUsingPost({ questionId: qid }), {
    manual: true,
  });

  // 处理题目选择
  useEffect(() => {
    if (selectedQuestion?.id) {
      fetchRank(selectedQuestion.id);
    }
  }, [selectedQuestion]);

  const calcPassRate = (item: API.QuestionVO) => {
    if (!item.submitNum) return 0;
    return (((item.acceptedNum || 0) / item.submitNum) * 100).toFixed(1);
  };

  // 表格列定义
  const rankColumns: TableProps<API.QuestionSubmitVO>['columns'] = [
    {
      title: '排名',
      dataIndex: 'id',
      width: 80,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: '用户',
      dataIndex: ['questionVO', 'userVO', 'username'],
      render: (text: string) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: '用时（ms）',
      dataIndex: ['judgeInfo', 'time'],
      sorter: (a: any, b: any) => a.judgeInfo.time - b.judgeInfo.time,
      defaultSortOrder: 'ascend',
    },
    {
      title: '内存（KB）',
      dataIndex: ['judgeInfo', 'memory'],
      sorter: (a: any, b: any) => a.judgeInfo.memory - b.judgeInfo.memory,
      defaultSortOrder: 'ascend',
    },
    {
      title: '提交时间',
      dataIndex: 'createTime',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: '语言',
      dataIndex: 'language',
      render: (text: string) => <Tag color="processing">{text}</Tag>,
    },
  ];

  return (
    <PageContainer title={'排行榜'}>
      <Splitter>
        <Splitter.Panel min={300} defaultSize={400} resizable={false}>
          <List
            loading={listLoading}
            dataSource={questionData?.records}
            rowKey="id"
            renderItem={(item) => (
              <List.Item
                onClick={() => setSelectedQuestion(item)}
                style={{
                  cursor: 'pointer',
                  padding: '12px 24px',
                  backgroundColor:
                    selectedQuestion?.id === item.id ? token.colorPrimaryBg : 'inherit',
                  borderBottom: `1px solid ${token.colorBorderSecondary}`,
                  transition: 'all 0.3s',
                }}
              >
                <List.Item.Meta
                  title={
                    <Space>
                      <Typography.Text strong>{item.title}</Typography.Text>
                    </Space>
                  }
                  description={
                    <Space split={<Divider type="vertical" />}>
                      <span>提交数：{item.submitNum}</span>
                      <span>通过率：{calcPassRate(item)}%</span>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Splitter.Panel>
        <Splitter.Panel min={600}>
          <div style={{ padding: 24 }}>
            {selectedQuestion ? (
              <>
                <Space direction={'horizontal'} align={'baseline'} size={'large'}>
                  <Typography.Title level={4} style={{ marginBottom: 24 }}>
                    {selectedQuestion.title} - 最佳解答排行榜
                  </Typography.Title>
                  <Button
                    type={'primary'}
                    onClick={() => {
                      history.push(`/submit/question/${selectedQuestion?.id}`);
                    }}
                  >
                    查看题目详情
                  </Button>
                </Space>
                <Table
                  columns={rankColumns}
                  loading={rankLoading}
                  dataSource={rankData?.records}
                  rowKey="id"
                  pagination={false}
                  bordered
                  scroll={{ y: '100vh' }}
                  locale={{
                    emptyText: '暂无提交记录',
                  }}
                />
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Typography.Text type="secondary">请从左侧选择题目查看排行榜</Typography.Text>
              </div>
            )}
          </div>
        </Splitter.Panel>
      </Splitter>
    </PageContainer>
  );
};

export default QuestionRank;
