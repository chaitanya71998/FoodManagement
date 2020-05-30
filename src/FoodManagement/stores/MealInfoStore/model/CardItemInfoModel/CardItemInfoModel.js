import { observable, action } from 'mobx'
class CardItemInfoModel {
    constructor(item) {;
        (this.mealItemId = item.itemId),
        (this.itemName = item.itemName)
    }

}

export { CardItemInfoModel }
