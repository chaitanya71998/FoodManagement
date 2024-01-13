import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { white, lightBlueGrey, darkBlueGrey16 } from '../../themes/Colors'
import {
   Typo18SteelHKGrotesk,
   Typo20BlackHKGrotesk,
   Typo32darkBlueGreyHKGrotesk
} from '../../../styleGuide/Typos'
const Container = styled.div`
   ${tw`flex  flex-col`}
   width: 100%;
   height: 530px;
   border-radius: 6px;
   box-shadow: 0 4px 40px 0 ${darkBlueGrey16};
   border: solid 1px ${lightBlueGrey};
   background-color: ${white};
`

const Header = styled(Typo32darkBlueGreyHKGrotesk)`
   ${tw`m-1 `}
   width:100px;
   border-bottom: 2px solid #667eea;
`

const RatingWrapper = styled.div`
   ${tw`flex flex-col`}
   border-collapse: collapse;
   width: 80%;
   height: 60%;
`

const Quality = styled(Typo20BlackHKGrotesk)`
   ${tw`ml-32 flex justify-center`}
   flex-grow:0.3;
`

const Taste = styled(Typo20BlackHKGrotesk)`
   ${tw`flex justify-center`}
   flex-grow:0.3;
`

const Item = styled.div`
   ${tw``}
`

const Headings = styled.div`
   ${tw`flex justify-around items-center`}
`

const ItemsFeedBack = styled.div`
   ${tw`flex flex-col m-3`}
   flex-grow:0.5
`

const EachItemFeedBack = styled.div`
   ${tw`flex justify-around mb-6`}
`

const ItemName = styled(Typo18SteelHKGrotesk)`
   ${tw``}
   width:100px;
`

const QualityRating = styled.div`
   ${tw`flex justify-center`}
   flex-grow:0.3;
   text-align: center;
`

const TasteRating = styled.div`
   ${tw`flex justify-center`}
   flex-grow:0.3;
   text-align: center;
`
const TextAreaForReview = styled.textarea`
   ${tw`m-2`}
   width: 516px;
   height: 81px;
   border-radius: 2px;
   border: solid 1px ${lightBlueGrey};
   background-color: ${white};
`

const DoneButtonWrapper = styled.div`
   ${tw`flex justify-center`}
`

export {
   Container,
   Header,
   RatingWrapper,
   Quality,
   Taste,
   Headings,
   ItemsFeedBack,
   EachItemFeedBack,
   ItemName,
   QualityRating,
   TasteRating,
   TextAreaForReview,
   DoneButtonWrapper,
   Item
}
