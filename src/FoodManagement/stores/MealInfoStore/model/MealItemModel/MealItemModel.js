import { observable, action } from 'mobx'
class MealItemModel {
   constructor(item) {;
      (this.mealItemId = item.mealItemId),
      (this.itemName = item.itemName),
      (this.servingSizeUnit = item.servingSizeUnit),
      (this.category = item.category),
      (this.quantity = item.quantity)
   }

   @action.bound
   onChangeQuantity(quantity) {
      this.quantity = quantity
   }
}

export { MealItemModel }
