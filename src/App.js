import React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import AuthStore from './Authentication/stores'
import FoodManagementDashBoardStore from './FoodManagement/stores'
import AdminStore from './Admin/stores'
import { SignInPageRoute } from './Authentication/routes'
import { ProtectedRouteForDashBoard } from './FoodManagement/routes/ProtectedRouteForDashBoard'
import { ProtectedRouteForPreferencePage } from './FoodManagement/routes/ProtectedRouteForPreferencePage'
import { FoodManagementDashBoardRoute } from './FoodManagement/routes/FoodManageMentDashBoardRoute'
import { PreferencePageRoute } from './FoodManagement/routes/PreferencePageRoute'
import { ReviewPageRoute } from './FoodManagement/routes/ReviewPageRoute'
import { ProtectedRouteForAdminPage } from './Admin/routes/ProtectedRouteForAdminPage'
import { AdminHomePageRoute } from './Admin/routes/AdminHomePageRoute'
import { Toastify } from './Common/components/Toastify'

import './App.css'

const App = () => {
   return (
      <Provider
         {...AuthStore}
         {...FoodManagementDashBoardStore}
         {...AdminStore}
      >
         <Router basename={process.env.PUBLIC_URL}>
            <Switch>
               {SignInPageRoute}
               <ProtectedRouteForDashBoard
                  exact
                  path='/food-management-dashboard'
                  component={FoodManagementDashBoardRoute}
               />
               <ProtectedRouteForPreferencePage
                  exact
                  path={`/food-management-dashboard/:mealType`}
                  //path={`/set-meal-preference?date=data&meal_type=breakfast`}
                  component={PreferencePageRoute}
               />
               <ProtectedRouteForPreferencePage
                  exact
                  path={`/food-management-dashboard/review/:mealType`}
                  component={ReviewPageRoute}
               />
               <ProtectedRouteForAdminPage
                  exact
                  path={`/admin-Page`}
                  component={AdminHomePageRoute}
               />
               <Route path='/'>
                  <HomePage />
               </Route>
            </Switch>
         </Router>
         <Toastify />
      </Provider>
   )
}

export default App
/*
<ProtectedRouteForAdminPage
                  exact
                  path={`/admin-Page`}
                  component={AdminHomePageRoute}
               />*/
/*
<Route path='/admin-page'>
   <AdminHomePageRoute />
</Route>*/
/*
<Route path='/admin-page'>
                  <AdminHomePageRoute />
               </Route>*/
