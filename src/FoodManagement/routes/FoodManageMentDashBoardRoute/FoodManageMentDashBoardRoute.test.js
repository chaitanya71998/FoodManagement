/*global jest*/
/*global expect*/
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'
import {
   FOOD_MANAGEMET_DASHBOARD,
   PREFERENCE_PAGE,
   SIGN_IN_PAGE
} from '../../constants/APIConstants'
import { MealInfoAPIService } from '../../services/MealInfoAPIService'
import MealInfo from '../../fixtures/MealInfo.json'
import { MealInfoStore } from '../../stores/MealInfoStore'
import { FoodManagementDashBoardRoute } from './'
import { SignInService } from '../../../Authentication/services/SignInService'
import { SignInStore } from '../../../Authentication/stores/SignInStore'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

describe('products page route', () => {
   let mealInfoAPIService
   let mealInfoStore
   let signInService
   let signInStore

   beforeEach(() => {
      signInService = new SignInService()
      signInStore = new SignInStore(signInService)
      mealInfoAPIService = new MealInfoAPIService()
      mealInfoStore = new MealInfoStore(mealInfoAPIService)
   })

   afterEach(() => {
      jest.clearAllMocks()
   })

   it('sholud test the api status is fetching', () => {
      const { getByText, getByRole } = render(
         <Provider
            mealInfoStore={mealInfoStore}
            signInService={signInService}
            mealInfoAPIService={mealInfoAPIService}
            signInStore={signInStore}
         >
            <Router history={createMemoryHistory()}>
               <FoodManagementDashBoardRoute />
            </Router>
         </Provider>
      )
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockgetMealInfoAPI = jest.fn()
      mockgetMealInfoAPI.mockReturnValue(mockLoadingPromise)
      mealInfoAPIService.getMealInfoAPI = mockgetMealInfoAPI
      expect(mealInfoStore.getMealInfoAPIStatus).toBe(100)
   })

   it('sholud test the api status is success', async () => {
      const { getByText, getByRole } = render(
         <Provider
            mealInfoStore={mealInfoStore}
            signInService={signInService}
            mealInfoAPIService={mealInfoAPIService}
            signInStore={signInStore}
         >
            <Router history={createMemoryHistory()}>
               <FoodManagementDashBoardRoute />
            </Router>
         </Provider>
      )
      const mockLoadingPromise = new Promise(function(resolve, reject) {
         resolve(MealInfo)
      })
      const mockgetMealInfoAPI = jest.fn()
      mockgetMealInfoAPI.mockReturnValue(mockLoadingPromise)
      mealInfoAPIService.getMealInfoAPI = mockgetMealInfoAPI
      await waitFor(() => {
         expect(mealInfoStore.getMealInfoAPIStatus).toEqual(200)
      })
   })

   it('sholud test the api status is failure', async () => {
      const { getByText, getByRole } = render(
         <Provider
            mealInfoStore={mealInfoStore}
            signInService={signInService}
            mealInfoAPIService={mealInfoAPIService}
            signInStore={signInStore}
         >
            <Router history={createMemoryHistory()}>
               <FoodManagementDashBoardRoute />
            </Router>
         </Provider>
      )
      const mockLoadingPromise = new Promise(function(resolve, reject) {
         resolve(MealInfo)
      })
      const mockgetMealInfoAPI = jest.fn()
      mockgetMealInfoAPI.mockReturnValue(mockLoadingPromise)
      mealInfoAPIService.getMealInfoAPI = mockgetMealInfoAPI
      await waitFor(() => {
         expect(mealInfoStore.getMealInfoAPIStatus).toEqual(200)
      })
   })

   it('sholud test signOut function', async () => {
      const { getByText, getByRole, debug, getByTestId } = render(
         <Provider
            mealInfoStore={mealInfoStore}
            signInService={signInService}
            mealInfoAPIService={mealInfoAPIService}
            signInStore={signInStore}
         >
            <Router
               history={createMemoryHistory()}
               path={FOOD_MANAGEMET_DASHBOARD}
            >
               <FoodManagementDashBoardRoute />
            </Router>
            <Router history={createMemoryHistory()} path={SIGN_IN_PAGE}>
               <LocationDisplay />
            </Router>
         </Provider>
      )
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(MealInfo)
      })
      const mockgetMealInfoAPI = jest.fn()
      mockgetMealInfoAPI.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.getMealInfoAPI = mockgetMealInfoAPI
      const signOutButton = getByRole('button', { name: 'SignOut' })
      fireEvent.click(signOutButton)
      debug()
      expect(getByTestId('location-display')).toBeInTheDocument()
   })

   // it("sholud test Edit function", async() => {
   //     const { getByText, getByRole, debug, getByTestId } = render(
   //         <Provider
   //         mealInfoStore={mealInfoStore}
   //         signInService={signInService}
   //         mealInfoAPIService={mealInfoAPIService}
   //         signInStore={signInStore}
   //         >
   //         <Router history={createMemoryHistory()} path={FOOD_MANAGEMET_DASHBOARD}>
   //     <FoodManagementDashBoardRoute />
   //   </Router>
   //   <Router history={createMemoryHistory()} path={PREFERENCE_PAGE}>
   //     <LocationDisplay  />
   //   </Router>
   //   </Provider>
   //     );
   //     const mockSuccessPromise = new Promise(function(resolve, reject) {
   //         resolve(MealInfo)
   //     });
   //     const mockgetMealInfoAPI = jest.fn();

   //     mockgetMealInfoAPI.mockReturnValue(mockSuccessPromise);
   //     mealInfoAPIService.getMealInfoAPI = mockgetMealInfoAPI;
   //     const editButton = getByRole("button", { Name: "Edit" });
   //     fireEvent.click(editButton)
   //     debug()
   //     expect(getByTestId("location-display")).toBeInTheDocument()
   // })
})
