import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { SignInRoute } from './SignInRoute'

const signInPageRoute = <Route path='/sign-in-page' component={SignInRoute} />

export default signInPageRoute
