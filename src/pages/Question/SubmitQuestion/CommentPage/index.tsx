import React, { useEffect, useState } from 'react';
import { addComment, listCommentById } from '@/services/onlinejudge-backend/commentController';
import { Avatar, Button, Col, Divider, Flex, Input, List, message, Row, Typography } from 'antd';
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';

interface Props {
  questionId: number;
}

const CommentPage: React.FC<Props> = ({ questionId }) => {
  const [comments, setComments] = useState<API.CommentVO[]>([]);

  const getComment = async () => {
    const res = await listCommentById({ questionId: questionId });
    if (res.code === 0) {
      setComments(res?.data ?? []);
    }
  };
  useEffect(() => {
    getComment().then();
  }, []);

  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e: any) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    const res = await addComment({
      questionId: questionId,
      content: newComment.trim(),
    });
    if (res.code === 0) {
      message.success('评论成功');
      getComment().then();
      setNewComment('');
    }
  };
  const formatTime = (time: any) => {
    return moment(time).fromNow(); // 转化为“XX时间前”
  };
  return (
    <>
      <div>
        <Flex style={{ marginTop: 20, marginRight: 20 }} justify={'flex-end'} vertical={true}>
          <Input.TextArea
            value={newComment}
            onChange={handleCommentChange}
            rows={4}
            placeholder="发表你的评论"
          />
          <Button
            type="primary"
            style={{ marginTop: 10, marginLeft: 'auto' }}
            onClick={handleCommentSubmit}
            disabled={!newComment.trim()}
          >
            评论
          </Button>
        </Flex>
        <Divider dashed />
        <List
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(comment) => (
            <div>
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
                          <Typography.Text>{comment.userVO?.username}</Typography.Text>
                          <Typography.Text
                            type="secondary"
                            style={{ marginLeft: '10px', fontSize: '12px' }}
                          >
                            {formatTime(comment.createTime)}
                          </Typography.Text>
                        </Col>
                        <Col span={24} style={{ marginTop: '10px' }}>
                          <Typography.Paragraph
                            copyable={{ icon: <span style={{ marginLeft: 16 }}>复制评论</span> }}
                            style={{ fontSize: '14px' }}
                          >
                            {comment.content}
                          </Typography.Paragraph>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </List.Item>
              <Divider style={{ color: 'blue' }} />
            </div>
          )}
        />
      </div>
    </>
  );
};

export default CommentPage;
