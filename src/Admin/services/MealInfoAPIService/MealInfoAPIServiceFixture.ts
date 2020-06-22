import headCountInfo from '../../fixtures/headCountInfo.json'
class MealInfoAPIServiceFixture {
   getHeadCountInfoAPI(date,mealType) {
      return new Promise((resolve, reject) => {
         resolve(headCountInfo)
      })
   }
}

export default MealInfoAPIServiceFixture
