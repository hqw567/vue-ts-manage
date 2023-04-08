const modalConfig = {
  pageName: 'department',
  header: {
    newTitle: '新增菜单',
    editTitle: '编辑菜单'
  },
  formItems: [
    {
      prop: 'name',
      label: '菜单名称',
      placeholder: '请输入菜单名称',
      type: 'input'
    },
    {
      prop: 'permission',
      label: '菜单权限介绍',
      placeholder: '请输入菜单权限介绍',
      type: 'input'
    },
    {
      prop: 'menulist',
      label: '权限选择',
      placeholder: '请选择权限',
      slotName: 'tree',
      type: 'custom'
    }
  ]
}

export default modalConfig
