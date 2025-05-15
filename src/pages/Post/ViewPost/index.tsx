import {
  EyeOutlined,
  FormOutlined,
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Avatar, Button, Input, List, message, Popover, Space, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { listPostVoByPageUsingPost } from '@/services/onlinejudge-post-service/postController';
import moment from 'moment';
import debounce from 'lodash/debounce';
import { history } from '@umijs/max';
import removeMarkdown from 'remove-markdown';

const ViewPost: React.FC = () => {
  const [queryParams, setQueryParams] = useState({
    title: '',
    current: 1,
    pageSize: 4,
  });

  const [postList, setPostList] = useState<API.PagePostVO_>({});
  const [loading, setLoading] = useState(false);

  const getPostList = async () => {
    setLoading(true);
    const res = await listPostVoByPageUsingPost(queryParams);
    if (res.code === 0) {
      setPostList(res?.data ?? {});
    } else {
      message.error('获取帖子失败：' + res.msg);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPostList().then();
  }, [queryParams]);

  const formatTime = (time: any) => {
    const inputTime = moment(time);
    const now = moment();

    if (now.diff(inputTime, 'days') > 30) {
      return inputTime.format('YYYY-MM-DD HH:mm:ss');
    } else {
      return inputTime.fromNow();
    }
  };

  const IconText = ({ icon, text }: { icon: React.FC; text?: number }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const debouncedSearch = useMemo(() => {
    return debounce((value: string) => {
      setQueryParams((prev) => ({
        ...prev,
        title: value,
        current: 1,
      }));
    }, 500);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  const renderUserCard = (user: API.UserVO | undefined) => {
    if (!user) return null;

    return (
      <div style={{ width: 240 }}>
        <Space direction="vertical">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar size={48} src={user.userPic} />
            <div>
              <Typography.Text strong>{user.username}</Typography.Text>
              {user.signature && (
                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    「{user.signature}」
                  </Typography.Text>
                </div>
              )}
            </div>
          </div>
          {user.userEmail && <Typography.Text>邮箱：{user.userEmail}</Typography.Text>}
          {user.description && (
            <Typography.Paragraph ellipsis={{ rows: 2 }}>
              简介：{user.description}
            </Typography.Paragraph>
          )}
        </Space>
      </div>
    );
  };

  return (
    <PageContainer title={false}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '16px 0' }}>
        {/* 搜索和发帖按钮 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <Input.Search
            placeholder="输入标题进行搜索"
            allowClear
            enterButton
            onChange={handleInputChange}
            style={{ maxWidth: 400 }}
          />
          <Button type="primary" icon={<FormOutlined />} onClick={() => history.push('/post/add')}>
            发帖
          </Button>
        </div>

        {/* 帖子列表 */}
        <List
          itemLayout="vertical"
          size="large"
          loading={loading}
          pagination={{
            current: queryParams.current,
            pageSize: queryParams.pageSize,
            onChange: (page) => {
              setQueryParams({ ...queryParams, current: page });
            },
            total: postList.total,
          }}
          dataSource={postList.records}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              style={{
                backgroundColor: '#fff',
                borderRadius: 8,
                padding: 24,
                marginBottom: 16,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                transition: 'box-shadow 0.3s',
              }}
              onClick={() => {
                history.push(`/post/detail/${item.id}`);
              }}
              actions={[
                <IconText icon={StarOutlined} text={item.favourNum} key="star" />,
                <IconText icon={LikeOutlined} text={item.thumbNum} key="like" />,
                <IconText icon={MessageOutlined} text={item.commentCount ?? 0} key="comment" />,
                <IconText icon={EyeOutlined} text={item.viewCount ?? 0} key="view" />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Popover content={renderUserCard(item.userVO)} trigger="hover">
                    <Avatar size="large" src={item.userVO?.userPic} />
                  </Popover>
                }
                title={
                  <Typography.Title level={5} style={{ marginBottom: 4 }}>
                    {item.title}
                  </Typography.Title>
                }
                description={
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      color: '#888',
                      fontSize: 13,
                    }}
                  >
                    <span>{item.userVO?.username}</span>
                    <span>{formatTime(item.createTime)}</span>
                  </div>
                }
              />
              <Typography.Paragraph ellipsis={{ rows: 3 }}>
                {removeMarkdown(item.content ?? '')}
              </Typography.Paragraph>
            </List.Item>
          )}
        />
      </div>
    </PageContainer>
  );
};

export default ViewPost;
