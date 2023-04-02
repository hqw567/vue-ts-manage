const modalConfig = {
  pageName: 'department',
  header: {
    newTitle: '新增部门',
    editTitle: '编辑部门'
  },
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
      prop: 'parentId',
      label: '上级部门',
      placeholder: '请选择上级部门',
      type: 'select',
      options: []
    }
  ]
}

export default modalConfig
