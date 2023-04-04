const modalConfig = {
  pageName: 'role',
  header: {
    newTitle: '新增角色',
    editTitle: '编辑角色'
  },
  formItems: [
    {
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入角色名称',
      type: 'input'
    },
    {
      prop: 'intro',
      label: '权限介绍',
      placeholder: '请输入角色领导',
      type: 'input'
    },
    {
      prop: 'parentId',
      label: '上级角色',
      placeholder: '请选择上级角色',
      type: 'select',
      options: []
    }
  ]
}

export default modalConfig
