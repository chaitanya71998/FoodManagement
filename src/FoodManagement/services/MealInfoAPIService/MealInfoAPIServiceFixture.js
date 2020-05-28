import mealInfo from '../../fixtures/MealInfo.json'
import PreferncePageInfo from '../../fixtures/PreferncePageInfo'
class MealInfoAPIServiceFixture {
    getMealInfoAPI(date) {
        return new Promise((resolve, reject) => {
            resolve(mealInfo)
        })
    }
    getPreferencePageInfo(date, mealType) {
        return new Promise((resolve, reject) => {
            resolve(PreferncePageInfo)
        })
    }

}

export default MealInfoAPIServiceFixture
