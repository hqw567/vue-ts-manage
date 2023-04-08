const searchConfig = {
  pageName: 'department',
  formItems: [
    {
      prop: 'name',
      label: '菜单名称',
      placeholder: '请输入菜单名称',
      type: 'input'
    },
    {
      prop: 'permission',
      label: '菜单权限',
      placeholder: '请输入菜单权限',
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
