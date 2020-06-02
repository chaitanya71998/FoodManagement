import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import strings from '../../i18n/strings.json'
import { Input } from '../../../common/components/Input'
import { Button } from '../../../common/components/Button'
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
   static defaultProps = {
      errorMessageForPassword: '',
      errorMessageForUserName: ''
   }

   render() {
      const {
         errorMessageForUserName,
         errorMessageForPassword,
         onChangeUsername,
         onChangePassword,
         onClickLoginIn,
         username,
         password,
         getUserSignInAPIStatus //not use get


      } = this.props
      return (
         <Container>
            <SignInContainer>
               <Logo
                  src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/ecca87bf-3005-41c9-aa87-d8a5dd3741ff.svg'
                  alt='iBhubs_logo'
               />

               <HeadingContainer>
                  <Heading>
                     {strings.signInPage.hiTherePleaseSignUp}
                  </Heading>
               </HeadingContainer>

               <UserNameField>
                  <Lable>{strings.signInPage.userName}</Lable>
                  <InputContainer>
                     <Input
                        type='text'
                        placeholder='UserName'
                        ref={this.userNameRef}
                        value={username}
                        onChange={onChangeUsername}
                     />
                  </InputContainer>
                  {(errorMessageForUserName!="")&&
                  <ErrorMessage>{errorMessageForUserName}</ErrorMessage>}
               </UserNameField>

               <PasswordFeild>
                  <Lable>{strings.signInPage.password}</Lable>
                  <Input
                     type='password'
                     placeholder='Password'
                     ref={this.passwordRef}
                     value={password}
                     onChange={onChangePassword}
                  />
                  {(errorMessageForPassword!="")&&
                  <ErrorMessage>{errorMessageForPassword}</ErrorMessage>}
               </PasswordFeild>

               <ButtonContainer>
                  <Button
                     backgroundColor={brightBlue}
                     width='100%'
                     onClick={onClickLoginIn}
                     getAPIStatus={getUserSignInAPIStatus}
                  >
                     <ButtonText>{strings.signInPage.login}</ButtonText>
                  </Button>
               </ButtonContainer>
            </SignInContainer>
         </Container>
      )
   }
}
export { SignInPage }
