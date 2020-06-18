import React from 'react'
import { ProtectedRouteForDashBoard } from './ProtectedRouteForDashBoard'
import { ProtectedRouteForPreferencePage } from './ProtectedRouteForPreferencePage'
import { ProtectedRouteForReviewPage } from './ProtectedRouteForReviewPage'
import { FoodManagementDashBoardRoute } from './FoodManageMentDashBoardRoute'
import { PreferencePageRoute } from './PreferencePageRoute'
import { ReviewPageRoute } from './ReviewPageRoute'
const foodManagementDashBoardRoutes = [
   <React.Fragment>
      <ProtectedRouteForDashBoard
         exact
         path='/food-management-dashboard'
         component={FoodManagementDashBoardRoute}
      />
      <ProtectedRouteForPreferencePage
         exact
         path={`/set-meal-preference?date=:selectedDate&meal_type=:mealType`}
         component={PreferencePageRoute}
      />
      <ProtectedRouteForReviewPage
         exact
         path={`/food-management-dashboard/review/:mealType`}
         component={ReviewPageRoute}
      />
   </React.Fragment>
]
export { foodManagementDashBoardRoutes }
/*
exact
                  path={`/food-management-dashboard/:mealType`}*/
