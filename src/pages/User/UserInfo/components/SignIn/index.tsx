import React from 'react';
import { Button, Card, Flex, message, Tooltip } from 'antd';
import { addDays, format, startOfWeek, subDays } from 'date-fns';
import { signInUsingPost } from '@/services/onlinejudge-user-service/signInController';

const WEEK_DAYS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
const SQUARE_SIZE = 12;
const SQUARE_MARGIN = 2;
const COLUMN_WIDTH = SQUARE_SIZE + SQUARE_MARGIN * 2;

interface Props {
  userId: number;
  signedInDays: string[];
  loadData: () => Promise<void>;
}

const ContributionCalendar: React.FC<Props> = ({ userId, signedInDays, loadData }) => {
  const today = new Date();
  const startDate = subDays(today, 364);
  const firstWeekStart = startOfWeek(startDate, { weekStartsOn: 0 });

  const weeks = [];
  const monthLabels = [];
  let current = firstWeekStart;
  let lastMonth = null;

  const todayKey = format(today, 'yyyy-MM-dd');

  const handleSignIn = async () => {
    if (signedInDays.includes(todayKey)) {
      message.info('今天已签到！').then();
      return;
    }
    const res = await signInUsingPost({
      userId: userId,
    });
    if (res.code === 0) {
      await loadData();
      await message.success('签到成功！');
    }
  };

  while (current <= today) {
    const week = [];

    for (let i = 0; i < 7; i++) {
      const day = addDays(current, i);
      if (day > today) break;

      const key = format(day, 'yyyy-MM-dd');
      const isSignedIn = signedInDays.includes(key);

      week.push(
        <Tooltip key={key} title={`${key}：${isSignedIn ? '已签到 ✅' : '未签到 ❌'}`}>
          <div
            style={{
              width: SQUARE_SIZE,
              height: SQUARE_SIZE,
              margin: SQUARE_MARGIN,
              backgroundColor: isSignedIn ? '#40c463' : '#ebedf0', // 绿色 / 灰色
              borderRadius: 2,
            }}
          />
        </Tooltip>,
      );
    }

    const monthName = format(current, 'MMM');
    const currentMonth = current.getMonth();
    if (currentMonth !== lastMonth) {
      monthLabels.push(
        <div
          key={monthName + current.toISOString()}
          style={{ width: COLUMN_WIDTH, fontSize: 12, color: '#444', marginLeft: 2 }}
        >
          {monthName}
        </div>,
      );
      lastMonth = currentMonth;
    } else {
      monthLabels.push(<div key={current.toISOString()} style={{ width: COLUMN_WIDTH }} />);
    }

    weeks.push(
      <div key={current.toISOString()} style={{ display: 'flex', flexDirection: 'column' }}>
        {week}
      </div>,
    );

    current = addDays(current, 7);
  }

  return (
    <Card variant="borderless">
      <Flex align={'center'}>
        <div>
          <div style={{ display: 'flex', marginLeft: 30, marginBottom: 4 }}>{monthLabels}</div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginRight: 4 }}>
              {WEEK_DAYS.map((day, index) => (
                <div
                  key={index}
                  style={{
                    height: SQUARE_SIZE + SQUARE_MARGIN * 2,
                    fontSize: 12,
                    color: '#666',
                  }}
                >
                  {day}
                </div>
              ))}
            </div>
            {weeks}
          </div>
        </div>
        <div style={{ marginBottom: 16, marginLeft: 128 }}>
          <Button type="primary" size={'large'} onClick={handleSignIn}>
            签到
          </Button>
        </div>
      </Flex>
    </Card>
  );
};

export default ContributionCalendar;
