import type { RouteRecordRaw } from 'vue-router'

export function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}
export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  const localRoutes = loadLocalRoutes()
  // console.log(localRoutes)

  const routes: RouteRecordRaw[] = []

  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      const route = localRoutes.find((item) => subMenu.url.includes(item.path))
      if (route) {
        if (!routes.find((item) => item.path.includes(menu.url))) {
          routes.push({
            path: menu.url,
            redirect: route.path
          })
        }
        routes.push(route)
      }
      if (!firstMenu && route) firstMenu = subMenu
    }
  }
  // console.log(routes)

  return routes
}

export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadCrumbs: any[] = []
  for (const menu of userMenus) {
    // console.log(menu)
    // console.log(path, 'p')

    if (path.includes(menu.url)) {
      breadCrumbs.push(menu)
      // console.log(menu)

      for (const menuSub of menu.children) {
        if (path.includes(menuSub.url)) {
          breadCrumbs.push(menuSub)
        }
      }
    }
  }
  return breadCrumbs
}

/**
 * @description: 映射所有id
 * @param {any} menuList
 * @return {*}
 * @author: Herway
 */
export function mapMenuListToIds(menuList: any[]) {
  const menuListAllId: number[] = []
  function traverseMenuList(menus: any[]) {
    //
    menus.forEach((menu: any) => {
      if (menu.children) {
        traverseMenuList(menu.children)
      } else {
        menuListAllId.push(menu.id)
      }
    })
  }
  traverseMenuList(menuList)

  return menuListAllId
}

/**
 * @description: 映射所有用户按钮权限
 * @param {any} userMenus
 * @return {*}
 * @author: Herway
 */
export function mapUserMenuToPermissions(userMenus: any[]) {
  const permissions: string[] = []
  function traverseUserMenu(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        traverseUserMenu(item.children ?? [])
      }
    }
  }
  traverseUserMenu(userMenus)
  return permissions
}
