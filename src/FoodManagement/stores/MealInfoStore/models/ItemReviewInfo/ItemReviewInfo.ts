import { action } from 'mobx'
class ItemReviewInfo {
   mealItemId: number
   itemName: string
   quality: number
   taste: number

   constructor(item) {
      ;(this.mealItemId = item.meal_item_id),
         (this.itemName = item.item_name),
         (this.quality = item.quality),
         (this.taste = item.taste)
   }

   @action.bound
   onChangeQualityRating(qualityRating) {
      this.quality = qualityRating
   }

   @action.bound
   onChangeTasteRating(tasteRating) {
      this.taste = tasteRating
   }
}

export { ItemReviewInfo }
