export interface IAccount {
  name: string
  password: string
}

export interface ILoginState {
  token: string
  userInfo: UserInfo
  userMenus: IUserMenus[]
  userPermissions: string[]
}

export interface UserInfo {
  id?: number
  name?: string
  realname?: string
  cellphone?: number
  enable?: number
  createAt?: string
  updateAt?: string
  role?: Role
  department?: Department
}

export interface Role {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
}

export interface Department {
  id: number
  name: string
  parentId: any
  createAt: string
  updateAt: string
  leader: string
}

export interface IUserMenus {
  id: number
  name: string
  type: number
  url: string
  icon: string
  sort: number
  children: IUserMenusChildren[]
}

export interface IUserMenusChildren {
  id: number
  url: string
  name: string
  sort: number
  type: number
  children?: IUserMenusChildren2[]
  parentId: number
}

export interface IUserMenusChildren2 {
  id: number
  url: any
  name: string
  sort: any
  type: number
  parentId: number
  permission: string
}
