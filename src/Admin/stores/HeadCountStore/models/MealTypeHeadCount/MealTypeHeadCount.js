import { observable, action } from 'mobx'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
}
from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
class MealTypeHeadCount {
   @observable headCountAPIStatus
   @observable headCountAPIError
   @observable selectedDate
   @observable mealType
   @observable headCountInfo
   constructor(mealInfoAPIService, mealType, date) {
      this.mealInfoAPIService = mealInfoAPIService
      this.selectedDate = mealType;
      this.mealType = date
      this.init()
   }

   @action.bound
   init() {
      this.mealInfo = []
      this.headCountAPIStatus = API_INITIAL
      this.headCountAPIError = null
      this.mealType = 'Breakfast'
   }

   @action.bound
   getHeadCountInfo() {
      const headCountInfoAPI = this.mealInfoAPIService.getHeadCountInfoAPI(
         this.selectedDate,
         this.mealType
      )
      return bindPromiseWithOnSuccess(headCountInfoAPI)
         .to(this.setHeadCountAPIStatus, this.setHeadCountAPIResponse)
         .catch(this.setheadCountAPIError)
   }

   @action.bound
   setHeadCountAPIStatus(status) {
      this.headCountAPIStatus = status
   }

   @action.bound
   setHeadCountAPIResponse(response) {
      console.log('response', response)
      this.headCountInfo = response
   }

   @action.bound
   setHeadCountAPIError(error) {
      this.headCountAPIError = error
   }
}

export { MealTypeHeadCount }
