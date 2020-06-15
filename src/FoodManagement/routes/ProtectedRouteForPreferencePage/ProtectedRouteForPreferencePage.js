import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { getAccessToken } from '../../../Authentication/utils/StorageUtils'
import { Redirect } from 'react-router-dom'
import SignInPageRoute from '../../../Authentication/routes'
export const ProtectedRouteForPreferencePage = ({
   component: Component,
   ...other
}) => {
   if (getAccessToken()) {
      alert("proute")
      console.log("other", other)
      return <Route component={Component} {...other} />
   }
   else {
      return <Redirect to={{ pathname: '/sign-in-page' }} />
   }
}
