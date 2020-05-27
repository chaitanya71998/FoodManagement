import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { IceBlue, White } from '../../themes/Colors'
import { Typo32DarkBlueGrayRubik, Typo12SteelHKGrotesk } from '../../../styleGuide/Typos'

const Container = styled.div `${tw `flex justify-center items-center h-screen w-screen`}
${{
  backgroundColor: IceBlue,
  
}}`

const SignInContainer = styled.div `${tw `flex justify-center items-center flex-col w-2/6 p-10`}
${{
  borderRadius:"8px",
  backgroundColor:White,
}}`

const Logo = styled.img `${tw ``}`

const HeadingContainer = styled.div `
${{width: "214px",
  height: "80px"}}`

const Heading = styled(Typo32DarkBlueGrayRubik)
`${tw ``}`

const InputField = styled.div `${tw `m-3`}`


const Lable = styled(Typo12SteelHKGrotesk)
`${tw `m-1`}`

const PasswordFeild = styled.div `${tw `m-3 `}`

const ButtonContainer = styled.div `${tw `m-3`}`

export {
    Container,
    SignInContainer,
    Logo,
    Heading,
    Lable,
    InputField,
    PasswordFeild,
    HeadingContainer,
    ButtonContainer
}
