import hyRequest from '..'
export function getEntireRoles() {
  return hyRequest.post({
    url: '/role/list'
  })
}

export function getEntireDepartments() {
  return hyRequest.post({
    url: '/department/list',
    data: {
      offset: 0,
      size: 999
    }
  })
}
