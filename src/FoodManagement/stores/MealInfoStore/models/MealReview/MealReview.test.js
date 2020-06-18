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
import { MealInfoAPIService } from '../../../../services/MealInfoAPIService'
import { MealInfoStore } from '../../'
import { MealReview } from './'
import reviewInfo from '../../../../fixtures/reviewInfo.json'

describe('MealPreference Tests', () => {
   let mealInfoAPIService
   let mealInfoStore
   let mealReview

   beforeEach(() => {
      mealInfoAPIService = new MealInfoAPIService()
      mealInfoStore = new MealInfoStore(mealInfoAPIService)
      mealReview = new MealReview(mealInfoStore.mealInfoAPIService)
   })
   it('should test getSelectedMealTypeReviewInfo is fetching status', () => {
      const mockLoadingPromise = new Promise(() => {})
      const mockgetmealTypeReviewInfoAPI = jest.fn()
      mockgetmealTypeReviewInfoAPI.mockReturnValue(mockLoadingPromise)
      mealInfoAPIService.getmealTypeReviewInfoAPI = mockgetmealTypeReviewInfoAPI
      mealReview.getSelectedMealTypeReviewInfo()
      expect(mealReview.selectedMealTypeReviewInfoAPIStatus).toBe(100)
   })

   it('should test getSelectedMealTypeReviewInfo is success status', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve(reviewInfo)
      })
      const mockgetmealTypeReviewInfoAPI = jest.fn()
      mockgetmealTypeReviewInfoAPI.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.getmealTypeReviewInfoAPI = mockgetmealTypeReviewInfoAPI
      await mealReview.getSelectedMealTypeReviewInfo()
      expect(mealReview.selectedMealTypeReviewInfoAPIStatus).toBe(200)
   })

   it('should test getSelectedMealTypeReviewInfo is failure status', async () => {
      const mockSuccessPromise = new Promise((_, reject) => {
         reject()
      })
      const mockgetmealTypeReviewInfoAPI = jest.fn()
      mockgetmealTypeReviewInfoAPI.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.getmealTypeReviewInfoAPI = mockgetmealTypeReviewInfoAPI
      await mealReview.getSelectedMealTypeReviewInfo()
      expect(mealReview.selectedMealTypeReviewInfoAPIStatus).toBe(400)
   })

   it('should test onChangeReviewOfMealType', () => {
      const review = 'super'
      mealReview.onChangeReviewOfMealType(review)
      expect(mealReview.mealTypeReview.mealReview).toBe('super')
   })

   it('should test setMealReview is fetching state', () => {
      const mockLoadingPromise = new Promise(() => {})
      const mocksetReviewInfo = jest.fn()
      mocksetReviewInfo.mockReturnValue(mockLoadingPromise)
      mealInfoAPIService.setReviewInfo = mocksetReviewInfo
      const reviewInfo = {}
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      mealReview.setMealReview(reviewInfo, onSuccess, onFailure)
      expect(mealReview.updatedReviewAPIStatus).toBe(100)
   })

   it('should test setMealReview is success state', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve('setReview')
      })
      const mocksetReviewInfo = jest.fn()
      mocksetReviewInfo.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.setReviewInfo = mocksetReviewInfo
      const reviewInfo = {}
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      await mealReview.setMealReview(reviewInfo, onSuccess, onFailure)
      expect(mealReview.updatedReviewAPIStatus).toBe(200)
   })

   it('should test setMealReview is failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject()
      })
      const mocksetReviewInfo = jest.fn()
      mocksetReviewInfo.mockReturnValue(mockFailurePromise)
      mealInfoAPIService.setReviewInfo = mocksetReviewInfo
      const reviewInfo = {}
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      await mealReview.setMealReview(reviewInfo, onSuccess, onFailure)
      expect(mealReview.updatedReviewAPIStatus).toBe(400)
   })

   it('should test clearMealReviewModel', () => {
      mealReview.clearMealReviewModel()
      expect(mealReview.selectedMealTypeReviewInfoAPIStatus).toBe(0)
   })

   it('should test the onSaveMealReview', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve(reviewInfo)
      })
      const mockgetmealTypeReviewInfoAPI = jest.fn()
      mockgetmealTypeReviewInfoAPI.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.getmealTypeReviewInfoAPI = mockgetmealTypeReviewInfoAPI
      await mealReview.getSelectedMealTypeReviewInfo()
      const mocksetReviewInfo = jest.fn()
      mocksetReviewInfo.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.setReviewInfo = mocksetReviewInfo
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      mealReview.onSaveMealReview(onSuccess, onFailure)
      await waitFor(() => {
         expect(mealReview.updatedReviewAPIStatus).toBe(200)
      })
   })
})
