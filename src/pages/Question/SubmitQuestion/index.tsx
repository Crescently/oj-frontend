import { PageContainer } from '@ant-design/pro-components';
import React, { useCallback, useEffect, useState } from 'react';
import {
  getQuestionVoById,
  listQuestionVoByPage,
} from '@/services/onlinejudge-backend/questionController';
import { history, useParams } from '@@/exports';
import {
  Button,
  Descriptions,
  Divider,
  Drawer,
  Flex,
  Form,
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
import { doQuestionSubmit } from '@/services/onlinejudge-backend/questionSubmitController';
import MdViewer from '@/components/MdViewer';
import {
  ClockCircleOutlined,
  DatabaseOutlined,
  DeploymentUnitOutlined,
  LikeFilled,
  LikeOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { doThumb } from '@/services/onlinejudge-backend/questionThumbController';
import { doQuestionFavour } from '@/services/onlinejudge-backend/questionFavourController';
import CommentPage from '@/pages/Question/SubmitQuestion/CommentPage';

const SubmitQuestion = () => {
  const params = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [questionData, setQuestionData] = useState<API.QuestionVO>({});
  const [questionList, setQuestionList] = useState<API.PageQuestionVO>({});
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [pageParams, setPageParams] = useState<PageParams>({
    current: 1,
    pageSize: 5,
  });

  const onChange: PaginationProps['onChange'] = (current, pageSize) => {
    setPageParams({
      current,
      pageSize,
    });
  };

  const getQuestionList = async () => {
    const res = await listQuestionVoByPage(pageParams);
    if (res.code === 0 && res.data) {
      setQuestionList(res.data);
    }
  };

  const loadData = async (params: any) => {
    const res = await getQuestionVoById(params);
    if (res.code === 0) {
      setQuestionData(res.data ?? {});
    } else {
      message.error('获取题目失败' + res.msg);
    }
  };
  useEffect(() => {
    loadData(params).then();
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
      ) => Promise<API.BaseResponseInteger>,
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
    const res = await doQuestionSubmit({
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
    handleInteraction(doThumb, (prev) => ({
      ...prev,
      thumb: !prev.thumb,
      thumbNum: (prev.thumbNum || 0) + (prev.thumb ? -1 : 1),
    }));

  const handleStar = () =>
    handleInteraction(doQuestionFavour, (prev) => ({
      ...prev,
      favour: !prev.favour,
      favourNum: (prev.favourNum || 0) + (prev.favour ? -1 : 1),
    }));

  // 辅助组件抽离
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
      <Typography.Text>通过次数：{data.acceptedNum}</Typography.Text>
      <Divider type="vertical" />
      <Typography.Text>提交次数：{data.submitNum}</Typography.Text>
      <Divider type="vertical" />
      <Typography.Text>
        通过率：{data.submitNum ? (data.acceptedNum ?? 0) / data.submitNum : 0}
      </Typography.Text>
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
  const QuestionList: React.FC = () => (
    <List<API.QuestionVO>
      size="large"
      rowKey="id"
      itemLayout="vertical"
      split={true}
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
          key={item.id}
          onClick={() => {
            history.push(`/submit/question/${item.id}`);
            onClose();
          }}
        >
          <List.Item.Meta title={<a>{item.title}</a>} />
        </List.Item>
      )}
    />
  );

  return (
    <PageContainer
      title={
        <Button type={'primary'} style={{ width: 64 }} onClick={showDrawer}>
          题库
        </Button>
      }
    >
      <Drawer title="题目列表" width={500} placement={'left'} onClose={onClose} open={open}>
        <QuestionList />
      </Drawer>

      <Splitter style={{ height: '100vh' }}>
        <Splitter.Panel defaultSize="50%" style={{ marginLeft: 10 }}>
          <Tabs type="card" defaultActiveKey="1">
            <Tabs.TabPane tab="答题" key="1">
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
            </Tabs.TabPane>
            <Tabs.TabPane tab="评论" key="2">
              <CommentPage questionId={questionData.id as number} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="答案" key="3"></Tabs.TabPane>
            <Tabs.TabPane tab="提交状态" key="3"></Tabs.TabPane>
          </Tabs>
        </Splitter.Panel>
        <Splitter.Panel>
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

            <Form.Item>
              <Button type="primary" htmlType="submit">
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
