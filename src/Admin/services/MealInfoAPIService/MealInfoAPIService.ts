import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import MealInfoService from ".."

class MealInfoAPIService implements MealInfoService {
   api:Record<string,any>
   constructor() {
      this.api = create({
         //baseURL: 'https://5ea1a14db9f5ca00166c1f27.mockapi.io/api/'
         baseURL: 'https://2fb6723c4661.ngrok.io/api/food_management'
      })
   }

   getHeadCountInfoAPI(date, mealType) {
      return networkCallWithApisauce(
         this.api,
         `/admin/meal/head_count/v1/?date=${date}&meal_type=${mealType}`,
         {},
         apiMethods.get
      )
   }
}

export default MealInfoAPIService
