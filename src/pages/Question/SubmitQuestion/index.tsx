import { PageContainer } from '@ant-design/pro-components';
import React, { useCallback, useEffect, useState } from 'react';
import { history, useParams } from '@@/exports';
import {
  Button,
  Descriptions,
  Divider,
  Drawer,
  Flex,
  Form,
  Input,
  List,
  message,
  PaginationProps,
  Select,
  Space,
  Splitter,
  Tabs,
  Tag,
  Typography,
} from 'antd';
import { CodeEditor } from '@/components';
import { FormProps } from 'antd/lib';
import MdViewer from '@/components/MdViewer';
import {
  ClockCircleOutlined,
  DatabaseOutlined,
  DeploymentUnitOutlined,
  LikeFilled,
  LikeOutlined,
  SearchOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import CommentPage from '@/pages/Question/SubmitQuestion/CommentPage';
import {
  doQuestionSubmitUsingPost,
  getQuestionAnswerByIdUsingPost,
  getQuestionVoByIdUsingGet,
  listQuestionVoByPageUsingPost,
} from '@/services/onlinejudge-question-service/questionController';
import { doThumbUsingPost } from '@/services/onlinejudge-question-service/questionThumbController';
import { doQuestionFavourUsingPost } from '@/services/onlinejudge-question-service/questionFavourController';
import QuestionStatusPage from '@/pages/Question/SubmitQuestion/QuestionStatusPage';
import _ from 'lodash';

/**
 * 用户做题界面
 * @constructor
 */
const SubmitQuestion = () => {
  const params = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [questionData, setQuestionData] = useState<API.QuestionVO>({});
  const [questionList, setQuestionList] = useState<API.PageQuestionVO_>({});
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [questionListOpen, setQuestionListOpen] = useState(false);
  const [questionAnswer, setQuestionAnswer] = useState<string>('');
  const showQuestionDrawer = () => {
    setQuestionListOpen(true);
  };

  const onQuestionDrawerClose = () => {
    setQuestionListOpen(false);
  };

  const [pageParams, setPageParams] = useState<PageParams>({
    current: 1,
    pageSize: 7,
  });

  const onChange: PaginationProps['onChange'] = (current, pageSize) => {
    setPageParams({
      current,
      pageSize,
    });
  };

  const getQuestionList = async () => {
    const res = await listQuestionVoByPageUsingPost({
      ...pageParams,
      title: searchKeyword,
    });
    if (res.code === 0 && res.data) {
      setQuestionList(res.data);
    }
  };

  const getQuestionAnswer = async (params: any) => {
    const res = await getQuestionAnswerByIdUsingPost(params);
    if (res.code === 0 && res.data) {
      setQuestionAnswer(res.data);
    } else {
      setQuestionAnswer(res.msg ?? '');
    }
  };

  const loadData = async (params: any) => {
    const res = await getQuestionVoByIdUsingGet(params);
    if (res.code === 0) {
      setQuestionData(res.data ?? {});
    } else {
      message.error('获取题目失败' + res.msg);
    }
  };
  useEffect(() => {
    loadData(params).then();
    getQuestionAnswer(params).then();
    getQuestionList().then();
  }, [params, pageParams]);

  const handleInteraction = useCallback(
    async (
      apiFn: (
        body: any,
        options?:
          | {
              [key: string]: any;
            }
          | undefined,
      ) => Promise<API.BaseResponseInt_>,
      updateFn: (prev: API.QuestionVO) => API.QuestionVO,
    ) => {
      const prevData = { ...questionData };
      try {
        setQuestionData(updateFn);
        const res = await apiFn({ questionId: questionData.id! });
        if (res.code !== 0) {
          setQuestionData(prevData); // 失败时回滚状态
          message.error(res.msg || '操作失败');
        }
      } catch (error) {
        message.error('网络错误，请稍后重试');
        setQuestionData(prevData);
      }
    },
    [questionData],
  );

  const onFinish: FormProps<API.QuestionSubmitAddRequest>['onFinish'] = async (values) => {
    const res = await doQuestionSubmitUsingPost({
      ...values,
      questionId: questionData.id,
    });
    if (res.code === 0) {
      message.success('成功');
    } else {
      message.error(res.msg);
    }
  };

  const handleLike = () =>
    handleInteraction(doThumbUsingPost, (prev) => ({
      ...prev,
      thumb: !prev.thumb,
      thumbNum: (prev.thumbNum || 0) + (prev.thumb ? -1 : 1),
    }));

  const handleStar = () =>
    handleInteraction(doQuestionFavourUsingPost, (prev) => ({
      ...prev,
      favour: !prev.favour,
      favourNum: (prev.favourNum || 0) + (prev.favour ? -1 : 1),
    }));

  const handleNextQuestion = () => {
    const records = questionList.records || [];
    if (records.length === 0) return;

    const currentIndex = records.findIndex((item) => item.id === questionData.id);
    if (currentIndex === -1) {
      message.warning('当前题目不在列表中').then();
      return;
    }

    const nextIndex = (currentIndex + 1) % records.length;
    const nextQuestion = records[nextIndex];
    history.push(`/submit/question/${nextQuestion.id}`);
    onQuestionDrawerClose();
  };

  const calculatePassRate = (item: API.QuestionVO) => {
    return item.submitNum
      ? Math.round(((item.acceptedNum ?? 0) / item.submitNum) * 100 * 100) / 100 // 保留两位小数
      : 0;
  };

  const JudgeLimitTag: React.FC<{ data: API.QuestionVO }> = ({ data }) => (
    <Space size={6} direction="horizontal">
      <Tag icon={<ClockCircleOutlined />} color="blue">
        时间限制: {data.judgeConfig?.timeLimit}ms
      </Tag>
      <Tag icon={<DatabaseOutlined />} color="geekblue">
        内存限制: {data.judgeConfig?.memoryLimit}kb
      </Tag>
      <Tag icon={<DeploymentUnitOutlined />} color="cyan">
        堆栈限制: {data.judgeConfig?.stackLimit}kb
      </Tag>
    </Space>
  );

  const StatisticRow: React.FC<{ data: API.QuestionVO }> = ({ data }) => (
    <Flex wrap gap="large" align={'center'}>
      <Typography.Text>通过数：{data.acceptedNum}</Typography.Text>
      <Divider type="vertical" />
      <Typography.Text>提交数：{data.submitNum}</Typography.Text>
      <Divider type="vertical" />
      <Typography.Text>通过率：{calculatePassRate(data)}%</Typography.Text>
    </Flex>
  );

  const InteractionButtons: React.FC<{ data: API.QuestionVO }> = ({ data }) => (
    <Space style={{ marginTop: 16 }} direction="horizontal">
      <Button
        icon={data.thumb ? <LikeFilled /> : <LikeOutlined />}
        type={data.thumb ? 'primary' : 'default'}
        onClick={handleLike}
        style={{ marginRight: '10px' }}
      >
        {data.thumbNum} 点赞
      </Button>
      <Button
        icon={data.favour ? <StarFilled /> : <StarOutlined />}
        type={data.favour ? 'primary' : 'default'}
        onClick={handleStar}
      >
        {data.favourNum} 收藏
      </Button>
    </Space>
  );

  const handleSearch = useCallback(
    _.debounce((value: string) => {
      setPageParams((prev) => ({
        ...prev,
        current: 1,
      }));
      setSearchKeyword(value);
    }, 500),
    [],
  );
  const QuestionList: React.FC = () => (
    <div style={{ padding: '0 16px' }}>
      <Input
        placeholder="搜索题目..."
        allowClear
        prefix={<SearchOutlined />}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <List<API.QuestionVO>
        size="large"
        rowKey="id"
        itemLayout="vertical"
        split={false}
        pagination={{
          position: 'bottom',
          align: 'end',
          current: pageParams.current,
          pageSize: pageParams.pageSize,
          total: questionList.total,
          onChange: onChange,
        }}
        dataSource={questionList.records || []}
        renderItem={(item) => (
          <List.Item
            style={{
              padding: '16px',
              margin: '8px 0',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s',
              cursor: 'pointer',
              background: item.id === questionData.id ? '#f0f7ff' : 'inherit',
            }}
            onClick={() => {
              history.push(`/submit/question/${item.id}`);
              onQuestionDrawerClose();
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography.Text strong style={{ fontSize: 16 }}>
                {item.title}
              </Typography.Text>
            </div>
            <Space style={{ marginTop: 8 }}>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                提交数: {item.submitNum || 0}
              </Typography.Text>
              <Divider type="vertical" />
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                通过率: {calculatePassRate(item)}%
              </Typography.Text>
            </Space>
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <PageContainer
      title={
        <Space>
          <Button type="primary" onClick={showQuestionDrawer}>
            题库
          </Button>
          <Button onClick={handleNextQuestion} type={'primary'}>
            下一题
          </Button>
        </Space>
      }
    >
      <Drawer
        title="题目列表"
        width={500}
        placement={'left'}
        onClose={onQuestionDrawerClose}
        open={questionListOpen}
      >
        <QuestionList />
      </Drawer>
      <Splitter
        style={{
          height: '100vh',
        }}
      >
        <Splitter.Panel
          defaultSize="50%"
          style={{
            marginRight: 10,
            background: 'white',
            borderRadius: '16px',
          }}
        >
          <Tabs type="card" defaultActiveKey="1">
            <Tabs.TabPane tab="题目详情" key="1">
              <div style={{ paddingLeft: '16px' }}>
                <Typography.Title>{questionData.title}</Typography.Title>
                <Descriptions column={1}>
                  <Descriptions.Item>
                    {questionData.tags?.map((tag, index) => {
                      return (
                        <Tag key={index} color={'green'}>
                          {tag}
                        </Tag>
                      );
                    })}
                  </Descriptions.Item>
                  <Descriptions.Item>
                    <JudgeLimitTag data={questionData} />
                  </Descriptions.Item>
                  <Descriptions.Item>
                    <MdViewer value={questionData.content} />
                  </Descriptions.Item>
                  <Descriptions.Item>
                    <StatisticRow data={questionData} />
                  </Descriptions.Item>
                </Descriptions>
                <InteractionButtons data={questionData} />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="评论" key="2">
              <CommentPage questionId={questionData.id as number} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="答案" key="3">
              <div style={{ paddingLeft: '16px' }}>
                <MdViewer value={questionAnswer} />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="提交历史" key="4">
              <QuestionStatusPage questionId={questionData.id as number} />
            </Tabs.TabPane>
          </Tabs>
        </Splitter.Panel>
        <Splitter.Panel
          style={{
            marginLeft: 10,
            background: 'white',
            borderRadius: '16px',
            paddingTop: 10,
          }}
        >
          <Form
            name={'submitQuestion'}
            onFinish={onFinish}
            onFinishFailed={(errorInfo) => {
              message.error('Failed:' + errorInfo).then();
            }}
            onValuesChange={(changedValues) => {
              if (changedValues.language !== undefined) {
                setSelectedLanguage(changedValues.language);
              }
            }}
            initialValues={{
              language: 'java',
            }}
          >
            <Space direction={'horizontal'} align={'baseline'} style={{ marginLeft: 10 }}>
              <Typography.Text>编程语言 </Typography.Text>
              <Form.Item<API.QuestionSubmitAddRequest> name="language">
                <Select
                  style={{ minWidth: '250px', marginTop: 5 }}
                  placeholder="选择语言"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={[
                    { value: 'java', label: 'Java' },
                    { value: 'cpp', label: 'C++' },
                    { value: 'python', label: 'Python' },
                    { value: 'go', label: 'Golang' },
                  ]}
                />
              </Form.Item>
            </Space>
            <Form.Item<API.QuestionSubmitAddRequest> name="code">
              <CodeEditor language={selectedLanguage || 'java'} />
            </Form.Item>
            <Divider variant={'dashed'} />
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginLeft: 750, width: 100 }}>
                提交
              </Button>
            </Form.Item>
          </Form>
        </Splitter.Panel>
      </Splitter>
    </PageContainer>
  );
};

export default SubmitQuestion;
