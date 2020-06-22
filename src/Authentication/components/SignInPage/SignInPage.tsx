import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import strings from '../../i18n/strings.json'
import { Input } from '../../../Common/components/Input'
import { Button } from '../../../Common/components/Button'
import { brightBlue } from '../../themes/Colors'
import {
   Container,
   SignInContainer,
   Logo,
   Heading,
   Lable,
   UserNameField,
   PasswordFeild,
   HeadingContainer,
   ButtonContainer,
   ErrorMessage,
   ButtonText,
   InputContainer
}
from './styledComponent'

@observer
class SignInPage extends React.Component {
   @observable username = ''
   @observable password = ''
   @observable errorMessageForUserName = ''
   @observable errorMessageForPassword = ''
   @observable isErrorFromTheServer = false
   userNameRef = React.createRef()
   passwordRef = React.createRef()

   onChangeUsername = event => {
      this.username = event.target.value
      this.errorMessageForUserName = ''
   }

   onChangePassword = event => {
      this.password = event.target.value
      this.errorMessageForPassword = ''
   }

   onClickLoginIn = event => {
      const { onClickLoginIn } = this.props
      event.preventDefault()
      if (this.username !== '' && this.password !== '') {
         this.errorMessageForUserName = ''
         const requestObject = {
            username: this.username,
            password: this.password
         }
         onClickLoginIn(requestObject)
      }
      else if (this.username === '') {
         this.errorMessageForUserName = 'Please enter username'
      }
      else {
         this.errorMessageForPassword = 'Please enter password'
      }
   }

   render() {
      const { userSignInAPIStatus, isErrorFromTheServer } = this.props
      console.log("sign in page")
      return (
         <Container>
            <SignInContainer>
               <Logo
                  src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/ecca87bf-3005-41c9-aa87-d8a5dd3741ff.svg'
                  alt='iBhubs_logo'
               />

               <HeadingContainer>
                  <Heading>{strings.signInPage.hiTherePleaseSignUp}</Heading>
               </HeadingContainer>

               <UserNameField>
                  <Lable>{strings.signInPage.userName}</Lable>
                  <InputContainer>
                     <Input
                        type='text'
                        placeholder='UserName'
                        value={this.username}
                        onChange={this.onChangeUsername}
                     />
                  </InputContainer>
                  {this.errorMessageForUserName != '' && (
                     <ErrorMessage>{this.errorMessageForUserName}</ErrorMessage>
                  )}
               </UserNameField>
               <PasswordFeild>
                  <Lable>{strings.signInPage.password}</Lable>
                  <Input
                     type='password'
                     placeholder='Password'
                     value={this.password}
                     onChange={this.onChangePassword}
                  />
                  {this.errorMessageForPassword != '' && (
                     <ErrorMessage>{this.errorMessageForPassword}</ErrorMessage>
                  )}
               </PasswordFeild>

               <ButtonContainer>
                  <Button
                     backgroundColor={brightBlue}
                     width='100%'
                     onClick={this.onClickLoginIn}
                     getAPIStatus={userSignInAPIStatus}
                  >
                     <ButtonText>{strings.signInPage.login}</ButtonText>
                  </Button>
               </ButtonContainer>
               {isErrorFromTheServer && (
                  <ErrorMessage>{strings.signInPage.errorMessage}</ErrorMessage>
               )}
               
            </SignInContainer>
         </Container>
      )
   }
}
export { SignInPage }
