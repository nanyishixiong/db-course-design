import { lazy } from 'react'
export const routerConfig = [
  {
    path: '/',
    component: lazy(() => import('@/pages'))
  }, {
    path: '/NoPermission',
    component: lazy(() => import('@/pages/NoPermission'))
  }, {
    path: '/Login',
    component: lazy(() => import('@/pages/Login')),
  }, {
    path: '/Main',
    component: lazy(() => import('@/pages/Main')),
    childrens: [
      {
        path: '/Main/Student',
        component: lazy(() => import('@/pages/Student')),
      },
      {
        path: '/Main/Teacher',
        component: lazy(() => import('@/pages/Teacher')),
      },
      {
        path: '/Main/Department',
        component: lazy(() => import('@/pages/Department')),
      },
      {
        path: '/Main/Course',
        component: lazy(() => import('@/pages/Course')),
      },
      {
        path: '/Main/Enrollment',
        component: lazy(() => import('@/pages/Enrollment')),
      },
      {
        path: '/Main/Grade',
        component: lazy(() => import('@/pages/Grade')),
      }
    ]
  }
]