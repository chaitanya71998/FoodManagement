// import styled from '@emotion/styled'
import styled from '@emotion/styled/macro'
import tw from 'tailwind.macro'
import { yellowOrange, jade, tomato } from '../../themes/Colors'
import {
   Typo12JadeInter,
   Typo16SteelHKGrotesk,
   Typo16DarkBlueGreyHKGrotesk,
   Typo12SteelHKGrotesk,
   Typo14WhiteHKGrotesk,
   Typo12WhiteHKGrotesk
} from '../../../styleGuide/Typos'

type MealPreferenceProps = {
   mealPreference: string
}

const Container = styled.div`
   ${tw` m-2 border border-solid border-gray-400`}
   width: 360px;
   height: 304px;
   object-fit: contain;
   &:hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
      transform: scale(1.1) rotate(0.01deg);
      transition-duration: 0.5s;
   }
`

const MenuBar = styled.div`
   ${tw``}
`

const MealTypeInfo = styled.div`
   ${tw`flex`}
`

const Icon = styled.img`
   ${tw`border border-solid border-gray-400 p-2 m-1`}
`

const HeadingAndTime = styled.div`
   ${tw`flex flex-col m-2`}
`

const MealPreferenceName = styled(Typo12JadeInter)<MealPreferenceProps>`
   ${tw`h-6 flex justify-center items-center p-1 m-2 ml-auto`}
   ${props =>
      props.mealPreference === 'Custom'
         ? { color: yellowOrange, border: `1px solid ${yellowOrange}` }
         : props.mealPreference === 'Skipped'
         ? { color: tomato, border: `1px solid ${tomato}` }
         : {
              color: jade,
              border: `
1px solid ${jade}
`
           }}
`

const MealData = styled.div`
   ${tw`flex flex-col flex-wrap`}
   height:180px
`

const Item = styled(Typo16SteelHKGrotesk)`
   ${tw`m-3`}
`

const EditButtonWrapper = styled.div`
   ${tw`flex justify-around`}
`
const AteOrSkippedButtonWrapper = styled.div`
   ${tw`flex justify-around`}
`

const MealType = styled(Typo16DarkBlueGreyHKGrotesk)`
   ${tw``}
`

const Time = styled(Typo12SteelHKGrotesk)`
   ${tw``}
`

const EditButtonText = styled(Typo14WhiteHKGrotesk)`
   ${tw`w-full flex justify-center  items-center`}
`

const TimerWrapper = styled(Typo12WhiteHKGrotesk)`
   ${tw`ml-1  flex items-center`}
   width:50%;
`

const TimerIcon = styled.div`
   ${tw`m-1`}
`

const ReviewWrapper = styled.div`
   ${tw`flex justify-center items-center`}
`

const HoverInfo = styled.div`
   display: none;
   ${Container}:hover & {
      display: block;
   }
`

export {
   Container,
   MenuBar,
   MealTypeInfo,
   Icon,
   HeadingAndTime,
   MealType,
   Time,
   MealPreferenceName,
   MealData,
   Item,
   EditButtonWrapper,
   EditButtonText,
   TimerWrapper,
   AteOrSkippedButtonWrapper,
   ReviewWrapper,
   TimerIcon,
   HoverInfo
}
