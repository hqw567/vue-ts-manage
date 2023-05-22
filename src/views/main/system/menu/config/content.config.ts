const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnTitle: '新增菜单'
  },
  propsList: [
    {
      label: '菜单名称',
      prop: 'name',
      width: '180px'
    },
    {
      label: '级别',
      prop: 'type',
      width: '120px'
    },
    {
      label: '菜单url',
      prop: 'url',
      width: '150px'
    },
    {
      prop: 'icon',
      label: '菜单icon',
      width: '200px'
    },
    {
      prop: 'sort',
      label: '排序',
      width: '120px'
    },
    {
      prop: 'permission',
      label: '权限',
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
  ],
  childrenTree: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  }
}

export default contentConfig
