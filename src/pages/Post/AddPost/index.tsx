import { MdEditor, MyDivider } from '@/components';
import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Card, Form, message, Tooltip } from 'antd';
import TagInput from '@/pages/Question/AddQuestion/components/TagInput';
import React from 'react';
import { InfoCircleOutlined, SendOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { addPostUsingPost } from '@/services/onlinejudge-post-service/postController';

const AddPost: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: API.PostAddRequest) => {
    const postParams: API.PostAddRequest = {
      title: values.title,
      tags: values.tags,
      content: values.content,
    };
    const res = await addPostUsingPost(postParams);
    if (res.code === 0) {
      message.success('文章添加成功');
      history.push('/post'); // 发布成功跳转
    } else {
      message.error('添加失败：' + res.msg);
    }
  };

  return (
    <PageContainer title={false}>
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: '24px',
        }}
      >
        <Card
          bodyStyle={{ paddingTop: 64 }}
          style={{
            position: 'relative',
            borderRadius: 16,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
            backgroundColor: '#fff',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 16,
              right: 24,
              display: 'flex',
              gap: 12,
            }}
          >
            <Button onClick={() => history.back()} style={{ borderRadius: 6 }}>
              取消
            </Button>
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={() => form.submit()}
              style={{ borderRadius: 6, fontWeight: 500 }}
            >
              发布
            </Button>
          </div>

          <ProForm<API.PostAddRequest>
            form={form}
            layout="vertical"
            onFinish={onFinish}
            submitter={false}
          >
            <ProFormText
              name="title"
              label="标题"
              placeholder="请输入文章标题"
              rules={[{ required: true, message: '请输入文章标题' }]}
              fieldProps={{
                size: 'large',
              }}
            />

            <Form.Item
              label={
                <span style={{ fontWeight: 500 }}>
                  标签
                  <Tooltip title="最多添加 5 个标签，使用回车确认">
                    <InfoCircleOutlined style={{ marginLeft: 6, color: '#8c8c8c' }} />
                  </Tooltip>
                </span>
              }
              name="tags"
              rules={[{ required: true, message: '请至少添加一个标签' }]}
              style={{ marginBottom: 24 }}
            >
              <TagInput />
            </Form.Item>

            <Form.Item
              label={
                <span style={{ fontWeight: 500 }}>
                  内容
                  <Tooltip title="支持 Markdown 语法，可使用预览模式">
                    <InfoCircleOutlined style={{ marginLeft: 6, color: '#8c8c8c' }} />
                  </Tooltip>
                </span>
              }
              name="content"
              rules={[{ required: true, message: '请输入文章内容' }]}
              style={{ marginBottom: 32, height: 400 }}
            >
              <MdEditor />
            </Form.Item>

            <MyDivider height={16} />
          </ProForm>
        </Card>
      </div>
    </PageContainer>
  );
};

export default AddPost;
