import React, { Suspense, lazy } from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// import HomePage from './components/HomePage'
import AuthStore from './Authentication/stores'
import FoodManagementDashBoardStore from './FoodManagement/stores'
import AdminStore from './Admin/stores'
import signInPageRoute from './Authentication/routes'
// import { ProtectedRouteForDashBoard } from './FoodManagement/routes/ProtectedRouteForDashBoard'
// import { FoodManagementDashBoardRoute } from './FoodManagement/routes/FoodManagementDashBoardRoute'
// import { PreferencePageRoute } from './FoodManagement/routes/PreferencePageRoute'
// import { ReviewPageRoute } from './FoodManagement/routes/ReviewPageRoute'
import { Toastify } from './Common/components/Toastify'
import { adminRoutes } from './Admin/routes'
import './App.css'
import Homepage from './components/HomePage'
import { foodManagementDashBoardRoutes } from './FoodManagement/routes'
// const signInPageRoute=lazy(()=>import('./routes/'))

const App = () => {
   return (
      <Provider
         {...AuthStore}
         {...FoodManagementDashBoardStore}
         {...AdminStore}
      >
         <Suspense fallback={<div />}>
            <Router basename={process.env.PUBLIC_URL}>
               <Switch>
                  {signInPageRoute}
                  {adminRoutes}
                  {foodManagementDashBoardRoutes}

                  <Route path='/'>
                     <Homepage />
                  </Route>
               </Switch>
            </Router>
            <Toastify />
         </Suspense>
      </Provider>
   )
}

export default App
