import { observable, action } from 'mobx'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED,
   APIStatus
} from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { MealInfoAPIService } from "../../../../services/MealInfoAPIService"
import { SelectedMealTypeheadCount } from "../../../types"
import MealInfoService from "../../../../services"
class MealTypeHeadCount {
   @observable headCountAPIStatus!:APIStatus
   @observable headCountAPIError!:Error | null
   @observable selectedDate:string
   @observable mealType:string
   @observable mealInfo!:Array<Object>
   @observable headCountInfo
   mealInfoAPIService:MealInfoService
   constructor(mealInfoAPIService:MealInfoService, date, mealType) {
      this.mealInfoAPIService = mealInfoAPIService
      this.selectedDate = date
      this.mealType = mealType
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
         .catch(this.setHeadCountAPIError)
   }

   @action.bound
   setHeadCountAPIStatus(status:APIStatus) {
      this.headCountAPIStatus = status
   }

   @action.bound
   setHeadCountAPIResponse(response:SelectedMealTypeheadCount | null) {
      this.headCountInfo = response
   }

   @action.bound
   setHeadCountAPIError(error:Error) {
      this.headCountAPIError = error
   }
}

export { MealTypeHeadCount }
