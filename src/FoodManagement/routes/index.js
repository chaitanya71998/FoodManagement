import React, { Suspense, lazy } from 'react'
import { ProtectedRouteForDashBoard } from './ProtectedRouteForDashBoard'
// import { ProtectedRouteForPreferencePage } from './ProtectedRouteForPreferencePage'
// import { ProtectedRouteForReviewPage } from './ProtectedRouteForReviewPage'
// import FoodManagementDashBoardRoute from './FoodManagementDashBoardRoute'
// import PreferencePageRoute from './PreferencePageRoute'
// import ReviewPageRoute from './ReviewPageRoute'
const FoodManagementDashBoardRoute = lazy(() =>
   import('./FoodManagementDashBoardRoute')
)

const PreferencePageRoute = lazy(() => import('./PreferencePageRoute'))

const ReviewPageRoute = lazy(() => import('./ReviewPageRoute'))

const foodManagementDashBoardRoutes = [
   <React.Fragment>
      <ProtectedRouteForDashBoard
         key='food-management-dashboard'
         exact
         path='/food-management-dashboard'
         component={FoodManagementDashBoardRoute}
      />

      <ProtectedRouteForDashBoard
         key='set-meal-preference'
         exact
         path='/set-meal-preference'
         component={PreferencePageRoute}
      />

      <ProtectedRouteForDashBoard
         key='/food-management-dashboard/review/:mealType'
         exact
         path={`/food-management-dashboard/review/:mealType`}
         component={ReviewPageRoute}
      />
   </React.Fragment>
]
export { foodManagementDashBoardRoutes }
