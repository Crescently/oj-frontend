import { PageContainer } from '@ant-design/pro-components';
import { Button, Col, Form, Input, message, Row, Space, Typography } from 'antd';
import { useState } from 'react';
import { FormProps } from 'antd/lib';
import { MdEditor } from '@/components';
import TagInput from '@/pages/Question/AddQuestion/components/TagInput';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { addQuestionUsingPost } from '@/services/onlinejudge-question-service/questionController';

const AddQuestion = () => {
  const [formValue] = useState<API.QuestionAddRequest>({
    title: '',
    content: '',
    tags: [],
    answer: '',
    judgeCase: [
      {
        input: '',
        output: '',
      },
    ],
    judgeConfig: {
      timeLimit: 1000,
      memoryLimit: 1000,
      stackLimit: 1000,
    },
  });

  const onFinish: FormProps<API.QuestionAddRequest>['onFinish'] = async (values) => {
    const res = await addQuestionUsingPost(values);
    if (res.code === 0) {
      message.success('添加成功');
    } else {
      message.error('添加失败: ' + res.msg);
    }
  };

  return (
    <PageContainer title="创建题目">
      <Form
        name="addQuestion"
        layout="vertical"
        style={{ maxWidth: 900, margin: '0 auto' }}
        onFinish={onFinish}
        initialValues={formValue}
      >
        <Form.Item
          label="题目标题"
          name="title"
          rules={[{ required: true, message: '请输入题目标题' }]}
        >
          <Input placeholder="请输入题目标题" />
        </Form.Item>

        <Form.Item label="标签" name="tags" rules={[{ required: true, message: '请输入标签' }]}>
          <TagInput />
        </Form.Item>

        <Form.Item
          label="题目内容"
          name="content"
          rules={[{ required: true, message: '请输入题目内容' }]}
        >
          <MdEditor />
        </Form.Item>

        <Form.Item
          label="题目答案"
          name="answer"
          rules={[{ required: true, message: '请输入题目答案' }]}
        >
          <MdEditor />
        </Form.Item>

        <Typography.Title level={5}>判题测试用例</Typography.Title>
        <Form.List name="judgeCase">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 12 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'input']}
                    rules={[{ required: true, message: '请输入输入用例' }]}
                  >
                    <Input placeholder="输入" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'output']}
                    rules={[{ required: true, message: '请输入输出用例' }]}
                  >
                    <Input placeholder="输出" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                  添加测试用例
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Typography.Title level={5} style={{ marginTop: 32 }}>
          判题配置
        </Typography.Title>
        <Space size="large">
          <Form.Item
            label="时间限制 (ms)"
            name={['judgeConfig', 'timeLimit']}
            rules={[{ required: true, message: '请输入时间限制' }]}
          >
            <Input type="number" min={0} style={{ width: 160 }} />
          </Form.Item>
          <Form.Item
            label="内存限制 (KB)"
            name={['judgeConfig', 'memoryLimit']}
            rules={[{ required: true, message: '请输入内存限制' }]}
          >
            <Input type="number" min={0} style={{ width: 160 }} />
          </Form.Item>
          <Form.Item
            label="堆栈限制 (KB)"
            name={['judgeConfig', 'stackLimit']}
            rules={[{ required: true, message: '请输入堆栈限制' }]}
          >
            <Input type="number" min={0} style={{ width: 160 }} />
          </Form.Item>
        </Space>

        <Form.Item style={{ marginTop: 32 }}>
          <Row justify="end">
            <Col>
              <Button type="primary" htmlType="submit" size={'large'} style={{ minWidth: 128 }}>
                提交
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </PageContainer>
  );
};

export default AddQuestion;
