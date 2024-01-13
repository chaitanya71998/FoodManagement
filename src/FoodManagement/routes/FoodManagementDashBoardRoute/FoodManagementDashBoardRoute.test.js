/*global jest*/
/*global expect*/
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

import { AuthServices } from '../../../Authentication/services/AuthServices'
import { AuthStore } from '../../../Authentication/stores/AuthStore'

import { MealInfoAPIService } from '../../services/MealInfoAPIService'
import { MealInfoStore } from '../../stores/MealInfoStore/'
import mealInfo from '../../fixtures/mealInfo.json'
import {
   FOOD_MANAGEMET_DASHBOARD,
   PREFERENCE_PAGE
} from '../../constants/APIConstants'
import { FoodManagementDashBoardRoute } from '.'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

describe('FoodDashBoardRoutes test', () => {
   let authServices
   let authStore
   let mealInfoAPIService
   let mealInfoStore

   beforeEach(() => {
      authServices = new AuthServices()
      authStore = new AuthStore(authServices)
      mealInfoAPIService = new MealInfoAPIService()
      mealInfoStore = new MealInfoStore(mealInfoAPIService)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should render loading state', () => {
      const history = createMemoryHistory()
      history.push(FOOD_MANAGEMET_DASHBOARD)
      const mockLoadingPromise = new Promise(() => {})
      const mockMealInfoAPI = jest.fn()
      mockMealInfoAPI.mockReturnValue(mockLoadingPromise)
      mealInfoAPIService.getMealInfoAPI = mockMealInfoAPI
      const { getByLabelText } = render(
         <Router history={history}>
            <Route path={FOOD_MANAGEMET_DASHBOARD}>
               <FoodManagementDashBoardRoute
                  mealInfoStore={mealInfoStore}
                  authStore={authStore}
                  mealInfoAPIService={mealInfoAPIService}
               />
            </Route>
         </Router>
      )
      getByLabelText('audio-loading')
   })
   it('should render success  state', async () => {
      const history = createMemoryHistory()
      history.push(FOOD_MANAGEMET_DASHBOARD)
      const mockSuccessPromise = Promise.resolve(mealInfo)
      const mockMealInfoAPI = jest.fn()
      mockMealInfoAPI.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.getMealInfoAPI = mockMealInfoAPI
      const { getByText } = render(
         <Router history={history}>
            <Route path={FOOD_MANAGEMET_DASHBOARD}>
               <FoodManagementDashBoardRoute
                  mealInfoStore={mealInfoStore}
                  authStore={authStore}
                  mealInfoAPIService={mealInfoAPIService}
               />
            </Route>
         </Router>
      )
      await waitFor(() => {
         getByText('Breakfast')
      })
   })

   it('should render success  state with no data', async () => {
      const history = createMemoryHistory()
      history.push(FOOD_MANAGEMET_DASHBOARD)
      const mockSuccessPromise = Promise.resolve([])
      const mockMealInfoAPI = jest.fn()
      mockMealInfoAPI.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.getMealInfoAPI = mockMealInfoAPI
      const { getByText } = render(
         <Router history={history}>
            <Route path={FOOD_MANAGEMET_DASHBOARD}>
               <FoodManagementDashBoardRoute
                  mealInfoStore={mealInfoStore}
                  authStore={authStore}
                  mealInfoAPIService={mealInfoAPIService}
               />
            </Route>
         </Router>
      )
      await waitFor(() => {
         getByText('No data found!')
      })
   })

   // it("should test is edit button", async() => {
   //     const history = createMemoryHistory()
   //     history.push(FOOD_MANAGEMET_DASHBOARD)
   //     const mockSuccessPromise = Promise.resolve(mealInfo);
   //     const mockMealInfoAPI = jest.fn();
   //     mockMealInfoAPI.mockReturnValue(mockSuccessPromise);
   //     mealInfoAPIService.getMealInfoAPI = mockMealInfoAPI;
   //     const { getByLabelText, getByText, getByRole, queryByRole, getByTestId, getAllByRole } = render(
   //         <Router history={history}>
   //         <Route path={FOOD_MANAGEMET_DASHBOARD}>
   //     <FoodManagementDashBoardRoute mealInfoStore={mealInfoStore} authStore={authStore} mealInfoAPIService={mealInfoAPIService} />
   //     </Route>
   //     <Route path={PREFERENCE_PAGE}>
   //         <LocationDisplay />
   //       </Route>
   //   </Router>
   //     );
   //     //fireEvent.click(EditButton);

   //     await waitFor(() => {
   //         getByTestId("Edit");
   //         // expect(
   //                 //     queryByRole("button", { name: "Edit" })
   //                 // ).not.toBeInTheDocument();
   //                 // expect(getByTestId("location-display")).toHaveTextContent(
   //                 //     PREFERENCE_PAGE
   //                 // );
   //     });
   // })
})
