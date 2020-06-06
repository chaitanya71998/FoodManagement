import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import headCountInfo from '../../fixtures/headCountInfo'
class MealInfoAPIServiceFixture {
   constructor() {
      this.api = create({
         //baseURL: 'https://5ea1a14db9f5ca00166c1f27.mockapi.io/api/'
         baseURL: 'https://e36f2278a8e8.ngrok.io/api/food_management'
      })
   }

   getHeadCountInfoAPI(date, mealType) {
      console.log("date", date)
      return networkCallWithApisauce(
         this.api,
         `/admin/meal/head_count/v1/?date=${date}&meal_type=${mealType}`, {},
         apiMethods.get
      )
   }
}

export default MealInfoAPIServiceFixture
