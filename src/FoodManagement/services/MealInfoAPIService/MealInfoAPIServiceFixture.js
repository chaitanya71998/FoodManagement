import mealInfo from '../../fixtures/MealInfo.json'
import mealPreferenceInfo from '../../fixtures/PreferncePageInfo'
class MealInfoAPIServiceFixture {
   getMealInfoAPI(date) {
      return new Promise((resolve, reject) => {
         resolve(mealInfo)
      })
   }
   getmealPreferenceInfoAPI(date, mealType) {
      return new Promise((resolve, reject) => {
         resolve(mealPreferenceInfo)
      })
   }

   setSelectedPreferenceAsFullOrHalfMeal(selectedPreferenceInfo) {
      return new Promise((resolve, reject) => {
         resolve('Successfully Updated')
      })
   }

   setSelectedPreferenceAsCustomMeal(selectedPreferenceInfo) {
      return new Promise((resolve, reject) => {
         resolve('Successfully Updated')
      })
   }
}

export default MealInfoAPIServiceFixture
