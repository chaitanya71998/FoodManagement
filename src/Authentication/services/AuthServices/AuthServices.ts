import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../utils/AuthUtils'
import { apiMethods } from '../../constants/APIConstants'
import AuthService from '../index'
import Config from '../../../Common/constants/EnvironmentConstants'

class AuthServices implements AuthService {
   api: Record<string, any>
   constructor() {
      this.api = create({
         baseURL: Config.BASE_URL
         //baseURL: 'https://5ea1a14db9f5ca00166c1f27.mockapi.io/api'
         //baseURL: 'https://2fb6723c4661.ngrok.io/api/food_management'
         //baseURL: 'https://217fb11ff047472982bb1e2ccc892bda.vfs.cloud9.ap-southeast-1.amazonaws.com/api/food_management'
      })
   }

   getUserSignInAPI(requestObject) {
      return networkCallWithApisauce(
         this.api,
         '/v1/signin/',
         {},
         apiMethods.get
      )
   }
}

export { AuthServices }
/*/v1/signin/*/
/*/login/v1/*/
