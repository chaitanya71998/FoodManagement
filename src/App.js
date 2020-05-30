import React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import Page1 from './components/Page1'
import AuthStore from './Authentication/stores'
import FoodManagementDashBoardStore from './FoodManagement/stores'
import { SignInPageRoute } from './Authentication/routes'
import { ProtectedRouteForDashBoard } from './FoodManagement/routes/ProtectedRouteForDashBoard'
import { ProtectedRouteForPreferencePage } from './FoodManagement/routes/ProtectedRouteForPreferencePage'
import { FoodManagementDashBoardRoute } from './FoodManagement/routes/FoodManageMentDashBoardRoute'
import { PreferencePageRoute } from './FoodManagement/routes/PreferencePageRoute'
import './App.css'

const App = () => {
   return (
      <Provider {...AuthStore} {...FoodManagementDashBoardStore}>
         <Router basename={process.env.PUBLIC_URL}>
            <Switch>
               <Route exact path='/page-1'>
                  <Page1 />
               </Route>
               {SignInPageRoute}
               <ProtectedRouteForDashBoard
                  exact
                  path='/food-management-dashboard'
                  component={FoodManagementDashBoardRoute}
               />
               <ProtectedRouteForPreferencePage
                  exact
                  path={`/food-management-dashboard/:mealType`}
                  component={PreferencePageRoute}
               />
               <Route path='/'>
                  <HomePage />
               </Route>
            </Switch>
         </Router>
      </Provider>
   )
}

export default App
