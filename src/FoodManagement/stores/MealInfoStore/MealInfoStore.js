import { observable, action } from 'mobx'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
}
from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { MealPreference } from './model/MealPreference'

class MealInfoStore {
   @observable mealInfoAPIStatus
   @observable mealInfoAPIError
   @observable mealInfo = []
   @observable selectedDate
   @observable selectedMealInfo = null
   @observable mealType

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

      this.selectedDate = [year, month, day].join('-')
   }

   init() {
      this.mealInfo = []
      this.mealInfoAPIStatus = API_INITIAL
      this.mealInfoAPIError = null
   }

   @action.bound
   onChangeDateInDashBoard(event) {
      this.selectedDate = event.target.value
      this.clearMealInfo()
      this.getMealInfoAsPerDate()
   }


   @action.bound
   onChangeDateInPreferenceCard(event) {
      this.selectedDate = event.target.value
      this.selectedMealInfo.getSelectedMealTypeInfo(this.mealType)
   }


   @action.bound
   getMealInfoAsPerDate() {
      const MealInfoAPI = this.mealInfoAPIService.getMealInfoAPI(this.selectedDate)
      return bindPromiseWithOnSuccess(MealInfoAPI)
         .to(this.setMealInfoAPIStatus, this.setMealInfoResponse)
         .catch(this.setMealInfoAPIError)
   }

   @action.bound
   setMealInfoAPIStatus(apiStatus) {
      this.mealInfoAPIStatus = apiStatus
   }

   @action.bound
   setMealInfoResponse(response) {
      const mealInfo = response
      mealInfo.map(mealTypeInfo =>
         this.getMealTypeInfo(mealTypeInfo)
      )
   }

   @action.bound
   setMealInfoAPIError(error) {
      this.mealInfoAPIError = error
   }

   @action.bound
   getMealTypeInfo(mealType) {
      let mealItems = []
      let mealTypeInfo = {
         mealType: mealType.meal_type,
         mealPreference: mealType.meal_preference,
         mealPreferenceDeadline: mealType.meal_preference_deadline,
         mealStarttime: mealType.meal_starttime,
         mealEndtime: mealType.meal_endtime,
         mealItems: mealType.meal_items.map(mealItem => {
            const item = {
               mealItemId: mealItem.meal_item_id,
               itemName: mealItem.item_name
            }
            mealItems.push(item)
         }),
         isEaten: mealType.is_eaten
      }
      mealTypeInfo.mealItems = mealItems
      this.mealInfo.push(mealTypeInfo)
   }

   @action.bound
   onClickEditPreference(mealType) {
      this.mealType = mealType
      this.selectedMealInfo = new MealPreference(this.mealInfoAPIService, this.selectedDate)
      this.selectedMealInfo.getSelectedMealTypeInfo(mealType)
   }


   @action.bound
   clearMealInfo() {
      this.mealInfo = []
   }

   @action.bound
   clearStore() {
      this.init()
   }
}

export { MealInfoStore }
