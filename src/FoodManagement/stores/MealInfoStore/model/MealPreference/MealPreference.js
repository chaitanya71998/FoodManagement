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
   @observable updatedPreferenceFullOrHalfMealAPIStatus
   @observable updatedPreferenceFullOrHalfMealAPIError
   @observable updatedPreferenceCustomMealAPIStatus
   @observable updatedPreferenceCustomMealAPIError
   @observable mealType

   constructor(mealInfoAPIService, selectedDate) {
      this.mealInfoAPIService = mealInfoAPIService
      this.selectedDate = selectedDate
      this.init()
   }


   init() {
      this.selectedMealTypeInfoAPIStatus = API_INITIAL
      this.selectedMealTypeAPIInfoError = null
      this.updatedPreferenceFullOrHalfMealAPIStatus = API_INITIAL
      this.updatedPreferenceFullOrHalfMealAPIError = null
      this.updatedPreferenceCustomMealAPIStatus = API_INITIAL
      this.updatedPreferenceCustomMealAPIError = null
   }

   @action.bound
   getSelectedMealTypeInfo(mealType) {
      console.log("type")
      this.clearPreferencesInfo()
      this.mealType = mealType
      //this.selectedPreference = preference
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
   setSelectedMealTypeInfoAPIStatus(status) {
      this.selectedMealTypeInfoAPIStatus = status
   }

   @action.bound
   setSelectedMealTypeAPIInfoError(error) {
      console.log("error", error)
      this.selectedMealTypeAPIInfoError = error
   }

   @action.bound
   setSelectedMealTypeInfoAPIResponse(response) {
      response.map(preference => {
         let mealItems = [];
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
   onSaveMealPreference(onSuccess, onFailure) {
      const mealItemsInfo = [...this.preferencesInfo[2].mealItems]
      let selectedPreferenceInfo = {}
      if (
         this.selectedPreference === 'Full meal' ||
         this.selectedPreference === 'Half meal'
      ) {
         selectedPreferenceInfo.meal_type = this.mealType
         selectedPreferenceInfo.meal_preference = this.selectedPreference
         selectedPreferenceInfo.date = this.selectedDate
         this.setSelectedPreferenceAsFullOrHalfMeal(
            selectedPreferenceInfo,
            onSuccess,
            onFailure
         )
      }
      else {
         selectedPreferenceInfo.meal_type = this.mealType
         selectedPreferenceInfo.meal_items = []
         mealItemsInfo.forEach(itemInfo => {
            let item = {
               meal_item_id: itemInfo.mealItemId,
               quantity: itemInfo.quantity,
               serving_size_unit: itemInfo.servingSizeUnit
            }
            selectedPreferenceInfo.meal_items.push(item)
         })
         selectedPreferenceInfo.date = this.selectedDate
         this.setSelectedPreferenceAsCustomMeal(
            selectedPreferenceInfo,
            onSuccess,
            onFailure
         )
      }
   }



   @action.bound
   setSelectedPreferenceAsFullOrHalfMeal(
      selectedPreferenceInfo,
      onSuccess,
      onFailure
   ) {
      const setSelectedPreference = this.mealInfoAPIService.setSelectedPreferenceAsFullOrHalfMeal(
         selectedPreferenceInfo
      )
      return bindPromiseWithOnSuccess(setSelectedPreference)
         .to(this.setUpdatedPreferenceFullOrHalfMealAPIStatus, response => {
            this.setUpdatedPreferenceFullOrHalfMealAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setUpdatedPreferenceFullOrHalfMealAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setUpdatedPreferenceFullOrHalfMealAPIStatus(status) {
      this.updatedPreferenceFullOrHalfMealAPIStatus = status
   }

   @action.bound
   setUpdatedPreferenceFullOrHalfMealAPIResponse() {}

   @action.bound
   setUpdatedPreferenceFullOrHalfMealAPIError(error) {
      this.updatedPreferenceFullOrHalfMealAPIError = error
   }

   @action.bound
   setSelectedPreferenceAsCustomMeal(
      selectedPreferenceInfo,
      onSuccess,
      onFailure
   ) {
      const setSelectedPreference = this.mealInfoAPIService.setSelectedPreferenceAsCustomMeal(
         selectedPreferenceInfo
      )
      return bindPromiseWithOnSuccess(setSelectedPreference)
         .to(this.setUpdatedPreferenceCustomMealAPIStatus, response => {
            this.setUpdatedPreferenceCustomMealAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setUpdatedPreferenceCustomMealAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setUpdatedPreferenceCustomMealAPIStatus(status) {
      this.updatedPreferenceCustomMealAPIStatus = status
   }

   @action.bound
   setUpdatedPreferenceCustomMealAPIResponse() {}

   @action.bound
   setUpdatedPreferenceCustomMealAPIError(error) {
      this.updatedPreferenceCustomMealAPIError = error
   }

   @action.bound
   clearPreferencesInfo() {
      this.preferencesInfo = []
   }
}
export { MealPreference }
