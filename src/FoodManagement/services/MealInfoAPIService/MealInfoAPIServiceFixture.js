import mealInfo from '../../fixtures/MealInfo.json'
import mealPreferenceInfo from '../../fixtures/PreferncePageInfo'
class MealInfoAPIServiceFixture {
   getMealInfoAPI(date) {
      console.log("date", date)
      return new Promise((resolve, reject) => {
         resolve(mealInfo)
      })
   }
   getmealTypeInfoAPI(date, mealType) {
      console.log("getmealTypeInfoAPI", date, mealType)
      return new Promise((resolve, reject) => {
         resolve(mealPreferenceInfo)
      })
   }

   setSelectedPreferenceAsFullOrHalfMeal(selectedPreferenceInfo) {
      console.log("setSelectedPreferenceAsFullOrHalfMeal", selectedPreferenceInfo)
      return new Promise((resolve, reject) => {
         resolve('Successfully Updated')
      })
   }

   setSelectedPreferenceAsCustomMeal(selectedPreferenceInfo) {
      console.log("setSelectedPreferenceAsCustomMeal", selectedPreferenceInfo)
      return new Promise((resolve, reject) => {
         resolve('Successfully Updated')
      })
   }
}

export default MealInfoAPIServiceFixture
