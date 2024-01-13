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
import { MealPreference } from '../MealPreference'
import { ItemInfo } from './'

describe('ItemInfo Tests', () => {
   let mealInfoAPIService
   let mealInfoStore
   let mealPreference
   let itemInfo

   beforeEach(() => {
      mealInfoAPIService = new MealInfoAPIService()
      mealInfoStore = new MealInfoStore(mealInfoAPIService)
      mealPreference = new MealPreference(mealInfoStore)
      itemInfo = new ItemInfo(mealPreference)
   })

   it('should test onChangeQuantity', () => {
      const quantity = 5
      itemInfo.onChangeQuantity(quantity)
      expect(itemInfo.quantity).toBe(5)
   })
})
