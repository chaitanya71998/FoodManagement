import mealInfo from '../../fixtures/mealInfo.json'
import mealPreferenceInfo from '../../fixtures/preferncePageInfo'
import reviewInfo from '../../fixtures/reviewInfo'
class MealInfoAPIServiceFixture {
   getMealInfoAPI(date) {
      return new Promise((resolve, reject) => {
         setTimeout(function() { resolve(mealInfo) }, 1000);
      })
   }
   getmealTypeInfoAPI(date, mealType) {
      return new Promise((resolve, reject) => {
         setTimeout(function() { resolve(mealPreferenceInfo) }, 1000);
      })
   }

   setSelectedPreference(selectedPreferenceInfo) {
      return new Promise((resolve, reject) => {
         setTimeout(function() { resolve('Successfully Updated') }, 1000);
      })
   }

   setSelectedPreferenceAsCustomMeal(selectedPreferenceInfo) {
      return new Promise((resolve, reject) => {
         setTimeout(function() { resolve('Successfully Updated') }, 1000);
      })
   }

   getmealTypeReviewInfoAPI(date, mealType) {
      return new Promise(resolve => {
         setTimeout(function() { resolve(reviewInfo) }, 1000);
      })
   }

   setReviewInfo(reviewInfo) {
      return new Promise(resolve => {
         setTimeout(function() { resolve('updated') }, 1000);
      })
   }

   setUserMealStatusAPI(isEaten, id) {
      return new Promise(resolve => {
         setTimeout(function() { resolve('updated') }, 1000);
      })
   }
}

export default MealInfoAPIServiceFixture
