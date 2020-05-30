import { observable, action } from 'mobx'
import { CardItemInfoModel } from '../CardItemInfoModel'
class MealInfoModel {
   @observable mealItems = []
   mealType
   mealPreference
   mealPreferenceDeadline
   mealStarttime
   mealEndtime
   constructor(perticularMealInfo) {
      this.mealType = perticularMealInfo.mealType,
         this.mealPreference = perticularMealInfo.mealPreference,
         this.mealPreferenceDeadline = perticularMealInfo.mealPreferenceDeadline,
         this.mealStarttime = perticularMealInfo.mealStarttime,
         this.mealEndtime = perticularMealInfo.mealEndtime
      this.getMealCardInfo(perticularMealInfo.mealItems)
   }


   @action.bound
   getMealCardInfo(items) {
      const mealItems = items
      mealItems.map(mealItem => {
         this.getItemsInfo(mealItem)
      })
   }

   @action.bound
   getItemsInfo(mealItem) {
      const itemInfo = {
         itemId: mealItem.meal_item_id,
         itemName: mealItem.item_name,
      }
      const cardItemInfoModel = new CardItemInfoModel(itemInfo)
      this.mealItems.push(cardItemInfoModel)

   }


}


export { MealInfoModel };
