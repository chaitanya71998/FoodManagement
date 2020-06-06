import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { ItemReviewInfo } from '../ItemReviewInfo'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'
class MealReview {
   @observable mealType
   @observable selectedMealTypeReviewInfoAPIStatus
   @observable selectedMealTypeReviewInfoAPIError
   @observable updatedReviewAPIStatus
   @observable updatedReviewAPIError
   @observable mealTypeReview = {}
   @observable isLoadingOnDone

   constructor(mealInfoAPIService, selectedDate, mealType) {
      this.mealInfoAPIService = mealInfoAPIService
      this.selectedDate = selectedDate
      this.mealType = mealType
      this.init()
   }

   init() {
      this.selectedMealTypeReviewInfoAPIStatus = API_INITIAL
      this.selectedMealTypeReviewInfoAPIError = null
      this.mealTypeReview = {}
      this.isLoadingOnDone = false
   }

   @action.bound
   getSelectedMealTypeReviewInfo() {
      this.clearMealTypeReview()
      const mealTypeReviewInfoAPI = this.mealInfoAPIService.getmealTypeReviewInfoAPI(
         this.selectedDate,
         this.mealType
      )
      return bindPromiseWithOnSuccess(mealTypeReviewInfoAPI)
         .to(
            this.setSelectedMealTypeReviewInfoAPIStatus,
            this.setSelectedMealTypeReviewInfoAPIResponse
         )
         .catch(this.setSelectedMealTypeReviewInfoAPIError)
   }

   @action.bound
   setSelectedMealTypeReviewInfoAPIStatus(status) {
      console.log('status', status)
      this.selectedMealTypeReviewInfoAPIStatus = status
   }

   @action.bound
   setSelectedMealTypeReviewInfoAPIError(error) {
      this.selectedMealTypeReviewInfoAPIError = error
   }

   @action.bound
   setSelectedMealTypeReviewInfoAPIResponse(response) {
      const mealItems = []
      this.mealTypeReview.mealId = response.meal_id
      this.mealTypeReview.mealReview = response.meal_review
      response.meal_items.map(item => {
         const itemReviewInfo = new ItemReviewInfo(item)
         mealItems.push(itemReviewInfo)
      })
      this.mealTypeReview.mealItems = [...mealItems]
   }

   @action.bound
   onChangeReviewOfMealType(review) {
      this.mealTypeReview.mealReview = review
   }

   @action.bound
   onSaveMealReview(onSuccess, onFailure) {
      let reviewInfo = {
         meal_id: this.mealTypeReview.mealId,
         meal_review: this.mealTypeReview.mealReview,
         meal_items_rating: []
      }
      this.mealTypeReview.mealItems.forEach(itemReview => {
         let review = {
            meal_item_id: itemReview.mealItemId,
            quality: itemReview.quality,
            taste: itemReview.taste
         }
         reviewInfo.meal_items_rating.push(review)
      })
      this.setMealReview(reviewInfo, onSuccess, onFailure)
   }

   @action.bound
   setMealReview(reviewInfo, onSuccess, onFailure) {
      const setReviewInfo = this.mealInfoAPIService.setReviewInfo(reviewInfo)
      return bindPromiseWithOnSuccess(setReviewInfo)
         .to(
            status => {
               this.setUpdatedReviewAPIStatus(status)
               if (status === API_FETCHING) {
                  this.isLoadingOnDone = true
               }
            },
            response => {
               this.setUpdatedReviewAPIResponse(response)
               onSuccess()
            }
         )
         .catch(error => {
            this.setUpdatedReviewAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setUpdatedReviewAPIStatus(status) {
      this.updatedReviewAPIStatus = status
   }

   @action.bound
   setUpdatedReviewAPIResponse(response) {
      this.isLoadingOnDone = false
   }

   @action.bound
   setUpdatedReviewAPIError(error) {
      this.isLoadingOnDone = false
      this.updatedReviewAPIError = error
   }

   @action.bound
   clearMealTypeReview() {
      this.mealTypeReview = {}
   }
   @action.bound
   clearMealReviewModel() {
      this.init()
   }
}
export { MealReview }
