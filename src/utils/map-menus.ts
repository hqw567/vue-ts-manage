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
