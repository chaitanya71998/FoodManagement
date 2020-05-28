import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../utils/APIUtils'
import { apiMethods } from '../../constants/APIConstants'

class MealInfoService {
    constructor() {
        this.api1 = create({
            //baseURL: 'https://5ea1a14db9f5ca00166c1f27.mockapi.io/api/'
            baseURL: 'https://9ba0cd3ggi.execute-api.ap-south-1.amazonaws.com/ecommerce/'
        })
    }

    getMealInfoAPI(date) {
        return networkCallWithApisauce(
            this.api1,
            `products?date=${date}`, {},
            apiMethods.get
        )
    }
}

export default MealInfoService
