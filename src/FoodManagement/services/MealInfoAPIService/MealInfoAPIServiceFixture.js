import mealInfo from '../../fixtures/mealInfo.json'
import mealPreferenceInfo from '../../fixtures/preferncePageInfo'
import reviewInfo from '../../fixtures/reviewInfo'
import listOfItems from '../../fixtures/listOfItems'
class MealInfoAPIServiceFixture {
   getMealInfoAPI(date) {
      return new Promise((resolve, reject) => {
         setTimeout(function() {
            resolve(mealInfo)
         }, 1000)
      })
   }
   getmealTypeInfoAPI(date, mealType) {
      return new Promise((resolve, reject) => {
         setTimeout(function() {
            resolve(mealPreferenceInfo)
         }, 1000)
      })
   }

   setSelectedPreference(selectedPreferenceInfo) {
      return new Promise((resolve, reject) => {
         setTimeout(function() {
            resolve('Successfully Updated')
         }, 1000)
      })
   }

   setSelectedPreferenceAsCustomMeal(selectedPreferenceInfo) {
      return new Promise((resolve, reject) => {
         setTimeout(function() {
            resolve('Successfully Updated')
         }, 1000)
      })
   }

   getmealTypeReviewInfoAPI(date, mealType) {
      return new Promise(resolve => {
         setTimeout(function() {
            resolve(reviewInfo)
         }, 1000)
      })
   }

   setReviewInfo(reviewInfo) {
      return new Promise(resolve => {
         setTimeout(function() {
            resolve('updated')
         }, 1000)
      })
   }

   setUserMealStatusAPI(isEaten, id) {
      return new Promise(resolve => {
         setTimeout(function() {
            resolve('updated')
         }, 1000)
      })
   }

   getItems(requestObject) {
      console.log("requestObject", requestObject)
      return new Promise(resolve =>
         setTimeout(
            () =>
            resolve({
               list_of_projects: listOfItems[
                     'list_of_projects'
                  ]
                  .slice()
                  .splice(requestObject.offset, requestObject.limit),
               number_of_projects: listOfItems['number_of_projects']
            }),
            2000
         )
      )
   }
}

export default MealInfoAPIServiceFixture
