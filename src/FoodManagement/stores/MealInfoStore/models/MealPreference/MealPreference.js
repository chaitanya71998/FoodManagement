import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { ItemInfo } from '../ItemInfo'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
}
from '@ib/api-constants'
class MealPreference {
   @observable preferencesInfo = []
   @observable selectedPreference
   @observable selectedMealTypeInfoAPIStatus
   @observable selectedMealTypeAPIInfoError
   @observable updatedPreferenceFullOrHalfOrSkipMealAPIStatus
   @observable updatedPreferenceFullOrHalfOrSkipMealAPIError
   @observable updatedPreferenceCustomMealAPIStatus
   @observable updatedPreferenceCustomMealAPIError
   @observable mealType
   @observable isLoadingOnSave = false
   @observable isLoadingOnSkipped = false

   constructor(mealInfoAPIService, selectedDate, mealType) {
      this.mealInfoAPIService = mealInfoAPIService
      this.selectedDate = selectedDate
      this.mealType = mealType
      this.init()
   }

   init() {
      this.selectedMealTypeInfoAPIStatus = API_INITIAL
      this.selectedMealTypeAPIInfoError = null
      this.updatedPreferenceAPIStatus = API_INITIAL
      this.updatedPreferenceAPIError = null
      this.updatedCustomMealAPIStatus = API_INITIAL
      this.updatedCustomMealAPIError = null
      this.selectedPreference = 'FullMeal'
   }

   @action.bound
   getSelectedMealTypeInfo() {
      this.clearPreferencesInfo()
      const mealTypeInfoAPI = this.mealInfoAPIService.getmealTypeInfoAPI(
         this.selectedDate,
         this.mealType
      )
      return bindPromiseWithOnSuccess(mealTypeInfoAPI)
         .to(
            this.setSelectedMealTypeInfoAPIStatus,
            this.setSelectedMealTypeInfoAPIResponse
         )
         .catch(this.setSelectedMealTypeAPIInfoError)
   }

   @action.bound
   onChangeDateInPreferenceCard(date) {
      this.selectedDate = date
      this.getSelectedMealTypeInfo(this.mealType)
   }

   @action.bound
   setSelectedMealTypeInfoAPIStatus(status) {
      this.selectedMealTypeInfoAPIStatus = status
   }

   @action.bound
   setSelectedMealTypeAPIInfoError(error) {
      this.selectedMealTypeAPIInfoError = error
   }

   @action.bound
   setSelectedMealTypeInfoAPIResponse(response) {
      this.clearPreferencesInfo()
      response.map(preference => {
         let mealItems = []
         preference.meal_items.map(item => {
            const itemInfo = new ItemInfo(item)
            mealItems.push(itemInfo)
         })
         const preferenceInfo = {
            mealPreference: preference.meal_preference,
            mealItems: [...mealItems]
         }
         this.preferencesInfo.push(preferenceInfo)
      })
   }

   @action.bound
   getSelectedPreference(preference) {
      this.selectedPreference = preference
   }

   @action.bound
   onSaveMealPreference(onSuccess, onFailure, button) {
      let mealItemsInfo = []
      this.preferencesInfo.forEach(preference => {
         if (preference.mealPreference === 'Custom') {
            mealItemsInfo = [...preference.mealItems]
         }
      })
      let selectedPreferenceInfo = {}
      if (
         this.selectedPreference === 'FullMeal' ||
         this.selectedPreference === 'HalfMeal' ||
         this.selectedPreference === 'Skipped'
      ) {
         selectedPreferenceInfo.meal_type = this.mealType
         selectedPreferenceInfo.meal_preference = this.selectedPreference
         selectedPreferenceInfo.date = this.selectedDate
         this.setSelectedPreference(
            selectedPreferenceInfo,
            onSuccess,
            onFailure,
            button
         )
      }
      else {
         selectedPreferenceInfo.meal_type = this.mealType
         selectedPreferenceInfo.meal_items = []
         mealItemsInfo.forEach(itemInfo => {
            let item = {
               item_id: itemInfo.mealItemId,
               quantity: itemInfo.quantity,
               serving_size_unit: itemInfo.servingSizeUnit
            }
            selectedPreferenceInfo.meal_items.push(item)
         })
         selectedPreferenceInfo.date = this.selectedDate
         this.setSelectedPreferenceAsCustomMeal(
            selectedPreferenceInfo,
            onSuccess,
            onFailure,
            button
         )
      }
   }

   @action.bound
   onClickSkipButton(onSuccess, onFailure, button) {
      this.selectedPreference = 'Skipped'
      this.onSaveMealPreference(onSuccess, onFailure, button)
   }

   @action.bound
   setSelectedPreference(selectedPreferenceInfo, onSuccess, onFailure, button) {
      const setSelectedPreference = this.mealInfoAPIService.setSelectedPreference(
         selectedPreferenceInfo
      )
      return bindPromiseWithOnSuccess(setSelectedPreference)
         .to(
            status => {
               this.setUpdatedPreferenceAPIStatus(status)
               if (status === API_FETCHING) {
                  if (button === 'Skipped') {
                     this.isLoadingOnSkipped = true
                  }
                  else {
                     this.isLoadingOnSave = true
                  }
               }
            },
            response => {
               this.setUpdatedPreferenceAPIResponse(response)
               onSuccess()
            }
         )
         .catch(error => {
            this.setUpdatedPreferenceAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setUpdatedPreferenceAPIStatus(status) {
      this.updatedPreferenceAPIStatus = status
   }

   @action.bound
   setUpdatedPreferenceAPIResponse() {
      this.isLoadingOnSave = false
      this.isLoadingOnSkipped = false
   }

   @action.bound
   setUpdatedPreferenceAPIError(error) {
      this.updatedPreferenceAPIError = error
      this.isLoadingOnSave = false
      this.isLoadingOnSkipped = false
   }

   @action.bound
   setSelectedPreferenceAsCustomMeal(
      selectedPreferenceInfo,
      onSuccess,
      onFailure,
      button
   ) {
      const setSelectedPreference = this.mealInfoAPIService.setSelectedPreferenceAsCustomMeal(
         selectedPreferenceInfo
      )
      return bindPromiseWithOnSuccess(setSelectedPreference)
         .to(
            status => {
               this.setUpdatedCustomMealAPIStatus(status)
               if (status === API_FETCHING) {
                  if (button === 'Skipped') {
                     this.isLoadingOnSkipped = true
                  }
                  else {
                     this.isLoadingOnSave = true
                  }
               }
            },
            response => {
               this.setUpdatedCustomMealAPIResponse(response)
               onSuccess()
            }
         )
         .catch(error => {
            this.setUpdatedCustomMealAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setUpdatedCustomMealAPIStatus(status) {
      this.updatedCustomMealAPIStatus = status
   }

   @action.bound
   setUpdatedCustomMealAPIResponse() {
      this.isLoadingOnSave = false
      this.isLoadingOnSkipped = false
   }

   @action.bound
   setUpdatedCustomMealAPIError(error) {
      this.updatedCustomMealAPIError = error
      this.isLoadingOnSave = false
      this.isLoadingOnSkipped = false
   }

   @action.bound
   clearPreferencesInfo() {
      this.preferencesInfo = []
   }

   @action.bound
   clearMealPreferenceInfoModel() {
      this.init()
   }
}
export { MealPreference }
