import { observable, action, reaction } from 'mobx'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { MealPreference } from './models/MealPreference'
import { MealReview } from './models/MealReview'
import { setDateFormate } from '../../../Common/utils/TimeUtils'

class MealInfoStore {
   @observable mealInfoAPIStatus
   @observable mealInfoAPIError
   @observable mealInfo = []
   @observable selectedDate
   @observable selectedMealInfo = null
   @observable selectedMealInfoReview = null
   @observable mealType
   @observable userMealAPIStatus
   @observable userMealAPIError
   @observable userPreferenceAPIError
   @observable userPreferenceAPIStatus
   @observable loading1Status = API_INITIAL
   @observable loading1Error = null
   @observable loading2Status = API_INITIAL
   @observable loading2Error = null

   constructor(mealInfoAPIService) {
      this.mealInfoAPIService = mealInfoAPIService
      this.selectedDate = setDateFormate(new Date())
      this.init()
   }

   @action.bound
   init() {
      this.mealInfo = []
      this.mealInfoAPIStatus = API_INITIAL
      this.mealInfoAPIError = null
      this.selectedMealInfo = null
      this.selectedMealInfoReview = null
      this.userMealAPIStatus = API_INITIAL
      this.userMealAPIError = null
      this.userPreferenceAPIStatus = API_INITIAL
      this.userPreferenceAPIError = null
   }

   @action.bound
   onChangeDateInDashBoard(value) {
      this.selectedDate = value
   }

   @action.bound
   getMealInfoAsPerDate() {
      const mealInfoAPI = this.mealInfoAPIService.getMealInfoAPI(
         this.selectedDate
      )
      return bindPromiseWithOnSuccess(mealInfoAPI)
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
      this.clearMealInfo()
      mealInfo.map(mealTypeInfo => this.getMealTypeInfo(mealTypeInfo))
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
         isEaten: mealType.is_eaten,
         mealId: mealType.meal_id
      }
      mealTypeInfo.mealItems = mealItems
      this.mealInfo.push(mealTypeInfo)
   }

   @action.bound
   onClickEditPreference(mealType, date) {
      this.mealType = mealType
      this.selectedDate = date
      this.selectedMealInfo = new MealPreference(
         this.mealInfoAPIService,
         this.selectedDate,
         this.mealType
      )
      this.selectedMealInfo.getSelectedMealTypeInfo()
   }

   @action.bound
   onClickReviewButton(mealType) {
      this.mealType = mealType
      this.selectedMealInfoReview = new MealReview(
         this.mealInfoAPIService,
         this.selectedDate,
         mealType
      )
      this.selectedMealInfoReview.getSelectedMealTypeReviewInfo()
   }

   @action.bound
   onClickIAteIt(id, userStatus, onSuccess, onFailure) {
      this.setUserMealStatus(userStatus, id, onSuccess, onFailure)
   }

   @action.bound
   setUserMealStatus(userStatus, id, onSuccess, onFailure) {
      const userMealStatusAPI = this.mealInfoAPIService.setUserMealStatusAPI(
         userStatus,
         id
      )
      return bindPromiseWithOnSuccess(userMealStatusAPI)
         .to(this.setUserMealAPIStatus, response => {
            this.setUserMealAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setUserMealAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setUserMealAPIStatus(status) {
      this.userMealAPIStatus = status
   }

   @action.bound
   setUserMealAPIResponse(response) {}

   @action.bound
   setUserMealAPIError(error) {
      this.userMealAPIError = error
   }

   @action.bound
   onClickISkipped(mealType, onSuccess, onFailure) {
      const userPreference = {
         meal_type: mealType,
         meal_preference: 'Skipped',
         date: this.selectedDate
      }
      this.setUserPreferenceAsSkipped(userPreference, onSuccess, onFailure)
   }

   @action.bound
   setUserPreferenceAsSkipped(userPreference, onSuccess, onFailure) {
      const selectedPreference = this.mealInfoAPIService.setSelectedPreference(
         userPreference
      )
      return bindPromiseWithOnSuccess(selectedPreference)
         .to(this.setUserPreferenceAPIStatus, response => {
            this.setUserPreferenceAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setUserPreferenceAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setUserPreferenceAPIStatus(status) {
      this.userPreferenceAPIStatus = status
   }

   @action.bound
   setUserPreferenceAPIResponse() {}

   @action.bound
   setUserPreferenceAPIError(error) {
      this.userPreferenceAPIError = error
   }

   @action.bound
   clearMealInfo() {
      this.mealInfo = []
   }

   @action.bound
   clearStore() {
      this.init()
   }
   isDateChanges = reaction(
      () => this.selectedDate,
      date => {
         this.getMealInfoAsPerDate()
      }
   )
}

export { MealInfoStore }
