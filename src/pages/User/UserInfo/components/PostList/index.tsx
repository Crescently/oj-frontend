import React from 'react';
import { List, Tag } from 'antd';
import useStyles from './index.style';
import { history } from '@@/core/history';
import { EyeOutlined, LikeOutlined, MessageOutlined, StarTwoTone } from '@ant-design/icons';
import dayjs from 'dayjs';

interface Props {
  postList: API.PostVO[];
  pageParams: PageParams;
  onChange: (current: number, pageSize: number) => void;
  total: number;
}

const PostList: React.FC<Props> = ({ postList, pageParams, onChange, total }) => {
  const { styles } = useStyles();
  const IconText: React.FC<{
    icon: React.ReactNode;
    text: React.ReactNode;
  }> = ({ icon, text }) => (
    <span>
      {icon} {text}
    </span>
  );

  return (
    <>
      <List<API.PostVO>
        size="large"
        className={styles.postList}
        rowKey="id"
        itemLayout="vertical"
        split={true}
        pagination={{
          position: 'bottom',
          align: 'end',
          current: pageParams.current,
          pageSize: pageParams.pageSize,
          total: total,
          onChange: onChange,
        }}
        dataSource={postList || []}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            onClick={() => {
              history.push(`/post/detail/${item.id}`);
            }}
            actions={[
              <IconText key="star" icon={<StarTwoTone />} text={item.favourNum} />,
              <IconText key="like" icon={<LikeOutlined />} text={item.thumbNum} />,
              <IconText
                icon={<MessageOutlined />}
                text={item.commentCount ?? 0}
                key="list-vertical-message"
              />,
              <IconText
                icon={<EyeOutlined />}
                text={item.viewCount ?? 0}
                key="list-vertical-view-o"
              />,
            ]}
          >
            <List.Item.Meta
              title={<a className={styles.listItemMetaTitle}>{item.title}</a>}
              description={
                <span>
                  {item.tags ? (
                    item.tags.map((tag, index) => (
                      <Tag key={index} color={'blue'}>
                        {tag}
                      </Tag>
                    ))
                  ) : (
                    <Tag>暂无标签</Tag>
                  )}
                </span>
              }
            />
            <div>
              <div className={styles.extra}>
                <span>{item.userVO?.username}</span> 创建
                <em>{dayjs(item.createTime).format('YYYY-MM-DD HH:mm')}</em>
              </div>
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

export default PostList;
