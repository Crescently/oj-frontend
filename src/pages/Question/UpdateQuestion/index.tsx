import { PageContainer } from '@ant-design/pro-components';
import { Button, Form, Input, message, Space } from 'antd';
import { useEffect, useState } from 'react';
import { FormProps } from 'antd/lib';
import { MdEditor } from '@/components';
import TagInput from '@/pages/Question/AddQuestion/components/TagInput';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useParams } from '@@/exports';
import {
  getQuestionByIdUsingGet,
  updateQuestionUsingPost,
} from '@/services/onlinejudge-question-service/questionController';

const UpdateQuestion = () => {
  const [data, setData] = useState<API.QuestionAdminVO>({
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

  const params = useParams();
  const [form] = Form.useForm();

  const loadData = async (params: any) => {
    const res = await getQuestionByIdUsingGet(params);
    if (res.code === 0 && res.data) {
      setData(res.data);
      form.setFieldsValue(res.data);
    } else {
      message.error(res.msg);
    }
  };

  useEffect(() => {
    loadData(params).then();
  }, [params]);

  const onFinish: FormProps<API.QuestionUpdateRequest>['onFinish'] = async (values) => {
    console.log('Success:', values);
    const res = await updateQuestionUsingPost({ id: data.id, ...values });
    if (res.code === 0) {
      message.success('修改成功');
    } else {
      message.error('修改失败' + res.msg);
    }
  };

  return (
    <PageContainer title={'修改题目'}>
      <Form
        name="updateQuestion"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={(errorInfo) => message.error('提交失败: ' + errorInfo)}
        form={form}
      >
        <Form.Item<API.QuestionAddRequest> label={'题目'} name="title">
          <Input placeholder="请输入题目" />
        </Form.Item>

        <Form.Item<API.QuestionUpdateRequest> label={'标签'} name="tags">
          <TagInput />
        </Form.Item>

        <Form.Item<API.QuestionUpdateRequest> label="题目内容" name="content">
          <MdEditor />
        </Form.Item>

        <Form.Item<API.QuestionUpdateRequest> label="题目答案" name="answer">
          <MdEditor />
        </Form.Item>

        <Form.Item<API.QuestionUpdateRequest> label="判题用例">
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

export default UpdateQuestion;
