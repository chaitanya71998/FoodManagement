import React from 'react'
import {
    Container,
    SignInContainer,
    Logo,
    Heading,
    Lable,
    InputField,
    PasswordFeild,
    HeadingContainer,
    ButtonContainer,
    ErrorMessage,
    ButtonText
}
from './styledComponent'
import SignInStrings from '../../i18n/strings.json'
import { Input } from '../../../common/components/Input'
import { Button } from '../../../common/components/Button'
import { BrightBlue } from '../../themes/Colors'
class SignInPage extends React.Component {
    static defaultProps = {
        errorMessage: "userName already exists "
    }

    render() {
        const { errorMessage } = this.props
        return (
            <Container>
            
            <SignInContainer>
            
            <Logo 
            src="https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/ecca87bf-3005-41c9-aa87-d8a5dd3741ff.svg"
            alt="iBhubs_logo"/>
            
            <HeadingContainer>
            <Heading>
            {SignInStrings.signInPage.hiTherePleaseSignUp}
            </Heading>
            </HeadingContainer>
            
            <InputField>
            <Lable>
            {SignInStrings.signInPage.userName}
            </Lable>
            <Input type="text" placeholder="UserName" />
            <ErrorMessage>{errorMessage}</ErrorMessage>
            </InputField>
            
            <PasswordFeild>
            <Lable>
            {SignInStrings.signInPage.password}
            </Lable>
            <Input type="password" placeholder="Password" />
            <ErrorMessage>{errorMessage}</ErrorMessage>
            </PasswordFeild>
            
            <ButtonContainer>
            <Button 
            backgroundColor={BrightBlue}
            width="320px"
            ><ButtonText>{SignInStrings.signInPage.login}</ButtonText></Button>
            </ButtonContainer>
            
            
            </SignInContainer>
            </Container>
        )
    }
}
export { SignInPage }
