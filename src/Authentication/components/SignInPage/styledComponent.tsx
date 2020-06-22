import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { iceBlue, white, neonRed } from '../../themes/Colors'
import {
   Typo32DarkBlueGrayRubik,
   Typo12SteelHKGrotesk,
   Typo12NeonRedHKGrotesk,
   Typo14WhiteRubikMedium
} from '../../../styleGuide/Typos'

const Container = styled.div`
   ${tw`flex justify-center items-center h-screen w-screen `}
   ${{
      backgroundColor: iceBlue
   }}
`

const SignInContainer = styled.form`
   ${tw`flex justify-center items-center flex-col w-2/6 p-20`}
   ${{
      borderRadius: '8px',
      backgroundColor: white
   }}
`

const Logo = styled.img`
   ${tw``}
`

const HeadingContainer = styled.div`
   ${tw`flex justify-center items-center`}
   ${{ width: '100%' }}
common
`

const Heading = styled(Typo32DarkBlueGrayRubik)`
   ${tw``}
`

const InputContainer = styled.div`
   ${tw``}
   width:100%;
` //todo error icon

const UserNameField = styled.div`
   ${tw`m-3`}
   width:70%
`

const Lable = styled(Typo12SteelHKGrotesk)`
   ${tw`m-1`}
`

const PasswordFeild = styled.div`
   ${tw`m-3 `}
   width:70%
`

const ButtonContainer = styled.div`
   ${tw`m-3 flex justify-center`}
   ${{ width: '70%' }}
`

const ErrorMessage = styled(Typo12NeonRedHKGrotesk)`
   ${tw``}
`
const ButtonText = styled(Typo14WhiteRubikMedium)`
   ${tw``}
`

export {
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
