import React from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'

import { withRouter, Redirect, RouteComponentProps } from 'react-router-dom'

import { getAccessToken } from '../../../Common/utils/StorageUtils'
import { SignInPage } from '../../components/SignInPage'
import { AuthStore } from '../../stores/AuthStore'

interface SignRouteProps extends RouteComponentProps {
   isErrorFromTheServer: boolean
}

interface InjectedProps extends SignRouteProps {
   authStore: AuthStore
}

@inject('authStore')
@observer
class SignInRoute extends React.Component<SignRouteProps> {
   @observable isErrorFromTheServer: boolean = false

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getAuthStore = () => {
      return this.getInjectedProps().authStore
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
         history.replace('/admin-page')
      } else {
         history.replace('/food-management-dashboard')
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
