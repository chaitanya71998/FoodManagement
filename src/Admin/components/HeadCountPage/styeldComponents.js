import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { Typo14BlackHKGrotesk, Typo16BrightBlueHKGrotesk, Typo24HKGrotesk, Typo20HKGrotesk } from '../../../styleGuide/Typos'
const Container = styled.div `
   ${tw` `}
   border:1px solid black
`

const HeadCountWrapper = styled.div `
   ${tw`flex w-full`}
`

const TabWrapper = styled.div `
   ${tw`w-full`}
`

const DateWrapper = styled.div `
   ${tw`m-4`}
`

const ItemsAndQuantityWrapper = styled.div `
   ${tw`flex flex-col `}
`

const Headings = styled.div `
   ${tw`flex justify-around `}
`

const Items = styled(Typo16BrightBlueHKGrotesk)
`
   ${tw``}
`

const Quantity = styled(Typo16BrightBlueHKGrotesk)
`
   ${tw``}
`

const ItemName = styled.div `
   ${tw``}
`

const ItemQuantity = styled.div `
   ${tw``}
`

const LoadingWrapper = styled.div `
   ${tw``}
`

const ItemsWrapper = styled.div `
   ${tw` flex justify-around`}
`

const Measurement = styled.div `
   ${tw`m-1`}
`

const ItemMeasurement = styled.div `
   ${tw`flex items-center`}
`

const MealInfo = styled.div `
   ${tw`flex justify-center `}
`

const Meal = styled.div `
   ${tw`m-4`}
`

const Count = styled.div `
   ${tw`m-4`}
`

const CountInfoWrapper = styled.div `
   ${tw`flex justify-center flex-col items-center`}
   border:1px solid red
`

const Heading = styled(Typo14BlackHKGrotesk)
`
   ${tw``}
`

const HeaderWrapper = styled.div `
   ${tw`w-full sticky`}
   height:90px
`

const Summary = styled(Typo24HKGrotesk)
`
   ${tw``}
`

const TotalHeadCount = styled(Typo20HKGrotesk)
`
   ${tw``}
`

const CompletedMealHeadCount = styled(Typo20HKGrotesk)
`
   ${tw``}
`

const SummaryWrapper = styled.div `${tw `flex flex-col justify-center items-center`}`

const TotalHeadCountWrapper = styled.div `${tw `flex items-center`}`

const CompletedMealHeadCountWrapper = styled.div `${tw `flex items-center`}`
export {
   Container,
   HeadCountWrapper,
   TabWrapper,
   DateWrapper,
   ItemsAndQuantityWrapper,
   Headings,
   Items,
   Quantity,
   ItemName,
   ItemQuantity,
   LoadingWrapper,
   ItemsWrapper,
   Measurement,
   ItemMeasurement,
   MealInfo,
   Meal,
   Count,
   CountInfoWrapper,
   Heading,
   HeaderWrapper,
   Summary,
   TotalHeadCount,
   CompletedMealHeadCount,
   SummaryWrapper,
   TotalHeadCountWrapper,
   CompletedMealHeadCountWrapper
}
