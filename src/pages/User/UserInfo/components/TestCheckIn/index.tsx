import { Button, Calendar, ConfigProvider, message } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';

import './index.css'; // 自定义样式

const CheckInCalendar = () => {
  const [checkInDays, setCheckInDays] = useState<string[]>([
    '2025-04-01',
    '2025-04-02',
    '2025-04-05',
  ]);

  const today = dayjs().format('YYYY-MM-DD');

  const handleCheckIn = () => {
    if (checkInDays.includes(today)) {
      message.warning('今天已经打过卡啦！');
      return;
    }
    setCheckInDays([...checkInDays, today]);
    message.success('打卡成功！');
  };

  const dateFullCellRender = (value: dayjs.Dayjs) => {
    const dateStr = value.format('YYYY-MM-DD');
    const isCheckedIn = checkInDays.includes(dateStr);
    return <div className={isCheckedIn ? 'checked-cell' : 'normal-cell'}>{value.date()}</div>;
  };

  return (
    <>
      <Button type="primary" onClick={handleCheckIn} style={{ marginBottom: 16 }}>
        今日打卡
      </Button>
      <ConfigProvider>
        <Calendar
          fullCellRender={dateFullCellRender}
          fullscreen={false}
          className="custom-calendar"
        />
      </ConfigProvider>
    </>
  );
};

export default CheckInCalendar;
