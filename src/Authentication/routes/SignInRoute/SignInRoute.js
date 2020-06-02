import React from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter, Redirect } from 'react-router-dom'
import { getAccessToken } from '../../utils/StorageUtils'
//import { SignInPage } from '../../components/SignInPage';
import { SignInPage } from '../../components/SignInPage'

@inject('authStore')
@observer
class SignInRoute extends React.Component {
   signFormRef = React.createRef()
   @observable username = ''
   @observable password = ''
   @observable errorMessageForUserName = ''
   @observable errorMessageForPassword = ''

   /*    
        getAuthStore = () => {
            return this.props.authStore
        }
        */

   getAuthStore = () => {
      return this.props.authStore
   }

   onChangeUsername = event => {
      this.username = event.target.value
      this.errorMessageForUserName = ''
      // if (event.keyCode == 13) {
      //     this.signFormRef.current.passwordRef.current.focus()
      // }
   }
   /*
    changeFocusToPassword = (event) => {
        
    }*/

   onChangePassword = event => {
      this.password = event.target.value
      this.errorMessageForPassword = ''
      // if (event.keyCode == 13) {
      //     this.signFormRef.current.passwordRef.current.focus()
      // }
   }

   onClickLoginIn = event => {
      event.preventDefault()
      if (this.username !== '' && this.password !== '') {
         this.errorMessageForUserName = ''
         const requestObject = {
            "username": this.username,
            "password": this.password
         }
         console.log("requestObject", requestObject)
         /*
            if (!window.navigator.onLine) {
                this.errorMessage = "Network Error"
            }*/
         this.getAuthStore().userSignIn(requestObject, this.onSuccess)
      }
      else if (this.username === '') {
         this.errorMessageForUserName = 'Please enter username'
         // this.signFormRef.current.userNameRef.current.focus()
      }
      else {
         this.errorMessageForPassword = 'Please enter password'
         // this.signFormRef.current.userNameRef.current.focus()
      }
      // else {
      //    this.errorMessageForPassword = 'Please enter password'
      //    // this.signFormRef.current.passwordRef.current.focus()
      // }
   }

   onSuccess = () => {
      console.log("login")
      const { history } = this.props
      history.replace('/food-management-dashboard')
   }
   render() {
      return (
         <SignInPage
            onChangeUsername={this.onChangeUsername}
            onChangePassword={this.onChangePassword}
            onClickLoginIn={this.onClickLoginIn}
            username={this.username}
            password={this.password}
            errorMessageForPassword={this.errorMessageForPassword}
            errorMessageForUserName={this.errorMessageForUserName}
            getUserSignInAPIStatus={this.getAuthStore().getUserSignInAPIStatus}
            ref={this.signFormRef}
         />
      )
   }
}

export default withRouter(SignInRoute)
