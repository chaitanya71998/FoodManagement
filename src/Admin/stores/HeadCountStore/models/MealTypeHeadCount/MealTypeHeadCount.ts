import { observable, action } from 'mobx'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { MealInfoAPIService } from "../../../../services/MealInfoAPIService"
class MealTypeHeadCount {
   @observable headCountAPIStatus:number=API_INITIAL
   @observable headCountAPIError:null | string=null
   @observable selectedDate:string
   @observable mealType:string
   @observable mealInfo:Array<Object>=[]
   @observable headCountInfo
   @observable mealInfoAPIService:MealInfoAPIService
   constructor(mealInfoAPIService, date, mealType) {
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
   setHeadCountAPIStatus(status) {
      this.headCountAPIStatus = status
   }

   @action.bound
   setHeadCountAPIResponse(response) {
      this.headCountInfo = response
   }

   @action.bound
   setHeadCountAPIError(error) {
      this.headCountAPIError = error
   }
}

export { MealTypeHeadCount }
