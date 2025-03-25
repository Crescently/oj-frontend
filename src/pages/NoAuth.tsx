import { history } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const NoAuthPage: React.FC = () => (
  <Result
    status="warning"
    title="No Auth"
    subTitle={'抱歉，您没有权限访问。'}
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        {'返回首页'}
      </Button>
    }
  />
);
export default NoAuthPage;
