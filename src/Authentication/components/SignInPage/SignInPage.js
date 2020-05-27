import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import SignInStrings from '../../i18n/strings.json'
import { Input } from '../../../common/components/Input'
import { Button } from '../../../common/components/Button'
import { BrightBlue } from '../../themes/Colors'
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

@observer
class SignInPage extends React.Component {
    // userNameRef = React.createRef();
    // passwordRef = React.createRef();
    // componentDidMount() {
    //     this.userNameRef.current.focus()
    // }

    static defaultProps = {
        errorMessageForPassword: "",
        errorMessageForUserName: ""
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
            getUserSignInAPIStatus,



        } = this.props
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
            <Input 
            type="text" 
            placeholder="UserName"
            ref={this.userNameRef}
            value={username}
            onChange={onChangeUsername}
            onKeyDown={onChangeUsername}
            />
            <ErrorMessage>{errorMessageForUserName}</ErrorMessage>
            </InputField>
            
            <PasswordFeild>
            <Lable>
            {SignInStrings.signInPage.password}
            </Lable>
            <Input type="password" placeholder="Password" 
            ref={this.passwordRef}
            value={password}
            onChange={onChangePassword}
            onKeyPress={onChangePassword}/>
            <ErrorMessage>{errorMessageForPassword}</ErrorMessage>
            </PasswordFeild>
            
            <ButtonContainer>
            <Button 
            backgroundColor={BrightBlue}
            width="inherit"
            onClick={onClickLoginIn}
            
            ><ButtonText>{SignInStrings.signInPage.login}</ButtonText></Button>
            </ButtonContainer>
            
            
            </SignInContainer>
            </Container>
        )
    }
}
export { SignInPage }
