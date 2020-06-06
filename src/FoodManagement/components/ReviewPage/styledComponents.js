import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { darkBlueGrey16, lightBlueGrey, white } from '../../themes/Colors'

const Container = styled.div `
   ${tw`flex justify-center flex-col items-center`}
`

const HeaderWrapper = styled.div `
   ${tw`w-full`}
   height:90px
`

const Banner = styled.div `
   ${tw` w-full`}
   height:350px
`

const DateWrapper = styled.div `
   ${tw`w-full flex justify-center`}
`

const SelectDate = styled.input `
   ${tw`border border-gray-400 border-solid w-56`}
`

const MealCards = styled.div `
   ${tw`flex w-full justify-around m-1`}
`

const SuccessWrapper = styled.div `
   ${tw`w-full flex justify-center`}
`

const LoadingWrapper = styled.div `
   ${tw`w-full`}
`
const ReviewCardWrapper = styled.div `
   ${tw``}
   width: 50%;
   border-radius: 6px;
   box-shadow: 0 4px 40px 0 ${darkBlueGrey16};
   border: solid 1px ${lightBlueGrey};
   background-color: ${white};
   position: absolute;
   top: 290px;
   z-index: 10;
`

export {
   Container,
   Banner,
   DateWrapper,
   HeaderWrapper,
   SelectDate,
   MealCards,
   SuccessWrapper,
   LoadingWrapper,
   ReviewCardWrapper
}
