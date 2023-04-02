import hyRequest from '@/service'

export function newUserData(userInfo: any) {
  return hyRequest.post({
    url: '/users',
    data: userInfo
  })
}

export function editUserData(id: number, userInfo: any) {
  return hyRequest.patch({
    url: '/users/' + id,
    data: userInfo
  })
}

export function postUserListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: {
      offset: 0,
      size: 10,
      ...queryInfo
    }
  })
}

export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: '/users/' + id
  })
}

export function newPageData(pageName: string, userInfo: any) {
  return hyRequest.post({
    url: '/' + pageName,
    data: userInfo
  })
}

export function editPageData(pageName: string, id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/${pageName}/` + id,
    data: userInfo
  })
}

export function postPageListData(pageName: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: {
      offset: 0,
      size: 10,
      ...queryInfo
    }
  })
}

export function deletePageById(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/` + id
  })
}
