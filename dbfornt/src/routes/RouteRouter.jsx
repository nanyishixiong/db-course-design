import { lazy, useContext, useLayoutEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import { Permission } from '@/App'

import { routerConfig } from './routerConfig'

const NoFound = lazy(() => import('@/component/NoFound'))

/**
 * 鉴权函数，判断此组件是否在权限范围内 (不同的鉴权方式可在此函数中修改)
 * @param {Array} permissionList
 * @param {string} componentName
 */
function authentication(permissionList, componentName) {
  return 1
  // return permissionList.indexOf(componentName) >= 0
}

/**
 * 路由拦截
 * @param {*} Component
 * @param {*} config
 * @returns
 */
function RouteInterception(Component, config) {
  const { before, after } = config || {}
  return function ProRouteComponent(props) {
    // const ref = useRef()
    // 进入路由前触发
    before && before()
    // 路由挂载之后触发
    useLayoutEffect(() => {
      after && after()
    }, [])

    return <Component {...(props || {})} />
  }
}

export default function RouteRouter(props) {
  // 获取权限数组
  const permissionList = useContext(Permission)

  function getRoutes(routerConfig) {
    return routerConfig.filter(({ path }) => {
      // 权限筛选
      return authentication(permissionList, path)
    }).map(({ path, component: Component, childrens }) => {

      // 路由拦截
      Component = RouteInterception(Component, props.config)

      if (childrens !== undefined) {
        return <Route
          key={path}
          path={path}
          element={<Component />}>
          {getRoutes(childrens)}
        </Route>
      }
      return <Route
        key={path}
        path={path}
        element={<Component />}
      />
    })
  }

  return (
    <Routes>
      {getRoutes(routerConfig)}
      <Route path='*' element={<NoFound />} />
    </Routes>
  )
}