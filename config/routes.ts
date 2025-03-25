export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
    ],
  },
  { path: '/welcome', name: '欢迎页', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/list' },
      { name: '用户管理', icon: 'table', path: '/admin/list', component: './Admin/User' },
    ],
  },
  {
    path: '/account',
    routes: [
      {
        name: '个人中心',
        path: '/account/center',
        component: './User/UserInfo',
      },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
