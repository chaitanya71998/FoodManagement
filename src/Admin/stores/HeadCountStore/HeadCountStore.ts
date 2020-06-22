import { observable, action } from 'mobx'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'
import { setDateFormate } from '../../../Common/utils/TimeUtils'
import { MealTypeHeadCount } from './models/MealTypeHeadCount'
import { MealInfoAPIService } from "../../services/MealInfoAPIService"


class HeadCountStore {
   @observable selectedDate:string
   @observable selectedMealType:string="Breakfast"
   @observable selectedMealTypeheadCount:MealTypeHeadCount| any ={} //TODO
   mealInfoAPIService:MealInfoAPIService
   constructor(mealInfoAPIService:MealInfoAPIService) {
      this.mealInfoAPIService = mealInfoAPIService
      this.init()
      this.selectedDate = setDateFormate(new Date())
   }

   @action.bound
   onChangeDate(value) {
      this.selectedDate = value
   }

   @action.bound
   onChangeMealTypeTab(mealType) {
      this.selectedMealType = mealType
   }

   @action.bound
   getSelectedMealTypeHeadCount() {
      this.selectedMealTypeheadCount = new MealTypeHeadCount(
         this.mealInfoAPIService,
         this.selectedDate,
         this.selectedMealType
      )
      this.selectedMealTypeheadCount.getHeadCountInfo()
   }

   @action.bound
   init() {
      this.selectedMealType = 'Breakfast'
      this.selectedMealTypeheadCount = null
   }

   @action.bound
   clearHeadCountStore() {
      this.init()
   }
}

export { HeadCountStore }
