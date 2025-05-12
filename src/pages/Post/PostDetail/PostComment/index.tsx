import {
  Avatar,
  Button,
  Col,
  Divider,
  Flex,
  Input,
  List,
  message,
  PaginationProps,
  Row,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import {
  addPostCommentUsingPost,
  listPostCommentVoByPageUsingPost,
} from '@/services/onlinejudge-post-service/postCommentController';

const { Text, Paragraph } = Typography;

interface Props {
  postId: number;
}

const PostComment: React.FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<API.PagePostCommentVO_>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pageParams, setPageParams] = useState<PageParams>({
    current: 1,
    pageSize: 10,
  });
  const getComment = async () => {
    const res = await listPostCommentVoByPageUsingPost({ postId, ...pageParams });
    try {
      if (res.code === 0 && res.data) {
        setComments(res.data);
      } else {
        message.error(res.msg || '加载评论失败');
      }
    } catch (error) {
      message.error('加载评论失败，请稍后重试');
    }
  };
  useEffect(() => {
    setPageParams((prev) => ({ current: 1, pageSize: prev.pageSize }));
  }, [postId]);

  useEffect(() => {
    getComment().then();
  }, [postId, pageParams]);

  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e: any) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await addPostCommentUsingPost({
        postId: postId,
        content: newComment.trim(),
      });
      if (res.code === 0) {
        message.success('评论成功');
        setNewComment('');
        // 提交成功后重置到第一页
        setPageParams((prev) => ({ current: 1, pageSize: prev.pageSize }));
      } else {
        message.error(res.msg || '评论失败');
      }
    } catch (error) {
      message.error('请求失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };
  const formatTime = (time: any) => {
    const inputTime = moment(time);
    const now = moment();

    if (now.diff(inputTime, 'days') > 30) {
      return inputTime.format('YYYY-MM-DD HH:mm:ss');
    } else {
      return inputTime.fromNow();
    }
  };

  const onChange: PaginationProps['onChange'] = (current, pageSize) => {
    setPageParams({ current, pageSize });
  };
  return (
    <>
      <div>
        <Flex style={{ marginTop: 20, marginRight: 20 }} vertical gap="middle">
          <Input.TextArea
            value={newComment}
            onChange={handleCommentChange}
            rows={4}
            placeholder="发表你的评论"
            disabled={isSubmitting}
          />
          <Button
            type="primary"
            onClick={handleCommentSubmit}
            disabled={!newComment.trim() || isSubmitting}
            loading={isSubmitting}
            style={{ alignSelf: 'flex-end' }}
          >
            评论
          </Button>
        </Flex>
        <Divider dashed />
        <List
          itemLayout="horizontal"
          dataSource={comments.records}
          pagination={{
            position: 'bottom',
            align: 'end',
            current: pageParams.current,
            pageSize: pageParams.pageSize,
            total: comments.total,
            onChange,
          }}
          renderItem={(comment) => (
            <List.Item
              style={{
                marginBottom: '20px',
                padding: '10px',
                border: '1px solid #f0f0f0',
                borderRadius: '8px',
              }}
            >
              <div style={{ minWidth: 800 }}>
                <Row>
                  <Col span={2}>
                    {comment.userVO?.userPic ? (
                      <Avatar size={'large'} src={comment.userVO?.userPic} />
                    ) : (
                      <Avatar size={'large'} icon={<UserOutlined />} />
                    )}
                  </Col>
                  <Col span={20}>
                    <Row>
                      <Col span={24}>
                        <Text>{comment.userVO?.username}</Text>
                        <Text type="secondary" style={{ marginLeft: '10px', fontSize: '12px' }}>
                          {formatTime(comment.createTime)}
                        </Text>
                      </Col>
                      <Col span={24} style={{ marginTop: '10px' }}>
                        <Paragraph copyable={{ icon: <>复制评论</> }} style={{ fontSize: '14px' }}>
                          {comment.content}
                        </Paragraph>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default PostComment;
