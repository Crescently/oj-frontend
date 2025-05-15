import { PageContainer } from '@ant-design/pro-components';
import { history, useModel, useRequest } from '@umijs/max';
import {
  Button,
  Divider,
  List,
  PaginationProps,
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
import { InboxOutlined, SearchOutlined } from '@ant-design/icons';
import './index.css';

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
  const { initialState } = useModel('@@initialState');
  const currentUserId = initialState?.currentUser?.id?.toString() || '';
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

  const onChange: PaginationProps['onChange'] = (current, pageSize) => {
    setPageParams({
      current,
      pageSize,
    });
  };

  const rankColumns: TableProps<API.QuestionSubmitVO>['columns'] = [
    {
      title: '排名',
      dataIndex: 'id',
      width: 80,
      align: 'center',
      render: (_: any, __: any, index: number) => {
        const colors = ['#fadb14', '#d4b106', '#a68200'];
        const medals = ['🥇', '🥈', '🥉'];
        if (index < 3) {
          return (
            <Typography.Text strong style={{ color: colors[index], fontSize: 18 }}>
              {medals[index]} {index + 1}
            </Typography.Text>
          );
        }
        return <Typography.Text>{index + 1}</Typography.Text>;
      },
    },
    {
      title: '用户',
      dataIndex: ['userVO', 'username'],
      render: (text: string) => (
        <Typography.Text style={{ fontWeight: 500 }}>{text}</Typography.Text>
      ),
      align: 'center',
      width: 160,
    },
    {
      title: '用时（ms）',
      dataIndex: ['judgeInfo', 'time'],
      align: 'center',
      sorter: (a: any, b: any) => a.judgeInfo.time - b.judgeInfo.time,
      render: (text: number) => <Typography.Text>{text?.toLocaleString() ?? '-'}</Typography.Text>,
      width: 120,
    },
    {
      title: '内存（KB）',
      dataIndex: ['judgeInfo', 'memory'],
      align: 'center',
      sorter: (a: any, b: any) => a.judgeInfo.memory - b.judgeInfo.memory,
      render: (text: number) => <Typography.Text>{text?.toLocaleString() ?? '-'}</Typography.Text>,
      width: 120,
    },
    {
      title: '提交时间',
      dataIndex: 'createTime',
      width: 180,
      render: (text: string) =>
        text ? (
          <Typography.Text>
            {new Date(text).toLocaleString(undefined, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </Typography.Text>
        ) : (
          '-'
        ),
      align: 'center',
    },
    {
      title: '语言',
      dataIndex: 'language',
      width: 100,
      align: 'center',
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
            pagination={{
              position: 'bottom',
              align: 'end',
              current: pageParams.current,
              pageSize: pageParams.pageSize,
              total: questionData?.total ?? 0,
              onChange: onChange,
            }}
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
                      <Typography.Text strong ellipsis={{ tooltip: item.title }}>
                        {item.title}
                      </Typography.Text>
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
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 24,
                  }}
                >
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    {selectedQuestion.title} - 最佳解答排行榜
                  </Typography.Title>
                  <Button
                    icon={<SearchOutlined />}
                    type={'primary'}
                    onClick={() => {
                      history.push(`/submit/question/${selectedQuestion?.id}`);
                    }}
                  >
                    查看题目详情
                  </Button>
                </div>
                <Table
                  columns={rankColumns}
                  loading={rankLoading}
                  dataSource={rankData?.records?.filter((item) => item.status === 2)}
                  rowKey="id"
                  pagination={false}
                  bordered
                  scroll={{ y: '100vh' }}
                  locale={{
                    emptyText: '暂无提交记录',
                  }}
                  rowClassName={(record) => {
                    const uid = record.userVO?.id?.toString();
                    return uid === currentUserId ? 'highlight-row' : '';
                  }}
                />
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Typography.Text type="secondary">
                  <InboxOutlined style={{ fontSize: 24, marginBottom: 12 }} />
                  <br />
                  请从左侧选择题目查看排行榜
                </Typography.Text>
              </div>
            )}
          </div>
        </Splitter.Panel>
      </Splitter>
    </PageContainer>
  );
};

export default QuestionRank;
