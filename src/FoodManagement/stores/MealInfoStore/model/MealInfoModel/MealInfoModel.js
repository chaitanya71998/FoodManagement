import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
class MealInfoModel {
    constructor(perticularMealInfo) {
        this.mealType = perticularMealInfo.mealType,
            this.mealItems = perticularMealInfo.mealItems,
            this.mealPreference = perticularMealInfo.mealPreference,
            this.mealPreference_deadline = perticularMealInfo.mealPreferenceDeadline,
            this.mealStarttime = perticularMealInfo.mealStarttime,
            this.mealEndtime = perticularMealInfo.mealEndtime
        this.init()
    }

    @action
    init() {
        let mealItems = this.mealItems.map((item) => { item.quantity = null, item.servingSizeUnit = null })
    }

}


export { MealInfoModel };
