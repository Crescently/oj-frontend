import { useParams } from '@@/exports';
import {
  LikeFilled,
  LikeOutlined,
  PushpinOutlined,
  StarFilled,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Avatar, Button, Col, Divider, message, Row, Space, Tag, Typography } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import {
  getPostVoByIdUsingGet,
  updatePostViewUsingGet,
} from '@/services/onlinejudge-post-service/postController';
import { doPostFavourUsingPost } from '@/services/onlinejudge-post-service/postFavourController';
import { doPostThumbUsingPost } from '@/services/onlinejudge-post-service/postThumbController';
import moment from 'moment';
import PostComment from '@/pages/Post/PostDetail/PostComment';
import MdViewer from '@/components/MdViewer';
import { history, useModel } from '@umijs/max';

const { Title, Text } = Typography;

const PostDetail = () => {
  const params = useParams();
  const [post, setPost] = useState<API.PostVO>({});
  const { initialState } = useModel('@@initialState');
  const getPost = async () => {
    try {
      const res = await getPostVoByIdUsingGet(params); // 请求文章数据
      setPost(res.data || {});
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
    }
  };

  useEffect(() => {
    getPost().then();
    let timer: NodeJS.Timeout;
    if (params?.id) {
      timer = setTimeout(async () => {
        try {
          await updatePostViewUsingGet(params);
        } catch (err) {}
      }, 3000); // 3秒后触发
    }
    return () => {
      clearTimeout(timer); // 页面卸载时清除定时器
    };
  }, [params]);

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
      updateFn: (prev: API.PostVO) => API.PostVO,
    ) => {
      const prevData = { ...post };
      try {
        setPost(updateFn);
        const res = await apiFn({ postId: post.id! });
        if (res.code !== 0) {
          setPost(prevData); // 失败时回滚状态
          message.error(res.msg || '操作失败');
        }
        getPost().then();
      } catch (error) {
        message.error('网络错误，请稍后重试');
        setPost(prevData);
      }
    },
    [post],
  );

  const handleLike = () =>
    handleInteraction(doPostThumbUsingPost, (prev) => ({
      ...prev,
      thumb: !prev.hasThumb,
      thumbNum: (prev.thumbNum || 0) + (prev.hasThumb ? -1 : 1),
    }));

  const handleStar = () =>
    handleInteraction(doPostFavourUsingPost, (prev) => ({
      ...prev,
      favour: !prev.hasFavour,
      favourNum: (prev.favourNum || 0) + (prev.hasFavour ? -1 : 1),
    }));

  const formatTime = (time: any) => {
    const inputTime = moment(time);
    const now = moment();
    if (now.diff(inputTime, 'days') > 10) {
      return inputTime.format('YYYY-MM-DD');
    } else {
      return inputTime.fromNow();
    }
  };
  const UpdateButtons: React.FC<{ data: API.PostVO }> = ({ data }) =>
    data.userVO?.id === initialState?.currentUser?.id ? (
      <Button
        type={'primary'}
        icon={<PushpinOutlined />}
        onClick={() => {
          history.push(`/post/update/${data.id}`);
        }}
      >
        修改
      </Button>
    ) : null;

  const InteractionButtons: React.FC<{ data: API.PostVO }> = ({ data }) => (
    <Space style={{ marginTop: 16 }} direction="horizontal">
      <Button
        icon={data.hasThumb ? <LikeFilled /> : <LikeOutlined />}
        type={data.hasThumb ? 'primary' : 'default'}
        onClick={handleLike}
        style={{ marginRight: '10px' }}
      >
        {data.thumbNum} 点赞
      </Button>
      <Button
        icon={data.hasFavour ? <StarFilled /> : <StarOutlined />}
        type={data.hasFavour ? 'primary' : 'default'}
        onClick={handleStar}
      >
        {data.favourNum} 收藏
      </Button>
      <UpdateButtons data={data} />
    </Space>
  );

  return (
    <PageContainer title={false} style={{ height: '84vh' }}>
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={1}>{post.title}</Title>
        <Row gutter={16} style={{ marginBottom: '20px' }} align="middle">
          <Col>
            {post.tags?.map((tag, index) => (
              <Tag key={index} color={'blue'}>
                {tag}
              </Tag>
            ))}
          </Col>
          <Col>
            {post.userVO?.userPic ? (
              <Avatar size={'large'} src={post.userVO.userPic} />
            ) : (
              <Avatar size={'large'} icon={<UserOutlined />} />
            )}
          </Col>
          <Col>
            <Text type={'secondary'}>作者: {post.userVO?.username}</Text>
          </Col>
          <Col>
            <Text type={'secondary'}>{formatTime(post.createTime!)}</Text>
          </Col>
        </Row>
        <Divider style={{ margin: '20px 0' }} />
        <MdViewer value={post.content} />
        <div style={{ marginTop: '20px' }}>
          <InteractionButtons data={post} />
        </div>
        <PostComment postId={post.id as number} />
      </div>
    </PageContainer>
  );
};

export default PostDetail;
