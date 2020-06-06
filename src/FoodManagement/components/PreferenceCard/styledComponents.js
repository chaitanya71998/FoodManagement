import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { darkBlueGrey, white } from '../../themes/Colors'


const Container = styled.div `
   ${tw`flex flex-col w-full`}
`

const Header = styled.div `
   ${tw`flex justify-between `}
`

const Heading = styled.div `
   ${tw``}
   font-family: HKGrotesk;
   font-size: 32px;
   font-weight: 500;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.25;
   letter-spacing: normal;
   color: ${darkBlueGrey};
   margin:10px
`

const SkipButtonWrapper = styled.div `
   ${tw`m-4 border border-black`}
   width: 102px;

   background-color: ${white};
   border-radius: 4px;
   border: solid 1px #d7dfe9;
`

const TabsWrapper = styled.div `
   ${tw`w-full`}
`

const TabsAndDateWrapper = styled.div `
   ${tw`flex`}
`

const DateWrapper = styled.div `
   ${tw`w-3/6 flex m-3`}
`

const Footer = styled.div `
   ${tw`flex w-full justify-center`}
`

const BackButtonWrapper = styled.div `
   ${tw`w-auto w-24 m-1`}
   width: 71px;
   border-radius: 4px;
   border: solid 1px #d7dfe9;
   background-color: ${white};
`

const SaveButtonWrapper = styled.div `
   ${tw`w-32 m-1`}
`

const ImageWrapper = styled.div `${tw ``}
flex-grow:0.5`
const Image = styled.img `
   ${tw``}
   width:100%;
   
`
const Group = styled.div `${tw `flex justify-between flex-col`}`

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
   Image,
   Group,
   ImageWrapper
}
