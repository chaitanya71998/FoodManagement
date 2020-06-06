import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { SignInRoute } from './SignInRoute'

const SignInPageRoute = [<Route path='/sign-in-page' component={SignInRoute} />]

export default SignInPageRoute
