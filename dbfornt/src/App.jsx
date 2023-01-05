import React, { useState, useLayoutEffect, lazy, Suspense, useMemo } from 'react'
import Loading from '@/component/Loading';


export const Permission = React.createContext()
function App() {
  const [rootPermission, setRootPermission] = useState([])
  const [RouteRouter] = useState(() => {
    return lazy(() => import('@/routes/RouteRouter'))
  })

  useLayoutEffect(() => {
    setRootPermission([
      '/',
      '/NoPermission',
      '/WriteDoc',
      '/Home',
      '/Login',
      '/Test'
    ])
  }, [])

  const config = useMemo(() => ({
    before: function () {
      // console.log('before');
    },
    after: function () {
      // console.log('after');
    },
  }), [])


  return <Permission.Provider value={rootPermission}>
    <Suspense fallback={<Loading />}>
      <RouteRouter config={config} />
    </Suspense>
  </Permission.Provider>
}

export default App