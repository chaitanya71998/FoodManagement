import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../constants/APIConstants'

class AuthServices {
   constructor() {
      this.api = create({
         //baseURL: 'https://5ea1a14db9f5ca00166c1f27.mockapi.io/api/'
         baseURL: 'https://e36f2278a8e8.ngrok.io/api/food_management'
         //baseURL: 'https://217fb11ff047472982bb1e2ccc892bda.vfs.cloud9.ap-southeast-1.amazonaws.com/api/food_management'
      })
   }

   getUserSignInAPI(requestObject) {
      console.log('service', requestObject)
      return networkCallWithApisauce(
         this.api,
         '/login/v1/', requestObject,
         apiMethods.post
      )
   }
}

export { AuthServices }
/*/v1/signin/*/
/*/login/v1/*/
