import { observable, action } from 'mobx'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
}
from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import {
   setAccessToken,
   clearUserSession
}
from '../../../Common/utils/StorageUtils'

class AuthStore {
   @observable userSignInAPIStatus
   @observable userSignInAPIError
   @observable isAdmin
   constructor(SignInAPIService) {
      this.signInAPIService = SignInAPIService
      this.init()
   }

   @action.bound
   init() {
      this.userSignInAPIStatus = API_INITIAL
      this.userSignInAPIError = null
      this.isAdmin = false
   }

   @action.bound
   userSignIn(requestObject, onSuccess, onFailure) {
      const userSignInAPI = this.signInAPIService.getUserSignInAPI(
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
   setUserSignInAPIResponse(response) {
      this.isAdmin = response.is_admin
      setAccessToken(response[0].access_token)
   }

   @action.bound
   setUserSignInAPIError(error) {
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
