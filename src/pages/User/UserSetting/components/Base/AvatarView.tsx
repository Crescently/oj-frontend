import useStyles from './index.style';
import { Button, GetProp, message, Upload, UploadProps } from 'antd';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { updateAvatar } from '@/services/onlinejudge-backend/userController';
import { useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('你只能上传JPG/PNG类型的图片!').then();
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不能超过2MB').then();
  }
  return isJpgOrPng && isLt2M;
};

// 头像组件
const AvatarView = ({ avatar }: { avatar: string }) => {
  const { styles } = useStyles();
  const [loading, setLoading] = useState(false);
  const handleChange: UploadProps['onChange'] = async (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      const res = await updateAvatar({ avatarUrl: info.file.response.data });
      if (res.code === 0) {
        message.success('头像更新成功');
      } else {
        message.error('头像更新失败');
      }
    }
  };
  return (
    <>
      <div className={styles.avatar_title}>头像</div>
      <div className={styles.avatar}>
        {loading ? <LoadingOutlined /> : <img src={avatar} alt="avatar" />}
      </div>
      <Upload
        showUploadList={false}
        action="http://localhost:8081/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            更换头像
          </Button>
        </div>
      </Upload>
    </>
  );
};

export default AvatarView;
