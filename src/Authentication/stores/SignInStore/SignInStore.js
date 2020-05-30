import { observable, action } from 'mobx'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
}
from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { setAccessToken, clearUserSession } from '../../utils/StorageUtils'

class SignInStore {
   @observable getUserSignInAPIStatus
   @observable getUserSignInAPIError
   constructor(SignInAPIService) {
      this.signInAPIService = SignInAPIService
      this.init()
   }

   @action.bound
   init() {
      this.getUserSignInAPIStatus = API_INITIAL
      this.getUserSignInAPIError = null
   }

   @action.bound
   userSignIn(onSuccess) {
      const userSignInAPI = this.signInAPIService.getUserSignInAPI()
      return bindPromiseWithOnSuccess(userSignInAPI)
         .to(this.setGetUserSignInAPIStatus, response => {
            this.setGetUserSignInAPIResponse(response)
            onSuccess()
         })
         .catch(this.setGetUserSignInAPIError)
   }



   @action.bound
   setGetUserSignInAPIResponse(response) {
      setAccessToken(response[0].access_token)
   }

   @action.bound
   setGetUserSignInAPIError(error) {
      this.getUserSignInAPIError = error
   }

   @action.bound
   setGetUserSignInAPIStatus(status) {
      this.getUserSignInAPIStatus = status
   }

   @action.bound
   userSignOut() {
      clearUserSession()
      this.init()
   }
}

export { SignInStore }
