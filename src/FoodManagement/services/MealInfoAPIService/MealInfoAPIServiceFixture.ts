import { resolveWithTimeout } from '../../../Common/utils/TestUtils'
import mealInfo from '../../fixtures/mealInfo.json'
import mealPreferenceInfo from '../../fixtures/preferncePageInfo.json'
import reviewInfo from '../../fixtures/reviewInfo.json'
import MealInfoService from '../index'

class MealInfoAPIServiceFixture implements MealInfoService {
   getMealInfoAPI(date: string) {
      return resolveWithTimeout(mealInfo)
   }
   getmealTypeInfoAPI(date: String, mealType: string) {
      return resolveWithTimeout(mealPreferenceInfo)
   }

   setSelectedPreference(selectedPreferenceInfo) {
      return resolveWithTimeout({})
   }

   setSelectedPreferenceAsCustomMeal(selectedPreferenceInfo) {
      return resolveWithTimeout({})
   }

   getmealTypeReviewInfoAPI(date, mealType) {
      return resolveWithTimeout(reviewInfo)
   }

   setReviewInfo(reviewInfo) {
      return resolveWithTimeout({})
   }

   setUserMealStatusAPI(isEaten, id) {
      return resolveWithTimeout({})
   }

   // getItems(requestObject) {
   //    console.log('requestObject', requestObject)
   //    return new Promise(resolve =>
   //       setTimeout(
   //          () =>
   //             resolve({
   //                list_of_projects: listOfItems['list_of_projects']
   //                   .slice()
   //                   .splice(requestObject.offset, requestObject.limit),
   //                number_of_projects: listOfItems['number_of_projects']
   //             }),
   //          2000
   //       )
   //    )
   // }
}

export default MealInfoAPIServiceFixture
