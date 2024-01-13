import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { Typo20DarkBlueGreyHKGrotesk } from '../../../../styleGuide/Typos'

const Container = styled.div`
   ${tw`flex `}
`

const Image = styled.img`
   ${tw` mr-auto `}
`

const HomeButton = styled(Typo20DarkBlueGreyHKGrotesk)`
   ${tw`m-3 outline-none`}
`

const WeeklyMenu = styled(Typo20DarkBlueGreyHKGrotesk)`
   ${tw`m-3 outline-none`}
`

const Profile = styled(Typo20DarkBlueGreyHKGrotesk)`
   ${tw`m-3 outline-none`}
`

const SignOut = styled.button`
   ${tw`border-current border-solid border rounded-md text-sm p-1`}
`

export { Container, Image, HomeButton, WeeklyMenu, Profile, SignOut }
