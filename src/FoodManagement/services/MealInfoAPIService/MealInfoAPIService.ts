import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../constants/APIConstants'
import MealInfoService from '..'
class MealInfoAPIService implements MealInfoService {
   api:Record<string,any>
   constructor() {
      this.api = create({
         //baseURL: 'https://5ea1a14db9f5ca00166c1f27.mockapi.io/api/'
         baseURL: 'https://2fb6723c4661.ngrok.io/api/food_management'
      })
   }

   getMealInfoAPI(date) {
      return networkCallWithApisauce(
         this.api,
         `/meal_info/v1/?date=${date}`,
         {},
         apiMethods.get
      )
   }
   getmealTypeInfoAPI(date, mealType) {
      return networkCallWithApisauce(
         this.api,
         `/my_meal/v1/?date=${date}&meal_type=${mealType}`,
         {},
         apiMethods.get
      )
   }

   setSelectedPreference(selectedPreferenceInfo) {
      return networkCallWithApisauce(
         this.api,
         `/my_meal/v1/`,
         selectedPreferenceInfo,
         apiMethods.post
      )
   }

   setSelectedPreferenceAsCustomMeal(selectedPreferenceInfo) {
      return networkCallWithApisauce(
         this.api,
         `/my_meal/custom/v1/`,
         selectedPreferenceInfo,
         apiMethods.post
      )
   }

   getmealTypeReviewInfoAPI(date, mealType) {
      return networkCallWithApisauce(
         this.api,
         `/meal/feedback/v1/?date=${date}&meal_type=${mealType}`,
         {},
         apiMethods.get
      )
   }
   setReviewInfo(reviewInfo) {
      return networkCallWithApisauce(
         this.api,
         `/meal/feedback/v1/`,
         reviewInfo,
         apiMethods.post
      )
   }

   setUserMealStatusAPI(isEaten, id) {
      return networkCallWithApisauce(
         this.api,
         `/${id}/${isEaten}/v1/`,
         {},
         apiMethods.post
      )
   }
}

export default MealInfoAPIService
