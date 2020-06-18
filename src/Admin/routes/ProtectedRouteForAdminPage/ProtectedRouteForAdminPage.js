import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { getAccessToken } from '../../../Common/utils/StorageUtils'
import { Redirect } from 'react-router-dom'

export const ProtectedRouteForAdminPage = ({
   component: Component,
   ...other
}) => {
   if (getAccessToken()) {
      return <Route component={Component} {...other} />
   } else {
      return <Redirect to={{ pathname: '/sign-in-page' }} />
   }
}
