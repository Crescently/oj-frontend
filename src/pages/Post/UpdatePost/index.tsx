import TagInput from '@/pages/Question/AddQuestion/components/TagInput';
import { InfoCircleOutlined, SendOutlined } from '@ant-design/icons';
import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Card, Form, message, Tooltip } from 'antd';
import { MdEditor, MyDivider } from '@/components';
import { history } from '@umijs/max';
import {
  editPostUsingPost,
  getPostVoByIdUsingGet,
} from '@/services/onlinejudge-post-service/postController';
import { useParams } from '@@/exports';
import { useEffect, useState } from 'react';
import { FormProps } from 'antd/lib';

const UpdatePost = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const [oldPost, setOldPost] = useState<API.PostVO>({});

  const getOldPost = async (params: any) => {
    const res = await getPostVoByIdUsingGet(params);
    if (res.code === 0) {
      setOldPost(res.data ?? {});
      form.setFieldsValue(res.data);
    }
  };
  useEffect(() => {
    getOldPost(params).then();
  }, [params]);

  const onFinish: FormProps<API.PostEditRequest>['onFinish'] = async (
    values: API.PostEditRequest,
  ) => {
    const postParams: API.PostEditRequest = {
      title: values.title,
      tags: values.tags,
      content: values.content,
    };
    const res = await editPostUsingPost({ id: oldPost.id, ...postParams });
    if (res.code === 0) {
      message.success('文章修改成功');
      history.back(); // 发布成功跳转
    } else {
      message.error('修改失败：' + res.msg);
    }
  };

  return (
    <PageContainer title={false}>
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          padding: '24px',
        }}
      >
        <Card
          bodyStyle={{ paddingTop: 64 }}
          style={{
            position: 'relative',
            borderRadius: 12,
            height: 750,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
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

          <ProForm<API.PostEditRequest>
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
            />

            <Form.Item
              label={
                <span>
                  标签
                  <Tooltip title="最多添加5个标签，使用回车确认">
                    <InfoCircleOutlined style={{ marginLeft: 6, color: '#8c8c8c' }} />
                  </Tooltip>
                </span>
              }
              name="tags"
              rules={[{ required: true, message: '请至少添加一个标签' }]}
            >
              <TagInput />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  内容
                  <Tooltip title="支持 Markdown 语法，可使用预览模式">
                    <InfoCircleOutlined style={{ marginLeft: 6, color: '#8c8c8c' }} />
                  </Tooltip>
                </span>
              }
              name="content"
              rules={[{ required: true, message: '请输入文章内容' }]}
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

export default UpdatePost;
