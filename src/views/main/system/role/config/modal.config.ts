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
      label: '权限选择',
      placeholder: '请选择权限',
      slotName: 'tree',
      type: 'custom'
    }
  ]
}

export default modalConfig
