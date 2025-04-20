import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'grey',
        fontSize: 16,
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
      copyright={false}
      links={[
        {
          key: 'ant design pro init ',
          title: '官方文档',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Crescently',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: '组件库文档',
          href: 'https://ant-design.antgroup.com/index-cn',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
