/*global expect*/
/*global jest*/
import React from 'react'
import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
}
from '@ib/api-constants'
import { MealInfoAPIService } from '../../services/MealInfoAPIService'
import { MealInfoStore } from './MealInfoStore'
import MealInfo from '../../fixtures/MealInfo.json'
import PreferencePageInfo from '../../fixtures/PreferncePageInfo.json'
import '@testing-library/jest-dom/extend-expect'

import Cookie from 'js-cookie'

let mockSetCookie = jest.fn()
let mockRemoveCookie = jest.fn()
let mockGetCookie = jest.fn()

Cookie.set = mockSetCookie
Cookie.remove = mockRemoveCookie
Cookie.get = mockGetCookie

global.mockSetCookie = mockSetCookie
global.mockRemoveCookie = mockRemoveCookie
global.mockGetCookie = mockGetCookie

describe('MealInfoStore Tests', () => {
   let mealInfoAPIService
   let mealInfoStore

   beforeEach(() => {
      mealInfoAPIService = new MealInfoAPIService()
      mealInfoStore = new MealInfoStore(mealInfoAPIService)
   })

   it('should test initialising MealInfoStore', () => {
      expect(mealInfoStore.getMealInfoAPIStatus).toBe(API_INITIAL)
      expect(mealInfoStore.getMealInfoAPIError).toBe(null)
      expect(mealInfoStore.selectedPreference).toBe(null)
      expect(mealInfoStore.getmealPreferenceInfoAPIStatus).toBe(API_INITIAL)
      expect(mealInfoStore.getmealPreferenceInfoAPIError).toBe(null)
      expect(mealInfoStore.getUpdatedPreferenceFullOrHalfMealAPIStatus).toBe(API_INITIAL)
      expect(mealInfoStore.getUpdatedPreferenceCustomMealAPIStatus).toBe(API_INITIAL)
      expect(mealInfoStore.getUpdatedPreferenceFullOrHalfMealAPIError).toBe(null)
      expect(mealInfoStore.getUpdatedPreferenceCustomMealAPIError).toBe(null)
      expect(mealInfoStore.mealInfo).toEqual([])
   })

   it('should test MealInfoAPI data fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockMealInfoAPI = jest.fn()
      mockMealInfoAPI.mockReturnValue(mockLoadingPromise)
      mealInfoAPIService.getMealInfoAPI = mockMealInfoAPI
      mealInfoStore.getMealInfoAsPerDate()
      expect(mealInfoStore.getMealInfoAPIStatus).toBe(API_FETCHING)
   })

   it('should test MealInfoAPI success state', async() => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(MealInfo)
      })
      const mockMealInfoAPI = jest.fn()
      mockMealInfoAPI.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.getMealInfoAPI = mockMealInfoAPI
      await mealInfoStore.getMealInfoAsPerDate()
      expect(mealInfoStore.getMealInfoAPIStatus).toBe(API_SUCCESS)
   })

   it('should test MealInfoAPI failure state', async() => {
      jest
         .spyOn(mealInfoAPIService, 'getMealInfoAPI')
         .mockImplementation(() => Promise.reject())
      await mealInfoStore.getMealInfoAsPerDate()
      expect(mealInfoStore.getMealInfoAPIStatus).toBe(API_FAILED)
   })

   it('should test is MealInfo', async() => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(MealInfo)
      })
      const mockMealInfoAPI = jest.fn()
      mockMealInfoAPI.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.getMealInfoAPI = mockMealInfoAPI
      await mealInfoStore.getMealInfoAsPerDate()
      expect(mealInfoStore.mealInfo.length).toBe(3)
   })

   it('should test selectedMealInfoAPI data fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockMealInfoAPI = jest.fn()
      const mealType = 'Breakfast'
      mockMealInfoAPI.mockReturnValue(mockLoadingPromise)
      mealInfoAPIService.getmealPreferenceInfoAPI = mockMealInfoAPI
      mealInfoStore.getmealPreferenceInfo(mealType)
      expect(mealInfoStore.getmealPreferenceInfoAPIStatus).toBe(API_FETCHING)
   })
   it('should test selectedMealInfoAPI data success state', async() => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(PreferencePageInfo)
      })
      const mockMealInfoAPI = jest.fn()
      const mealType = 'Breakfast'
      mockMealInfoAPI.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.getmealPreferenceInfoAPI = mockMealInfoAPI
      await mealInfoStore.getmealPreferenceInfo(mealType)
      expect(mealInfoStore.getmealPreferenceInfoAPIStatus).toBe(API_SUCCESS)
   })
   it('should test MealInfoAPI failure state', async() => {
      jest
         .spyOn(mealInfoAPIService, 'getmealPreferenceInfoAPI')
         .mockImplementation(() => Promise.reject())
      const mealType = 'Breakfast'
      await mealInfoStore.getmealPreferenceInfo(mealType)
      expect(mealInfoStore.getmealPreferenceInfoAPIStatus).toBe(API_FAILED)
   })

   it('should test is SelectedMealInfo', async() => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(PreferencePageInfo)
      })
      const mockMealInfoAPI = jest.fn()
      const mealType = 'Breakfast'
      mockMealInfoAPI.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.getMealInfoAPI = mockMealInfoAPI
      await mealInfoStore.getmealPreferenceInfo(mealType)
      expect(mealInfoStore.selectedMealInfo.length).toBe(3)
   })

   it('should test is SelectedMealPreference', async() => {
      mealInfoStore.getSelectedPreference('Full meal')
      expect(mealInfoStore.selectedPreference).toBe('Full meal')
   })

   it('should test SetMealPreferenceInfoAPI data fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockMealInfoAPI = jest.fn()
      const selectedPreferenceInfo = {}
      const onFailure = jest.fn()
      const onSuccess = jest.fn()
      mockMealInfoAPI.mockReturnValue(mockLoadingPromise)
      mealInfoAPIService.setSelectedPreferenceAsFullOrHalfMeal = mockMealInfoAPI
      mealInfoStore.setSelectedPreferenceAsFullOrHalfMeal(
         selectedPreferenceInfo,
         onSuccess,
         onFailure
      )
      expect(mealInfoStore.getUpdatedPreferenceFullOrHalfMealAPIStatus).toBe(
         API_FETCHING
      )
   })

   it('should test SetMealPreferenceInfoAPI data Success state', async() => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve('reponse captured')
      })
      const mockMealInfoAPI = jest.fn()
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const selectedPreferenceInfo = {}
      mockMealInfoAPI.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.setSelectedPreferenceAsFullOrHalfMeal = mockMealInfoAPI
      await mealInfoStore.setSelectedPreferenceAsFullOrHalfMeal(
         selectedPreferenceInfo,
         onSuccess,
         onFailure
      )
      expect(mealInfoStore.getUpdatedPreferenceFullOrHalfMealAPIStatus).toBe(
         API_SUCCESS
      )
   })

   it('should test SetMealPreferenceInfoAPI failure state', async() => {
      jest
         .spyOn(mealInfoAPIService, 'setSelectedPreferenceAsFullOrHalfMeal')
         .mockImplementation(() => Promise.reject())
      const selectedPreferenceInfo = 'Breakfast'
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      await mealInfoStore.setSelectedPreferenceAsFullOrHalfMeal(
         selectedPreferenceInfo,
         onSuccess,
         onFailure
      )
      expect(mealInfoStore.getUpdatedPreferenceFullOrHalfMealAPIStatus).toBe(
         API_FAILED
      )
   })

   it('should test SetMealPreference for customInfoAPI data fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockMealInfoAPI = jest.fn()
      const selectedPreferenceInfo = {}
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      mockMealInfoAPI.mockReturnValue(mockLoadingPromise)
      mealInfoAPIService.setSelectedPreferenceAsCustomMeal = mockMealInfoAPI
      mealInfoStore.setSelectedPreferenceAsCustomMeal(
         selectedPreferenceInfo,
         onSuccess,
         onFailure
      )
      expect(mealInfoStore.getUpdatedPreferenceCustomMealAPIStatus).toBe(
         API_FETCHING
      )
   })

   it('should test SetMealPreferenceInfoAPI for custom data Success state', async() => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve('reponse captured')
      })
      const mockMealInfoAPI = jest.fn()
      const selectedPreferenceInfo = {}
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      mockMealInfoAPI.mockReturnValue(mockSuccessPromise)
      mealInfoAPIService.setSelectedPreferenceAsCustomMeal = mockMealInfoAPI
      await mealInfoStore.setSelectedPreferenceAsCustomMeal(
         selectedPreferenceInfo,
         onSuccess,
         onFailure
      )
      expect(mealInfoStore.getUpdatedPreferenceCustomMealAPIStatus).toBe(
         API_SUCCESS
      )
   })

   it('should test SetMealPreferenceInfoAPI for custom failure state', async() => {
      jest
         .spyOn(mealInfoAPIService, 'setSelectedPreferenceAsCustomMeal')
         .mockImplementation(() => Promise.reject())
      const selectedPreferenceInfo = 'Breakfast'
      const onFailure = jest.fn()
      const onSuccess = jest.fn()
      await mealInfoStore.setSelectedPreferenceAsCustomMeal(
         selectedPreferenceInfo,
         onSuccess,
         onFailure
      )
      expect(mealInfoStore.getUpdatedPreferenceCustomMealAPIStatus).toBe(
         API_FAILED
      )
   })
})
