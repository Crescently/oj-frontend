import React, { useEffect, useState } from 'react';
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
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';
import {
  addCommentUsingPost,
  listCommentVoByPageUsingPost,
} from '@/services/onlinejudge-question-service/commentController';

interface Props {
  questionId: number;
}

const CommentPage: React.FC<Props> = ({ questionId }) => {
  const [data, setData] = useState<API.PageCommentVO_>({});
  const [pageParams, setPageParams] = useState<PageParams>({
    current: 1,
    pageSize: 10,
  });
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async (pageParams: PageParams) => {
    try {
      const res = await listCommentVoByPageUsingPost({ questionId, ...pageParams });
      if (res.code === 0 && res.data) {
        setData(res.data);
      } else {
        message.error(res.msg || '加载评论失败');
      }
    } catch (error) {
      message.error('加载评论失败，请稍后重试');
    }
  };

  // 当questionId变化时，重置到第一页
  useEffect(() => {
    setPageParams((prev) => ({ current: 1, pageSize: prev.pageSize }));
  }, [questionId]);

  // 加载数据
  useEffect(() => {
    loadData(pageParams).then();
  }, [pageParams, questionId]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await addCommentUsingPost({
        questionId,
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
        dataSource={data.records}
        split
        pagination={{
          position: 'bottom',
          align: 'end',
          current: pageParams.current,
          pageSize: pageParams.pageSize,
          total: data.total,
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
            <Row gutter={16} style={{ width: '100%' }}>
              <Col flex="none">
                {comment.userVO?.userPic ? (
                  <Avatar size={40} src={comment.userVO.userPic} />
                ) : (
                  <Avatar size={40} icon={<UserOutlined />} />
                )}
              </Col>
              <Col flex="auto">
                <Typography.Text strong>{comment.userVO?.username}</Typography.Text>
                <Typography.Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>
                  {formatTime(comment.createTime)}
                </Typography.Text>
                <Typography.Paragraph
                  style={{ marginTop: 8, marginBottom: 0 }}
                  copyable={{ text: comment.content }}
                >
                  {comment.content}
                </Typography.Paragraph>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CommentPage;
