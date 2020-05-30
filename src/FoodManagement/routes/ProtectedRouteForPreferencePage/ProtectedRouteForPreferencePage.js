import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { getAccessToken } from '../../../Authentication/utils/StorageUtils'
import { Redirect } from 'react-router-dom'
import SignInPageRoute from '../../../Authentication/routes'

export const ProtectedRouteForPreferencePage = ({
   component: Component,
   ...other
}) => {
   if (getAccessToken() === 'f5af9f51-07e6-4332-8f1a-c0c11c1e3434') {
      return <Route component={Component} {...other} />
   } else {
      return <Redirect to={{ pathname: '/sign-in-page' }} />
   }
}
