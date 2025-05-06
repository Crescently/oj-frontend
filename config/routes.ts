export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
    ],
  },
  { path: '/home', name: '主页', icon: 'home', component: './Question/ViewQuestion' },
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
        component: './Admin/Question/QuestionManage',
      },
    ],
  },
  {
    path: '/history/question',
    name: '提交记录',
    icon: 'history',
    component: './Question/QuestionHistory',
  },
  {
    path: '/rank',
    name: '排行榜',
    icon: 'trophy',
    component: './Question/QuestionRank',
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
    access: 'canUser',
    hideInMenu: true,
    component: './Question/UpdateQuestion',
  },
  {
    path: '/submit/question/:id',
    hideInMenu: true,
    component: './Question/SubmitQuestion',
  },
  {
    path: '/account',
    name: '个人页',
    icon: 'user',
    routes: [
      { path: '/account', redirect: '/account/center' },
      {
        name: '个人中心',
        path: '/account/center',
        component: './User/UserInfo',
      },
      {
        name: '个人设置',
        path: '/account/setting',
        component: './User/UserSetting',
      },
    ],
  },

  { path: '/', redirect: '/home' },
  { path: '*', layout: false, component: './404' },
];
