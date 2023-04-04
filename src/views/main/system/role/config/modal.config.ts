const modalConfig = {
  pageName: 'role',
  header: {
    newTitle: '新增部门',
    editTitle: '编辑部门'
  },
  formItems: [
    {
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入部门名称',
      type: 'input'
    },
    {
      prop: 'intro',
      label: '权限介绍',
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
