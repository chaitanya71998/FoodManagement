import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { isLoginned } from '../../../Common/utils/LoginUtils'
import { Redirect } from 'react-router-dom'

export const ProtectedRouteForDashBoard = ({
   component: Component,
   ...other
}) => {
   if (isLoginned()) {
      return <Route  component={Component} {...other} />
   }
   else {
      return <Redirect to={{ pathname: '/sign-in-page' }} />
   }
}
