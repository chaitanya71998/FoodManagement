import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { DarkBlueGrey } from '../../themes/Colors'

const Container = styled.div`
   ${tw`flex flex-col w-full `}
`

const Header = styled.div`
   ${tw`flex justify-between `}
`

const Heading = styled.div`
   ${tw``}
   width: 137px;
   height: 40px;
   font-family: HKGrotesk;
   font-size: 32px;
   font-weight: 500;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.25;
   letter-spacing: normal;
   color: ${DarkBlueGrey};
`

const SkipButtonWrapper = styled.div`
   ${tw` m-2`}
`

const TabsWrapper = styled.div`
   ${tw`w-full`}
   border:1px solid #cbd5e0;
`

const TabsAndDateWrapper = styled.div`
   ${tw`flex`}
`

const DateWrapper = styled.div`
   ${tw`w-3/6 flex flex-col justify-between m-1`}
`

const Footer = styled.div`
   ${tw`flex w-full justify-center`}
`

const BackButtonWrapper = styled.div`
   ${tw`w-auto w-24 m-1`}
`

const SaveButtonWrapper = styled.div`
   ${tw`w-32 m-1`}
`

const Image = styled.img`
   ${tw`m-2`}
`

export {
   Container,
   Header,
   Heading,
   SkipButtonWrapper,
   TabsWrapper,
   DateWrapper,
   Footer,
   BackButtonWrapper,
   SaveButtonWrapper,
   TabsAndDateWrapper,
   Image
}
