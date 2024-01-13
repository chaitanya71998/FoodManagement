import headCountInfo from '../../fixtures/headCountInfo.json'
import MealInfoService from ".."
import { SelectedMealTypeheadCount } from "../../stores/types.js"
class MealInfoAPIServiceFixture implements MealInfoService {

   getHeadCountInfoAPI(date:String,mealType:String):Promise<SelectedMealTypeheadCount> {
      return new Promise((resolve) => {
         resolve(headCountInfo)
      })
   }
}

export default MealInfoAPIServiceFixture
