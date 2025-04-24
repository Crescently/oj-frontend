import { List, Tag } from 'antd';
import useStyles from './index.style';
import { LikeOutlined, StarTwoTone } from '@ant-design/icons';
import React from 'react';
import dayjs from 'dayjs';

interface Props {
  questionList: API.QuestionVO[];
}

const QuestionList: React.FC<Props> = ({ questionList }) => {
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
      <List<API.QuestionVO>
        size="large"
        className={styles.questionList}
        rowKey="id"
        itemLayout="vertical"
        dataSource={questionList || []}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <IconText key="star" icon={<StarTwoTone />} text={item.favourNum} />,
              <IconText key="like" icon={<LikeOutlined />} text={item.thumbNum} />,
            ]}
          >
            <List.Item.Meta
              title={<a className={styles.listItemMetaTitle}>{item.title}</a>}
              description={
                <span>
                  {item.tags ? (
                    item.tags.map((tag, index) => (
                      <Tag key={index} color={'green'}>
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
                <em>{dayjs(item.updateTime).format('YYYY-MM-DD HH:mm')}</em>
              </div>
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

export default QuestionList;
