import React from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import {History} from 'history'
import { withRouter, Redirect } from 'react-router-dom'

import { getAccessToken } from '../../../Common/utils/StorageUtils'
import { SignInPage } from '../../components/SignInPage'
import { AuthStore } from "../../stores/AuthStore"

type SignRouteProps ={
   authStore:AuthStore,
   history:History,
   isErrorFromTheServer:boolean


}
@inject('authStore')
@observer
class SignInRoute extends React.Component <SignRouteProps>{
   @observable isErrorFromTheServer = false
   getAuthStore = () => {
      return this.props.authStore
   }

   onClickLoginIn = requestObject => {
      this.getAuthStore().userSignIn(
         requestObject,
         this.onSuccess,
         this.onFailure
      )
   }

   onSuccess = () => {
      const { history } = this.props
      if (this.getAuthStore().isAdmin) {
         history.replace('/food-management-dashboard')
      }
      else {
         history.replace('/admin-page')
      }
      //history.replace('/admin-page')
   }
   onFailure = () => {
      this.isErrorFromTheServer = true
   }
   render() {

      return (
         <SignInPage
            onClickLoginIn={this.onClickLoginIn}
            userSignInAPIStatus={this.getAuthStore().userSignInAPIStatus}
            isErrorFromTheServer={this.isErrorFromTheServer}
         />
      )
   }
}

export default withRouter(SignInRoute)
