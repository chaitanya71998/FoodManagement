import headCountInfo from '../../fixtures/headCountInfo.json'
class MealInfoAPIServiceFixture {
   getHeadCountInfoAPI(date) {
      return new Promise((resolve, reject) => {
         resolve(headCountInfo)
      })
   }
}

export default MealInfoAPIServiceFixture
