/*global expect*/
/*global jest*/
import React from 'react'
import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'
import { waitFor } from '@testing-library/react'
import { MealInfoAPIService } from '../../services/MealInfoAPIService'
import { MealInfoStore } from './'
import mealInfo from '../../fixtures/mealInfo.json'
import preferencePageInfo from '../../fixtures/preferncePageInfo.json'
import reviewInfo from '../../fixtures/reviewInfo.json'
import '@testing-library/jest-dom/extend-expect'

describe('MealInfoStore Tests', () => {
   let mealInfoAPIService
   let mealInfoStore

   beforeEach(() => {
      mealInfoAPIService = new MealInfoAPIService()
      mealInfoStore = new MealInfoStore(mealInfoAPIService)
   })

   it('should test initialising MealInfoStore', () => {
      expect(mealInfoStore.mealInfoAPIStatus).toBe(API_INITIAL)
      expect(mealInfoStore.mealInfoAPIError).toBe(null)
      expect(mealInfoStore.selectedMealInfo).toBe(null)
      expect(mealInfoStore.selectedMealInfoReview).toBe(null)
   })

   it('should test MealInfoAPI data fetching state', () => {
      const mockLoadingPromise = new Promise(() => {})
      const mockMealInfoAPI = jest.fn()
      mockMealInfoAPI.mockReturnValue(mockLoadingPromise)
      mealInfoAPIService.getMealInfoAPI = mockMealInfoAPI
      mealInfoStore.getMealInfoAsPerDate()
      expect(mealInfoStore.mealInfoAPIStatus).toBe(API_FETCHING)
   })

   it('should test MealInfoAPI success state', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve(mealInfo)
      })
      const mockMealInfoAPI = jest.fn()
      mockMealInfoAPI.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.getMealInfoAPI = mockMealInfoAPI
      await mealInfoStore.getMealInfoAsPerDate()
      expect(mealInfoStore.mealInfoAPIStatus).toBe(API_SUCCESS)
   })

   it('should test MealInfoAPI failure state', async () => {
      jest
         .spyOn(mealInfoAPIService, 'getMealInfoAPI')
         .mockImplementation(() => Promise.reject())
      await mealInfoStore.getMealInfoAsPerDate()
      expect(mealInfoStore.mealInfoAPIStatus).toBe(API_FAILED)
   })

   it('should test the getSelectedMealTypeInfo fetching', () => {
      const mockLoadingPromise = new Promise(() => {})
      const mockMealInfoAPI = jest.fn()
      mockMealInfoAPI.mockReturnValue(mockLoadingPromise)
      mealInfoAPIService.getmealTypeInfoAPI = mockMealInfoAPI
      const mealType = 'Breakfast'
      mealInfoStore.onClickEditPreference(mealType)
      expect(mealInfoStore.selectedMealInfo.selectedMealTypeInfoAPIStatus).toBe(
         API_FETCHING
      )
   })

   it('should test the getSelectedMealTypeInfo success', async () => {
      const mockSuccessPromise = new Promise(resolve =>
         resolve(preferencePageInfo)
      )
      const mockMealInfoAPI = jest.fn()
      mockMealInfoAPI.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.getmealTypeInfoAPI = mockMealInfoAPI
      const mealType = 'Breakfast'
      mealInfoStore.onClickEditPreference(mealType)
      await waitFor(() => {
         expect(
            mealInfoStore.selectedMealInfo.selectedMealTypeInfoAPIStatus
         ).toBe(API_SUCCESS)
      })
   })

   it('should test the getSelectedMealTypeInfo failed', async () => {
      const mockFailurePromise = new Promise((_, reject) => reject())
      const mockMealInfoAPI = jest.fn()
      mockMealInfoAPI.mockReturnValue(mockFailurePromise)
      mealInfoAPIService.getmealTypeInfoAPI = mockMealInfoAPI
      const mealType = 'Breakfast'
      mealInfoStore.onClickEditPreference(mealType)
      await waitFor(() => {
         expect(
            mealInfoStore.selectedMealInfo.selectedMealTypeInfoAPIStatus
         ).toBe(API_FAILED)
      })
   })

   it('should test the getSelectedMealTypeReviewInfo fetching', () => {
      const mockLoadingPromise = new Promise(() => {})
      const mockMealInfoAPI = jest.fn()
      mockMealInfoAPI.mockReturnValue(mockLoadingPromise)
      mealInfoAPIService.getmealTypeInfoAPI = mockMealInfoAPI
      const mealType = 'Breakfast'
      mealInfoStore.onClickReviewButton(mealType)
      expect(
         mealInfoStore.selectedMealInfoReview
            .selectedMealTypeReviewInfoAPIStatus
      ).toBe(API_FETCHING)
   })

   it('should test the getSelectedMealTypeReviewInfo success', async () => {
      const mockSuccessPromise = new Promise(resolve => resolve(reviewInfo))
      const mockMealInfoAPI = jest.fn()
      mockMealInfoAPI.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.getmealTypeInfoAPI = mockMealInfoAPI
      const mealType = 'Breakfast'
      await mealInfoStore.onClickReviewButton(mealType)
      waitFor(() => {
         expect(
            mealInfoStore.selectedMealInfoReview
               .selectedMealTypeReviewInfoAPIStatus
         ).toBe(API_SUCCESS)
      })
   })

   it('should test the getSelectedMealTypeReviewInfo failure state', async () => {
      jest
         .spyOn(mealInfoAPIService, 'getmealTypeInfoAPI')
         .mockImplementation(() => Promise.reject())
      const mealType = 'Breakfast'
      await mealInfoStore.onClickReviewButton(mealType)
      waitFor(() => {
         expect(
            mealInfoStore.mealInfoStore.selectedMealInfoReview
               .selectedMealTypeReviewInfoAPIStatus
         ).toBe(API_FAILED)
      })
   })
})
