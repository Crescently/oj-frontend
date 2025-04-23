import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { getQuestionVoById } from '@/services/onlinejudge-backend/questionController';
import { useParams } from '@@/exports';
import {
  Button,
  Descriptions,
  Divider,
  Flex,
  Form,
  message,
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

const SubmitQuestion = () => {
  const params = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [data, setData] = useState<API.QuestionVO>({});

  const loadData = async (params: any) => {
    const res = await getQuestionVoById(params);
    if (res.code === 0) {
      setData(res.data ?? {});
    } else {
      message.error('获取题目失败' + res.msg);
    }
  };
  useEffect(() => {
    loadData(params).then();
  }, [params]);

  const onFinish: FormProps<API.QuestionSubmitAddRequest>['onFinish'] = async (values) => {
    const res = await doQuestionSubmit({
      ...values,
      questionId: data.id,
    });
    if (res.code === 0) {
      message.success('成功');
    } else {
      message.error(res.msg);
    }
  };

  const handleLike = async () => {
    try {
      const newLikedStatus = !data.thumb;
      const updatedLikesCount = data.thumb ? data.thumbNum! - 1 : data.thumbNum! + 1;

      // 假设请求点赞接口
      await doThumb({ questionId: data.id });
      setData({
        ...data,
        thumb: newLikedStatus,
        thumbNum: updatedLikesCount,
      });
      message.success(newLikedStatus ? '点赞成功' : '取消点赞');
    } catch (error) {
      console.error('点赞失败:', error);
      message.error('点赞失败');
    }
  };

  // 模拟收藏操作
  const handleStar = async () => {
    try {
      const newStarredStatus = !data.favour;
      const updatedStarsCount = data.favour ? data.favourNum! - 1 : data.favourNum! + 1;

      // 假设请求收藏接口
      await doQuestionFavour({ questionId: data.id });
      setData({
        ...data,
        favour: newStarredStatus,
        favourNum: updatedStarsCount,
      });
      message.success(newStarredStatus ? '收藏成功' : '取消收藏');
    } catch (error) {
      console.error('收藏失败:', error);
      message.error('收藏失败');
    }
  };

  return (
    <PageContainer title={'答题界面'}>
      <Splitter style={{ height: '100vh' }}>
        <Splitter.Panel defaultSize="50%" style={{ marginLeft: 10 }}>
          <Tabs type="card" defaultActiveKey="1">
            <Tabs.TabPane tab="答题" key="1">
              <Typography.Title>{data.title}</Typography.Title>
              <Descriptions column={1}>
                <Descriptions.Item>
                  {data.tags?.map((tag, index) => {
                    return (
                      <Tag key={index} color={'green'}>
                        {tag}
                      </Tag>
                    );
                  })}
                </Descriptions.Item>
                <Descriptions.Item>
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
                </Descriptions.Item>
                <Descriptions.Item>
                  <MdViewer value={data.content} />
                </Descriptions.Item>
                <Descriptions.Item>
                  <Flex wrap gap="large" align={'center'}>
                    <Typography.Text>通过次数：{data.acceptedNum}</Typography.Text>
                    <Divider type="vertical" />
                    <Typography.Text>提交次数：{data.submitNum}</Typography.Text>
                    <Divider type="vertical" />
                    <Typography.Text>
                      通过率：{data.submitNum ? (data.acceptedNum ?? 0) / data.submitNum : 0}
                    </Typography.Text>
                  </Flex>
                </Descriptions.Item>
              </Descriptions>
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
            </Tabs.TabPane>
            <Tabs.TabPane tab="评论" key="2"></Tabs.TabPane>
            <Tabs.TabPane tab="答案" key="3"></Tabs.TabPane>
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
            <Form.Item<API.QuestionSubmitAddRequest> name="language">
              <Select
                style={{ width: '30%', marginTop: 5 }}
                showSearch
                placeholder="选择语言"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[
                  { value: 'java', label: 'Java' },
                  { value: 'cpp', label: 'C++' },
                  { value: 'python', label: 'Python' },
                ]}
              />
            </Form.Item>

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
