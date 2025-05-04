import { PageContainer } from '@ant-design/pro-components';
import { Button, Form, Input, message, Space } from 'antd';
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
      timeLimit: 0,
      memoryLimit: 0,
      stackLimit: 0,
    },
  });

  const onFinish: FormProps<API.QuestionAddRequest>['onFinish'] = async (values) => {
    console.log('Success:', values);
    const res = await addQuestionUsingPost(values);
    if (res.code === 0) {
      message.success('添加成功');
    } else {
      message.error(res.msg);
    }
  };

  const onFinishFailed: FormProps<API.QuestionAddRequest>['onFinishFailed'] = (errorInfo) => {
    message.error('Failed:' + errorInfo).then();
  };

  return (
    <PageContainer title={'创建题目'}>
      <Form
        name="addQuestion"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          ...formValue,
          judgeConfig: {
            timeLimit: 1000,
            memoryLimit: 1000,
            stackLimit: 1000,
          },
        }}
      >
        <Form.Item<API.QuestionAddRequest> label={'题目'} name="title">
          <Input placeholder="请输入题目" />
        </Form.Item>

        <Form.Item<API.QuestionAddRequest> label={'标签'} name="tags">
          <TagInput />
        </Form.Item>

        <Form.Item<API.QuestionAddRequest> label="题目内容" name="content">
          <MdEditor />
        </Form.Item>

        <Form.Item<API.QuestionAddRequest> label="题目答案" name="answer">
          <MdEditor />
        </Form.Item>

        <Form.Item<API.QuestionAddRequest> label="判题用例">
          <Form.List name="judgeCase">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item {...restField} name={[name, 'input']}>
                      <Input placeholder="请填写输入用例" />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, 'output']}>
                      <Input placeholder="请填写输出用例" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    添加测试用例
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item label="判题配置">
          <Form.Item label="时间限制 (ms)" name={['judgeConfig', 'timeLimit']}>
            <Input type="number" />
          </Form.Item>

          <Form.Item label="内存限制 (KB)" name={['judgeConfig', 'memoryLimit']}>
            <Input type="number" />
          </Form.Item>

          <Form.Item label="堆栈限制 (KB)" name={['judgeConfig', 'stackLimit']}>
            <Input type="number" />
          </Form.Item>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </PageContainer>
  );
};

export default AddQuestion;
