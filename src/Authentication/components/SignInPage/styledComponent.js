import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { IceBlue, White, NeonRed } from '../../themes/Colors'
import {
  Typo32DarkBlueGrayRubik,
  Typo12SteelHKGrotesk,
  Typo12NeonRedHKGrotesk,
  Typo14WhiteRubikMedium
}
from '../../../styleGuide/Typos'

const Container = styled.div `${tw `flex justify-center items-center h-screen w-screen`}
${{
  backgroundColor: IceBlue,
  
}}`

const SignInContainer = styled.div `${tw `flex justify-center items-center flex-col w-2/6 p-10`}
${{
  borderRadius:"8px",
  backgroundColor:White,
}}
`

const Logo = styled.img `${tw ``}`

const HeadingContainer = styled.div `${tw `flex justify-center items-center`}
${{width: "100%",
  height: "80px"}}`

const Heading = styled(Typo32DarkBlueGrayRubik)
`${tw ``}
`

const InputField = styled.div `${tw `m-3`}`


const Lable = styled(Typo12SteelHKGrotesk)
`${tw `m-1`}`

const PasswordFeild = styled.div `${tw `m-3 `}`

const ButtonContainer = styled.div `${tw `m-3 flex justify-center`}
width:85%`

const ErrorMessage = styled(Typo12NeonRedHKGrotesk)
`${tw ``}
`
const ButtonText = styled(Typo14WhiteRubikMedium)
`${tw ``}`

export {
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
