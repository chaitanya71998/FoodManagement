import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { Input } from '../../../Common/components/Input'
import { Button } from '../../../Common/components/Button'
import strings from '../../i18n/strings.json'
import { brightBlue } from '../../themes/Colors'
import { LogoComponent } from '../../../Common/components/Icons/Logo'
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
   InputContainer,
   InputBorder,
   Boo
} from './styledComponent'
import { Buttons } from '../../../Common/components/Buttons'

type objectType = {
   onClickLoginIn: Function
   userSignInAPIStatus: number
   isErrorFromTheServer: Boolean
}

@observer
class SignInPage extends React.Component<objectType> {
   @observable username: string = ''
   @observable password: string = ''
   @observable errorMessageForUserName: string = ''
   @observable errorMessageForPassword: string = ''
   @observable isErrorFromTheServer: boolean = false
   userNameRef: React.RefObject<HTMLInputElement> = React.createRef()
   passwordRef: React.RefObject<HTMLInputElement> = React.createRef()

   componentDidMount() {
      this.userNameRef.current?.focus()
   }

   onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.username = event.target.value
      this.errorMessageForUserName = ''
   }

   onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.password = event.target.value
      this.errorMessageForPassword = ''
   }

   onClickLoginIn = (event: React.MouseEvent) => {
      const { onClickLoginIn } = this.props
      event.preventDefault()
      if (this.username !== '' && this.password !== '') {
         this.errorMessageForUserName = ''
         const requestObject = {
            username: this.username,
            password: this.password
         }
         onClickLoginIn(requestObject)
      } else if (this.username === '') {
         this.errorMessageForUserName = 'Please enter username'
         this.userNameRef.current?.focus()
      } else {
         this.errorMessageForPassword = 'Please enter password'
         this.passwordRef.current?.focus()
      }
   }

   render() {
      const { userSignInAPIStatus, isErrorFromTheServer } = this.props
      return (
         <Container>
            <SignInContainer>
               <LogoComponent />

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
                        forwardRef={this.userNameRef}
                        inputBorder={InputBorder}
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
                     forwardRef={this.passwordRef}
                     inputBorder={InputBorder}
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
