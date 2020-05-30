import { observable, action } from 'mobx'
import { MealItemModel } from '../MealItemModel'

class MealPreferenceModel {
   @observable mealItems = []
   constructor(PerticularMealPreference) {
      this.mealPreferenceId = Math.random().toString()
      this.mealPreference = PerticularMealPreference.mealPreference
      this.getItemsInfo(PerticularMealPreference.mealItems)
   }
   @action.bound
   getItemsInfo(items) {
      const mealItems = items
      mealItems.map(mealItem => {
         this.getSelectedItemInfo(mealItem)
      })
   }

   @action.bound
   getSelectedItemInfo(item) {
      const mealItem = {
         mealItemId: item.meal_item_id,
         itemName: item.item_name,
         servingSizeUnit: item.serving_size_unit,
         category: item.category,
         quantity: item.quantity
      }

      const mealItemModel = new MealItemModel(mealItem)
      this.mealItems.push(mealItemModel)
   }
}

export { MealPreferenceModel }
