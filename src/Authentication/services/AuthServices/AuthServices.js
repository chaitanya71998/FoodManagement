import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../utils/APIUtils'
import { apiMethods } from '../../constants/APIConstants'

class AuthServices {
   constructor() {
      this.api = create({
         baseURL: 'https://5ea1a14db9f5ca00166c1f27.mockapi.io/api/'
         //baseURL: 'https://127.0.0.1:8080/api/food_management'
         //baseURL: 'https://217fb11ff047472982bb1e2ccc892bda.vfs.cloud9.ap-southeast-1.amazonaws.com/api/food_management'
      })
   }

   getUserSignInAPI(requestObject) {
      console.log("service", requestObject)
      return networkCallWithApisauce(this.api, '/v1/signin/', {}, apiMethods.get)
   }
}

export { AuthServices }
