import { observable, action } from 'mobx'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
}
from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { MealInfoModel } from './model/MealInfoModel'
import { MealPreferenceModel } from './model/MealPreferenceModel'

class MealInfoStore {
   @observable getMealInfoAPIStatus
   @observable getMealInfoAPIError
   @observable mealInfo = []
   @observable date
   @observable mealType
   @observable getmealPreferenceInfoAPIStatus
   @observable getmealPreferenceInfoAPIError
   @observable selectedMealInfo = []
   @observable selectedPreference = null
   @observable getUpdatedPreferenceFullOrHalfMealAPIStatus
   @observable getUpdatedPreferenceFullOrHalfMealAPIError
   @observable getUpdatedPreferenceCustomMealAPIStatus
   @observable getUpdatedPreferenceCustomMealAPIError

   constructor(mealInfoAPIService) {
      this.mealInfoAPIService = mealInfoAPIService
      this.init()
      this.setDateFormate()
   }

   @action.bound
   setDateFormate() {
      let date = new Date(),
         month = '' + (date.getMonth() + 1),
         day = '' + date.getDate(),
         year = date.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      this.date = [year, month, day].join('-')
   }

   init() {
      this.mealInfo = []
      this.selectedMealInfo = []
      this.getMealInfoAPIStatus = API_INITIAL
      this.getMealInfoAPIError = null
      this.selectedPreference = null
      this.getmealPreferenceInfoAPIStatus = API_INITIAL
      this.getmealPreferenceInfoAPIError = null
      this.getUpdatedPreferenceFullOrHalfMealAPIStatus = API_INITIAL
      this.getUpdatedPreferenceCustomMealAPIStatus = API_INITIAL
      this.getUpdatedPreferenceFullOrHalfMealAPIError = null
      this.getUpdatedPreferenceCustomMealAPIError = null
   }

   @action.bound
   onChangeDateInDashBoard(event) {
      this.date = event.target.value
      this.clearStore()
      this.getMealInfoAsPerDate()
   }

   @action.bound
   onChangeDateInPreferenceCard(event) {
      this.date = event.target.value
      this.clearStore()
      this.getmealPreferenceInfo(this.mealType)
   }

   @action.bound
   getMealInfoAsPerDate() {
      const MealInfoAPI = this.mealInfoAPIService.getMealInfoAPI(this.date)
      return bindPromiseWithOnSuccess(MealInfoAPI)
         .to(this.setGetMealInfoAPIStatus, this.setGetMealInfoResponse)
         .catch(this.setGetMealInfoAPIError)
   }

   @action.bound
   setGetMealInfoAPIStatus(apiStatus) {
      this.getMealInfoAPIStatus = apiStatus
   }

   @action.bound
   setGetMealInfoResponse(response) {
      const mealInfo = response
      mealInfo.map(perticularMealInfo =>
         this.getPerticularMealInfo(perticularMealInfo)
      )
   }

   @action.bound
   setGetMealInfoAPIError(error) {
      console.log("error", error)
      this.getMealInfoAPIError = error
   }

   @action.bound
   getPerticularMealInfo(perticularMealInfo) {
      const PerticularMealInfo = {
         mealType: perticularMealInfo.meal_type,
         mealItems: perticularMealInfo.meal_items,
         mealPreference: perticularMealInfo.meal_preference,
         mealPreferenceDeadline: perticularMealInfo.meal_preference_deadline,
         mealStarttime: perticularMealInfo.meal_starttime,
         mealEndtime: perticularMealInfo.meal_endtime
      }

      const mealInfoModel = new MealInfoModel(PerticularMealInfo)
      this.mealInfo.push(mealInfoModel)
   }

   @action.bound
   getmealPreferenceInfo(mealType) {
      this.mealType = mealType
      const mealPreferenceInfoAPI = this.mealInfoAPIService.getmealPreferenceInfoAPI(
         this.date,
         mealType
      )
      return bindPromiseWithOnSuccess(mealPreferenceInfoAPI)
         .to(
            this.setGetmealPreferenceInfoStatus,
            this.setGetmealPreferenceInfoResponse
         )
         .catch(this.setGetmealPreferenceInfoError)
   }

   @action.bound
   setGetmealPreferenceInfoStatus(status) {
      this.getmealPreferenceInfoAPIStatus = status
   }

   @action.bound
   setGetmealPreferenceInfoError(error) {
      this.getmealPreferenceInfoAPIError = error
   }

   @action.bound
   setGetmealPreferenceInfoResponse(response) {
      const mealPreferenceInfo = response
      mealPreferenceInfo.map(mealPreference =>
         this.getSelectedMealInfo(mealPreference)
      )
   }

   @action.bound
   getSelectedMealInfo(mealPreference) {
      const PerticularMealPreference = {
         mealPreference: mealPreference.meal_preference,
         mealItems: mealPreference.meal_items
      }
      const mealPreferenceModel = new MealPreferenceModel(
         PerticularMealPreference
      )
      this.selectedMealInfo.push(mealPreferenceModel)
   }

   @action.bound
   onSaveMealPreference(onSuccess, onFailure) {
      const mealItemsInfo = [...this.selectedMealInfo[0].mealItems]
      let selectedPreferenceInfo = {}
      if (
         this.selectedPreference === 'Full meal' ||
         this.selectedPreference === 'Half meal'
      ) {
         selectedPreferenceInfo.meal_type = this.mealType
         selectedPreferenceInfo.meal_preference = this.selectedPreference
         selectedPreferenceInfo.date = this.date
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
         selectedPreferenceInfo.date = this.date
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
         .to(this.setGetUpdatedPreferenceFullOrHalfMealAPIStatus, response => {
            this.setGetUpdatedPreferenceFullOrHalfMealAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setGetUpdatedPreferenceFullOrHalfMealAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setGetUpdatedPreferenceFullOrHalfMealAPIStatus(status) {
      this.getUpdatedPreferenceFullOrHalfMealAPIStatus = status
   }

   @action.bound
   setGetUpdatedPreferenceFullOrHalfMealAPIResponse() {}

   @action.bound
   setGetUpdatedPreferenceFullOrHalfMealAPIError(error) {
      this.getUpdatedPreferenceFullOrHalfMealAPIError = error
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
         .to(this.setGetUpdatedPreferenceCustomMealAPIStatus, response => {
            this.setGetUpdatedPreferenceCustomMealAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setGetUpdatedPreferenceCustomMealAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setGetUpdatedPreferenceCustomMealAPIStatus(status) {
      this.getUpdatedPreferenceCustomMealAPIStatus = status
   }

   @action.bound
   setGetUpdatedPreferenceCustomMealAPIResponse() {}

   @action.bound
   setGetUpdatedPreferenceCustomMealAPIError(error) {
      this.getUpdatedPreferenceCustomMealAPIError = error
   }

   @action.bound
   getSelectedPreference(preference) {
      this.selectedPreference = preference
   }

   @action.bound
   clearStore() {
      this.init()
   }
}

export { MealInfoStore }
