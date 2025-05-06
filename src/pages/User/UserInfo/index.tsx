import {
  CarryOutOutlined,
  HighlightOutlined,
  HomeOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { GridContent } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import {
  Avatar,
  Card,
  Col,
  Descriptions,
  Divider,
  message,
  PaginationProps,
  Row,
  Space,
  Statistic,
} from 'antd';
import React, { useEffect, useState } from 'react';
import useStyles from './UserInfo.style';
import QuestionList from '@/pages/User/UserInfo/components/QuestionList';
import { getUserInfoUsingGet } from '@/services/onlinejudge-user-service/userController';
import { listMyFavourQuestionByPageUsingPost } from '@/services/onlinejudge-question-service/questionFavourController';
import { listMyQuestionVoByPageUsingPost } from '@/services/onlinejudge-question-service/questionController';
import { MyDivider } from '@/components';
import ContributionCalendar from '@/pages/User/UserInfo/components/SignIn';
import { getSignedDatesUsingGet } from '@/services/onlinejudge-user-service/signInController';

export type tabKeyType = 'history' | 'favourites';

const UserInfo: React.FC = () => {
  const { styles } = useStyles();
  const [tabKey, setTabKey] = useState<tabKeyType>('history');
  const [currentUser, setCurrentUser] = useState<API.UserVO>({});
  const [myFavourList, setMyFavourList] = useState<API.PageQuestionVO_>({});
  const [myHistoryList, setMyHistoryList] = useState<API.PageQuestionVO_>({});
  const [signedInDays, setSignedInDays] = useState<string[]>([]);

  const getCurrentUser = async () => {
    const res = await getUserInfoUsingGet();
    if (res.code === 0 && res.data) {
      setCurrentUser(res.data);
    } else {
      history.push('/user/login');
      message.error(res.msg);
    }
  };

  const [pageParams, setPageParams] = useState<PageParams>({
    current: 1,
    pageSize: 2,
  });

  const onChange: PaginationProps['onChange'] = (current, pageSize) => {
    setPageParams({
      current,
      pageSize,
    });
  };

  const getMyFavourList = async () => {
    const res = await listMyFavourQuestionByPageUsingPost({
      ...pageParams,
    });
    if (res.code === 0 && res.data) {
      setMyFavourList(res.data);
    } else {
      message.error(res.msg);
    }
  };

  const getMyHistoryList = async () => {
    const res = await listMyQuestionVoByPageUsingPost({ ...pageParams });
    if (res.code === 0 && res.data) {
      setMyHistoryList(res.data);
    } else {
      message.error(res.msg);
    }
  };

  const loadData = async () => {
    const res = await getSignedDatesUsingGet();
    if (res.code === 0) {
      if (res.data !== undefined) {
        const daysList = res.data.map((item) => item?.signDate ?? '');
        setSignedInDays(daysList);
      }
    }
  };

  useEffect(() => {
    getCurrentUser().then();
    getMyFavourList().then();
    getMyHistoryList().then();
    loadData().then();
  }, [pageParams]);

  //  渲染用户信息
  const renderUserInfo = ({ userAccount, telephone, address }: Partial<API.UserVO>) => {
    return (
      <div className={styles.detail}>
        <p>
          <UserOutlined
            style={{
              marginRight: 8,
            }}
          />
          账号：{userAccount}
        </p>
        <p>
          <PhoneOutlined
            style={{
              marginRight: 8,
            }}
          />
          联系方式：{telephone}
        </p>
        <p>
          <HomeOutlined
            style={{
              marginRight: 8,
            }}
          />
          {address}
        </p>
      </div>
    );
  };

  const operationTabList = [
    {
      key: 'history',
      tab: (
        <span>
          历史题目{' '}
          <span
            style={{
              fontSize: 14,
            }}
          ></span>
        </span>
      ),
    },
    {
      key: 'favourites',
      tab: (
        <span>
          我的收藏{' '}
          <span
            style={{
              fontSize: 14,
            }}
          ></span>
        </span>
      ),
    },
  ];

  // 渲染tab切换
  const renderChildrenByTabKey = (tabValue: tabKeyType) => {
    if (tabValue === 'history') {
      return (
        <QuestionList
          questionList={myHistoryList.records ?? []}
          pageParams={pageParams}
          onChange={onChange}
          total={myHistoryList.total ?? 0}
        />
      );
    }
    if (tabValue === 'favourites') {
      return (
        <QuestionList
          questionList={myFavourList.records ?? []}
          pageParams={pageParams}
          onChange={onChange}
          total={myFavourList.total ?? 0}
        />
      );
    }
    return null;
  };

  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card
            variant={'outlined'}
            style={{
              marginBottom: 24,
            }}
          >
            {currentUser && (
              <div>
                <div className={styles.avatarHolder}>
                  <Space>
                    {currentUser.userPic ? (
                      <Avatar
                        style={{ width: '104px', height: '104px', marginBottom: '20px' }}
                        size={'large'}
                        src={currentUser.userPic}
                      />
                    ) : (
                      <Avatar
                        style={{ width: '104px', height: '104px', marginBottom: '20px' }}
                        size={'large'}
                        icon={<UserOutlined />}
                      />
                    )}
                  </Space>
                  <div className={styles.name}>{currentUser?.username}</div>
                  <div>{currentUser?.signature}</div>
                </div>
                {renderUserInfo(currentUser)}
                <Divider dashed />
                <Descriptions title={'个人简介'} column={1}>
                  <Descriptions.Item> {currentUser?.description}</Descriptions.Item>
                </Descriptions>
                <Divider dashed />
                <Row gutter={16}>
                  <Col span={12}>
                    <Statistic
                      title="做题数"
                      value={myHistoryList.total}
                      prefix={<HighlightOutlined />}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="登陆天数"
                      value={signedInDays.length}
                      prefix={<CarryOutOutlined />}
                    />
                  </Col>
                </Row>
              </div>
            )}
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <ContributionCalendar
            userId={currentUser.id as number}
            signedInDays={signedInDays}
            loadData={loadData}
          />
          <MyDivider height={16} />
          <Card
            className={styles.tabsCard}
            variant={'borderless'}
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={(_tabKey: string) => {
              setTabKey(_tabKey as tabKeyType);
            }}
          >
            {renderChildrenByTabKey(tabKey)}
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default UserInfo;
