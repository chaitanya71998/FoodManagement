import React from 'react'
import { ProtectedRouteForAdminPage } from './ProtectedRouteForAdminPage'
import { AdminHomePageRoute } from './AdminHomePageRoute'
const adminRoutes = [
    <ProtectedRouteForAdminPage
                  exact
                  path={`/admin-Page`}
                  component={AdminHomePageRoute}
               />
]
export { adminRoutes }
