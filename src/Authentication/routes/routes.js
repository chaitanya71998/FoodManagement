import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { SignInRoute } from './SignInRoute'
import { SignInPage } from '../components/SignInPage'

const SignInPageRoute = [<Route path='/sign-in-page' component={SignInRoute} />]

export default SignInPageRoute
