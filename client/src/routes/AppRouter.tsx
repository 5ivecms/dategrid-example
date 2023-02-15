import type { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { routesConfig } from '../core/config'
import { HomePage, NotFoundPage } from '../pages/main'

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route element={<HomePage />} path={routesConfig.baseBrowseRoutes.home()} />
      <Route element={<NotFoundPage />} path={routesConfig.baseBrowseRoutes.notFound()} />
    </Routes>
  )
}

export default AppRouter
