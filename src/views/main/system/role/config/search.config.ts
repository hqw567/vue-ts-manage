const searchConfig = {
  pageName: 'department',
  formItems: [
    {
      prop: 'name',
      label: '角色介绍',
      placeholder: '请输入角色介绍',
      type: 'input'
    },
    {
      prop: 'leader',
      label: '权限介绍',
      placeholder: '请输入角色介绍',
      type: 'input'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      type: 'date-picker'
    }
  ]
}

export default searchConfig
