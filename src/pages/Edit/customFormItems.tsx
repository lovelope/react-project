export default [
  {
    label: 'Input',
    key: 'Input',
    required: true,
    component: 'Input',
  },
  {
    label: '密码输入框',
    key: 'password',
    component: 'Password',
    rules: [
      {
        required: true,
        pattern: /^[0-9a-zA-Z]{8,16}$/,
        message: '密码长度为8-16位，只能包含数字和英文',
      },
    ],
  },
  {
    label: 'TextArea',
    key: 'TextArea',
    component: 'TextArea',
  },
  {
    label: 'DatePicker',
    key: 'DatePicker',
    required: true,
    component: 'DatePicker',
  },
  {
    label: 'Switch',
    key: 'Switch',
    component: 'Switch',
  },
];
