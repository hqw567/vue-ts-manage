const searchConfig = {
  pageName: 'department',
  formItems: [
    {
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入部门名称',
      type: 'input'
    },
    {
      prop: 'leader',
      label: '部门领导',
      placeholder: '请输入部门领导',
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
