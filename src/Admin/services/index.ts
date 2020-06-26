import {SelectedMealTypeheadCount} from '../stores/types'
interface MealInfoService{
    getHeadCountInfoAPI:(date:string,mealType:string)=>Promise<SelectedMealTypeheadCount>
}

export default MealInfoService