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

describe('PaginationStore Tests', () => {
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
})
