import { action } from 'mobx'
class ItemInfo {
    constructor(item) {
        this.mealItemId = item.meal_item_id,
            this.itemName = item.item_name,
            this.servingSizeUnit = item.serving_size_unit,
            this.category = item.category,
            this.quantity = item.quantity
    }

    @action.bound
    onChangeQuantity(quantity) {
        this.quantity = quantity
    }
}

export { ItemInfo }
