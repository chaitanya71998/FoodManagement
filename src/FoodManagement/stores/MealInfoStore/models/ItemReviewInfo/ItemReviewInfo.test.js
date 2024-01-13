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
import { MealReview } from '../MealReview'
import { ItemReviewInfo } from './'

describe('MealPreference Tests', () => {
   let mealInfoAPIService
   let mealInfoStore
   let mealReview
   let itemReviewInfo

   beforeEach(() => {
      mealInfoAPIService = new MealInfoAPIService()
      mealInfoStore = new MealInfoStore(mealInfoAPIService)
      mealReview = new MealReview(mealInfoStore)
      itemReviewInfo = new ItemReviewInfo(mealReview)
   })

   it('should test onChangeQualityRating', () => {
      const qualityRating = 5
      itemReviewInfo.onChangeQualityRating(qualityRating)
      expect(itemReviewInfo.quality).toBe(5)
   })

   it('should test onChangeTasteRating', () => {
      const tasteRating = 5
      itemReviewInfo.onChangeTasteRating(tasteRating)
      expect(itemReviewInfo.taste).toBe(5)
   })
})
