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
import { MealPreference } from './'
import preferencePageInfo from '../../../../fixtures/preferncePageInfo.json'

describe('MealPreference Tests', () => {
   let mealInfoAPIService
   let mealInfoStore
   let mealPreference
   let itemInfo

   beforeEach(() => {
      mealInfoAPIService = new MealInfoAPIService()
      mealInfoStore = new MealInfoStore(mealInfoAPIService)
      mealPreference = new MealPreference(mealInfoStore.mealInfoAPIService)
   })

   it('should test onChangeDateInPreferenceCard', async () => {
      const mockSuccessPromise = new Promise(resove =>
         resove(preferencePageInfo)
      )
      const mockmealTypeInfoAPI = jest.fn()
      mockmealTypeInfoAPI.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.getmealTypeInfoAPI = mockmealTypeInfoAPI
      mealInfoStore.mealType = 'Breakfast'
      const date = '2020-06-16'
      await mealPreference.onChangeDateInPreferenceCard(date)
      expect(mealPreference.selectedDate).toBe('2020-06-16')
   })

   it('should test getSelectedPreference', () => {
      const preference = 'FullMeal'
      mealPreference.getSelectedPreference(preference)
      expect(mealPreference.selectedPreference).toBe('FullMeal')
   })

   it('should test setSelectedPreference is fetching when the button is Skipped', () => {
      const selectedPreferenceInfo = {}
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const button = 'Skipped'
      const mockLoadingPromise = new Promise(() => {})
      const mocksetSelectedPreference = jest.fn()
      mocksetSelectedPreference.mockReturnValue(mockLoadingPromise)
      mealInfoAPIService.setSelectedPreference = mocksetSelectedPreference
      mealPreference.setSelectedPreference(
         selectedPreferenceInfo,
         onSuccess,
         onFailure,
         button
      )
      expect(mealPreference.updatedPreferenceAPIStatus).toBe(100)
   })

   it('should test setSelectedPreference is fetching when the button is Save ', () => {
      const selectedPreferenceInfo = {}
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const button = 'Save'
      const mockLoadingPromise = new Promise(() => {})
      const mocksetSelectedPreference = jest.fn()
      mocksetSelectedPreference.mockReturnValue(mockLoadingPromise)
      mealInfoAPIService.setSelectedPreference = mocksetSelectedPreference
      mealPreference.setSelectedPreference(
         selectedPreferenceInfo,
         onSuccess,
         onFailure,
         button
      )
      expect(mealPreference.updatedPreferenceAPIStatus).toBe(100)
   })

   it('should test setSelectedPreference is success', async () => {
      const selectedPreferenceInfo = {}
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const button = 'Skipped'
      const mockSuccessPromise = new Promise(resolve => {
         resolve('Skipped')
      })
      const mocksetSelectedPreference = jest.fn()
      mocksetSelectedPreference.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.setSelectedPreference = mocksetSelectedPreference
      await mealPreference.setSelectedPreference(
         selectedPreferenceInfo,
         onSuccess,
         onFailure,
         button
      )
      expect(mealPreference.updatedPreferenceAPIStatus).toBe(200)
   })

   it('should test setSelectedPreference is Failure', async () => {
      const selectedPreferenceInfo = {}
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const button = 'Skipped'
      const mockSuccessPromise = new Promise((_, reject) => {
         reject()
      })
      const mocksetSelectedPreference = jest.fn()
      mocksetSelectedPreference.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.setSelectedPreference = mocksetSelectedPreference
      await mealPreference.setSelectedPreference(
         selectedPreferenceInfo,
         onSuccess,
         onFailure,
         button
      )
      expect(mealPreference.updatedPreferenceAPIStatus).toBe(400)
   })

   it('should test onSaveMealPreference is we click skip button', () => {
      const mockSuccessPromise = new Promise(resove =>
         resove(preferencePageInfo)
      )
      const mockmealTypeInfoAPI = jest.fn()
      mockmealTypeInfoAPI.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.getmealTypeInfoAPI = mockmealTypeInfoAPI
      mealPreference.getSelectedMealTypeInfo()
      const mocksetSelectedPreference = jest.fn()
      mocksetSelectedPreference.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.setSelectedPreference = mocksetSelectedPreference
      const button = 'Skipped'
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      mealPreference.onSaveMealPreference(onSuccess, onFailure, button)
   })

   it('should test onClickSkipButton', () => {
      const button = 'Skipped'
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      mealPreference.onClickSkipButton(onSuccess, onFailure, button)
      expect(mealPreference.selectedPreference).toBe('Skipped')
   })

   it('should test setSelectedPreferenceAsCustomMeal is fetching', () => {
      const selectedPreferenceInfo = {}
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const button = 'Skipped'
      const mockLoadingPromise = new Promise(() => {})
      const mocksetSelectedPreferenceAsCustomMeal = jest.fn()
      mocksetSelectedPreferenceAsCustomMeal.mockReturnValue(mockLoadingPromise)
      mealInfoAPIService.setSelectedPreferenceAsCustomMeal = mocksetSelectedPreferenceAsCustomMeal
      mealPreference.setSelectedPreferenceAsCustomMeal(
         selectedPreferenceInfo,
         onSuccess,
         onFailure,
         button
      )
      expect(mealPreference.updatedCustomMealAPIStatus).toBe(100)
   })

   it('should test setSelectedPreferenceAsCustomMeal is fetching when we click save', () => {
      const selectedPreferenceInfo = {}
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const button = 'Save'
      const mockLoadingPromise = new Promise(() => {})
      const mocksetSelectedPreferenceAsCustomMeal = jest.fn()
      mocksetSelectedPreferenceAsCustomMeal.mockReturnValue(mockLoadingPromise)
      mealInfoAPIService.setSelectedPreferenceAsCustomMeal = mocksetSelectedPreferenceAsCustomMeal
      mealPreference.setSelectedPreferenceAsCustomMeal(
         selectedPreferenceInfo,
         onSuccess,
         onFailure,
         button
      )
      expect(mealPreference.updatedCustomMealAPIStatus).toBe(100)
   })

   it('should test setSelectedPreferenceAsCustomMeal is success', async () => {
      const selectedPreferenceInfo = {}
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const button = 'Skipped'
      const mockSuccessPromise = new Promise(resolve => {
         resolve('Custom')
      })
      const mocksetSelectedPreferenceAsCustomMeal = jest.fn()
      mocksetSelectedPreferenceAsCustomMeal.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.setSelectedPreferenceAsCustomMeal = mocksetSelectedPreferenceAsCustomMeal
      await mealPreference.setSelectedPreferenceAsCustomMeal(
         selectedPreferenceInfo,
         onSuccess,
         onFailure,
         button
      )
      expect(mealPreference.updatedCustomMealAPIStatus).toBe(200)
   })

   it('should test setSelectedPreferenceAsCustomMeal is failure', async () => {
      const selectedPreferenceInfo = {}
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const button = 'Skipped'
      const mockFailurePromise = new Promise((_, reject) => {
         reject()
      })
      const mocksetSelectedPreferenceAsCustomMeal = jest.fn()
      mocksetSelectedPreferenceAsCustomMeal.mockReturnValue(mockFailurePromise)
      mealInfoAPIService.setSelectedPreferenceAsCustomMeal = mocksetSelectedPreferenceAsCustomMeal
      await mealPreference.setSelectedPreferenceAsCustomMeal(
         selectedPreferenceInfo,
         onSuccess,
         onFailure,
         button
      )
      expect(mealPreference.updatedCustomMealAPIStatus).toBe(400)
   })

   it('should test onSaveMealPreference is we select custom preference', () => {
      const mockSuccessPromise = new Promise(resove =>
         resove(preferencePageInfo)
      )
      const mockmealTypeInfoAPI = jest.fn()
      mockmealTypeInfoAPI.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.getmealTypeInfoAPI = mockmealTypeInfoAPI
      mealPreference.getSelectedMealTypeInfo()
      const mocksetSelectedPreference = jest.fn()
      mocksetSelectedPreference.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.setSelectedPreference = mocksetSelectedPreference
      mealPreference.selectedPreference = 'Custom'
      const button = 'Save'
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      mealPreference.onSaveMealPreference(onSuccess, onFailure, button)
   })

   it('should test clearMealPreferenceInfoModel', () => {
      mealPreference.clearMealPreferenceInfoModel()
      expect(mealPreference.selectedMealTypeInfoAPIStatus).toBe(0)
   })
})
