import { ProLayoutProps } from '@ant-design/pro-components';

const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  colorPrimary: '#1890ff',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '在线判题平台',
  bgLayoutImgList: [
    {
      src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr',
      width: '100%',
      height: '100%',
    },
  ],
  pwa: true,
  iconfontUrl: '',
  token: {
    // bgLayout: 'white',
  },
};

export default Settings;
