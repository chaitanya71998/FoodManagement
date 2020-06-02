import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { yellowOrange, jade, tomato } from '../../themes/Colors'
import { Typo12JadeInter, Typo16SteelHKGrotesk, Typo16DarkBlueGreyHKGrotesk,Typo12SteelHKGrotesk } from '../../../styleGuide/Typos'

const Container = styled.div `
   ${tw` m-2 border border-solid border-gray-400`}
   width: 360px;
  height: 304px;
  object-fit: contain;
   
`

const MenuBar = styled.div `
   ${tw``}
`

const MealTypeInfo = styled.div `
   ${tw`flex`}
`

const Icon = styled.img `
   ${tw`border border-solid border-gray-400 p-2 m-1`}
`

const HeadingAndTime = styled.div `
   ${tw`flex flex-col m-2`}
`

const MealPreference = styled(Typo12JadeInter)
`
   ${tw`h-6 flex justify-center items-center p-1 m-2 ml-auto`}
   ${props =>
      props.mealPreference === 'Custom'
         ? { color: yellowOrange, border: `1px solid ${yellowOrange}` }
         : {color: jade,border: `
1px solid ${ jade }
`}}
${props=>props.mealPreference==='Skipped'?{color:tomato,border:`1px solid ${tomato}`}:{color: jade,border: `
1px solid ${ jade }
`}}}
` //don't save

const MealData = styled.div `
   ${tw`flex flex-col flex-wrap`}
   height:180px
`

const Item = styled(Typo16SteelHKGrotesk)
`
   ${tw`m-3`}
`

const EditButtonWrapper = styled.div `
   ${tw`flex justify-around`}
`
const AteOrSkippedButtonWrapper = styled.div `
   ${tw`flex justify-around`}
`

const MealType = styled(Typo16DarkBlueGreyHKGrotesk)
`
   ${tw``}
`

const Time = styled(Typo12SteelHKGrotesk) `
   ${tw``}
`

const EditButtonText = styled.span `${tw `w-full flex justify-center  items-center`}`

const TimerWrapper = styled.span `${tw `m-2`}`

export {
   Container,
   MenuBar,
   MealTypeInfo,
   Icon,
   HeadingAndTime,
   MealType,
   Time,
   MealPreference,
   MealData,
   Item,
   EditButtonWrapper,
   EditButtonText,
   TimerWrapper,
   AteOrSkippedButtonWrapper
}
