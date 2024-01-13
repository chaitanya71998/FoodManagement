import { observable, action } from 'mobx'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED,
   APIStatus
} from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import {
   setAccessToken,
   clearUserSession
} from '../../../Common/utils/StorageUtils'
import { AuthServices } from "../../services/AuthServices"
import { RequestObject, AccessToken } from "../types"

class AuthStore {
   @observable userSignInAPIStatus!:APIStatus
   @observable userSignInAPIError!:null | Error
   @observable isAdmin!:boolean
   authServices:AuthServices
   constructor(authServices:AuthServices) {
      this.authServices = authServices
      this.init()
   }

   @action.bound
   init() {
      this.userSignInAPIStatus = API_INITIAL
      this.userSignInAPIError = null
      this.isAdmin = false
   }

   @action.bound
   //TODO
   userSignIn(requestObject:RequestObject, onSuccess:Function, onFailure:Function) {
      const userSignInAPI = this.authServices.getUserSignInAPI(
         requestObject
      )
      return bindPromiseWithOnSuccess(userSignInAPI)
         .to(this.setUserSignInAPIStatus, response => {
            this.setUserSignInAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setUserSignInAPIError(error)
            onFailure()
         })
   }

   @action.bound
   //TODO
   setUserSignInAPIResponse(response:Array<AccessToken> | null) {
      //this.isAdmin = response.is_admin
      if(response){
         setAccessToken(response[0].access_token)
      }
      
   }

   @action.bound
   setUserSignInAPIError(error:Error) {
      this.userSignInAPIError = error
   }

   @action.bound
   setUserSignInAPIStatus(status) {
      this.userSignInAPIStatus = status
   }

   @action.bound
   userSignOut() {
      clearUserSession()
      this.init()
   }
}

export { AuthStore }
