const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新增部门'
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
      label: '部门名称',
      width: '150px'
    },
    {
      type: 'default',
      prop: 'leader',
      label: '部门领导',
      width: '150px'
    },
    {
      type: 'custom',
      slotName: 'parentId',
      prop: 'parentId',
      label: '上级部门',
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
