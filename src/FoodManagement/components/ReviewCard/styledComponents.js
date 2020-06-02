import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { white, black, darkBlueGrey, lightBlueGrey, darkBlueGrey16 } from '../../themes/Colors'
const Container = styled.div `
   ${tw`flex  flex-col`}
  width: 782px;
  height: 530px;
  border-radius: 6px;
  box-shadow: 0 4px 40px 0 ${darkBlueGrey16};
  border: solid 1px ${lightBlueGrey};
  background-color: ${white};
`

const Header = styled.div `${tw `m-1`}
  width: 147px;
  height: 41px;
  font-family: HKGrotesk;
  font-size: 32px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  color: ${darkBlueGrey};`

const RatingWrapper = styled.div `
width:80%;
height:60%`

const Quality = styled.div `${tw `ml-32`}
  font-family: HKGrotesk;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: normal;
  color: ${black};`

const Taste = styled.div `
font-family: HKGrotesk;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: normal;
  color: ${black};`

const Headings = styled.div `${tw `flex justify-around items-center`}
`

const ItemsFeedBack = styled.div `${tw `flex flex-col m-3`}
border:1px solid grey;
flex-grow:0.5
`

const EachItemFeedBack = styled.div `${tw `flex justify-around`}
`

const ItemName = styled.div `${tw ``}
`

const QualityRating = styled.div `${tw ``}
`

const TasteRating = styled.div `${tw ``}
`
const TextAreaForReview = styled.textarea `${tw `m-2`}
width: 516px;
  height: 81px;
  border-radius: 2px;
  border: solid 1px ${lightBlueGrey};
  background-color: ${white};`

const DoneButtonWrapper = styled.div `${tw `flex justify-center`}`

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
  DoneButtonWrapper
}
