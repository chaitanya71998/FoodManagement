import React from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter, Redirect } from "react-router-dom";
import { getAccessToken } from '../../utils/StorageUtils';
//import { SignInPage } from '../../components/SignInPage';
import { SignInPage } from '../../components/SignInPage'





@inject("signInStore")
@observer
class SignInRoute extends React.Component {
    signFormRef = React.createRef()
    @observable username = ""
    @observable password = ""
    @observable errorMessageForUserName = ''
    @observable errorMessageForPassword = ""

    /*    
        getAuthStore = () => {
            return this.props.authStore
        }
        */

    getAuthStore = () => {
        return this.props.signInStore
    }

    onChangeUsername = (event) => {
        this.username = event.target.value
        this.errorMessageForUserName = ""
        // if (event.keyCode == 13) {
        //     this.signFormRef.current.passwordRef.current.focus()
        // }



    }
    /*
    changeFocusToPassword = (event) => {
        
    }*/

    onChangePassword = (event) => {
        this.password = event.target.value
        this.errorMessageForPassword = ""
        // if (event.keyCode == 13) {
        //     this.signFormRef.current.passwordRef.current.focus()
        // }
    }

    onClickLoginIn = (event) => {
        event.preventDefault()
        if (this.username !== '' && this.password !== '') {
            this.errorMessageForUserName = ''
            /*
            if (!window.navigator.onLine) {
                this.errorMessage = "Network Error"
            }*/
            this.getAuthStore().userSignIn(this.onSuccess, this.onFailure)


        }
        else if (this.username === '') {
            this.errorMessageForUserName = 'Please enter username'
            // this.signFormRef.current.userNameRef.current.focus()
        }
        else {
            this.errorMessageForPassword = 'Please enter password'
            // this.signFormRef.current.passwordRef.current.focus()

        }

    }

    onSuccess = () => {
        const { history } = this.props;
        history.replace("/food-management-dashboard")
    }

    onFailure = () => {
        alert("failed")
    }

    // gotoFoodManagementAppIfLoggedIn = () => {
    //     event.preventDefault()
    //     console.log("gotoECommerceAppIfLoggedIn", getAccessToken())
    //     if (getAccessToken() === "f5af9f51-07e6-4332-8f1a-c0c11c1e3434") {
    //         const { history } = this.props;
    //         history.replace("/products-page")
    //         console.log("history changed")

    //     }
    //     console.log("gotoECommerceAppIfLoggedIn after history changes")
    // }
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

export default withRouter(SignInRoute);
