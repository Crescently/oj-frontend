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
  { path: '/test', name: '测试页', icon: 'setting', component: './Test' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user' },
      { name: '用户管理', icon: 'table', path: '/admin/user', component: './Admin/User' },
      {
        name: '题目管理',
        icon: 'table',
        path: '/admin/question',
        component: './Question/QuestionManage',
      },
    ],
  },
  {
    path: '/add/question',
    name: '创建题目',
    icon: 'fileAdd',
    access: 'canAdmin',
    component: './Question/AddQuestion',
  },
  {
    path: '/update/question/:id',
    name: '修改题目',
    icon: 'form',
    access: 'canUser',
    hideInMenu: true,
    component: './Question/UpdateQuestion',
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
