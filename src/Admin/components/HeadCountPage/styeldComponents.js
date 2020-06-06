import styled from '@emotion/styled'
import tw from 'tailwind.macro'

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

const Items = styled.div `
   ${tw``}
`

const Quantity = styled.div `
   ${tw``}
`

const ItemName = styled.div `
   ${tw``}
`

const ItemQuantity = styled.div `
   ${tw``}
`

const LoadingWrapper = styled.div `${tw ``}`

const ItemsWrapper = styled.div `${tw` flex justify-around`}`

const Measurement = styled.div `${tw `m-1`}`

const ItemMeasurement = styled.div `${tw `flex items-center`}`

const MealInfo = styled.div `${tw `flex justify-center `}`

const Meal = styled.div `${tw `m-4`}
`

const Count = styled.div `${tw `m-4`}
`

const CountInfoWrapper = styled.div `${tw ``}`

const Heading = styled.div `${tw ``}`

const HeaderWrapper = styled.div `
   ${tw`w-full sticky`}
   height:90px
`

const Summary = styled.div `${tw ``}`

const TotalHeadCount = styled.div `${tw ``}`

const CompletedMealHeadCount = styled.div `${tw ``}`

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
   CompletedMealHeadCount
}
