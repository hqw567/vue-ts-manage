const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新增角色'
  },
  propsList: [
    {
      type: 'selection',
      label: '选择',
      width: '80px'
    },
    {
      type: 'default',
      prop: 'id',
      label: 'id',
      width: '80px'
    },
    {
      type: 'default',
      prop: 'name',
      label: '角色名称',
      width: '150px'
    },
    {
      type: 'default',
      prop: 'intro',
      label: '权限介绍',
      width: '150px'
    },
    {
      type: 'timer',
      prop: 'created_at',
      label: '创建时间'
    },
    {
      type: 'timer',
      prop: 'updated_at',
      label: '更新时间'
    },
    {
      type: 'handler',
      label: '操作',
      width: '150px'
    }
  ]
}

export default contentConfig
