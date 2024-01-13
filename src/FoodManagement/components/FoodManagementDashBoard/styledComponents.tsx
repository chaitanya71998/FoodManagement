import styled from '@emotion/styled'
import tw from 'tailwind.macro'

const Container = styled.div`
   ${tw`flex justify-center flex-col items-center`}
   position:sticky,
   position:-webkit-sticky,
   top:0
`

const HeaderWrapper = styled.div`
   ${tw`w-full sticky`}
   height:90px
`

const Banner = styled.div`
   ${tw` w-full`}
   height:300px
`

const DateWrapper = styled.div`
   ${tw`w-full flex justify-center m-2`}
`

const SelectDate = styled.input`
   ${tw`border border-gray-400 border-solid w-56`}
`

const MealCards = styled.div`
   ${tw`flex w-full justify-around m-1 flex-wrap`}
`

const SuccessWrapper = styled.div`
   ${tw`w-full`}
`

const LoadingWrapper = styled.div`
   ${tw`w-full`}
`

export {
   Container,
   Banner,
   DateWrapper,
   HeaderWrapper,
   SelectDate,
   MealCards,
   SuccessWrapper,
   LoadingWrapper
}
