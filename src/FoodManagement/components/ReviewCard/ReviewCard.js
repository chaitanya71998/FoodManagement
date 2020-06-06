import React, { Component } from 'react'
import { StarRating } from '../../../Common/components/StarRating'
import { Button } from '../../../Common/components/Button'
import strings from '../../i18n/strings.json'
import { jade } from '../../themes/Colors'
import {
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
} from './styledComponents'

class ReviewCard extends Component {
   renderEachItemReview = () => {
      const { selectedMealTypeInfoReview } = this.props
      return selectedMealTypeInfoReview.mealItems.map(item => {
         return (
            <EachItemFeedBack>
               <ItemName>{item.itemName}</ItemName>
               <QualityRating>
                  <StarRating onChangeRating={item.onChangeQualityRating} />
               </QualityRating>
               <TasteRating>
                  <StarRating onChangeRating={item.onChangeTasteRating} />
               </TasteRating>
            </EachItemFeedBack>
         )
      })
   }

   render() {
      const { onSaveMealReview, isLoadingOnDone } = this.props
      return (
         <Container>
            <Header>{strings.reviewCard.review}</Header>
            <RatingWrapper>
               <Headings>
                  <Quality>{strings.reviewCard.quality}</Quality>
                  <Taste>{strings.reviewCard.taste}</Taste>
               </Headings>
               <ItemsFeedBack>{this.renderEachItemReview()}</ItemsFeedBack>
            </RatingWrapper>
            <TextAreaForReview
               row='3'
               cols='50'
               placeholder='write review'
            ></TextAreaForReview>
            <DoneButtonWrapper>
               <Button
                  width='73px'
                  backgroundColor={jade}
                  onClick={onSaveMealReview}
                  isLoading={isLoadingOnDone}
               >
                  {strings.reviewCard.done}
               </Button>
            </DoneButtonWrapper>
         </Container>
      )
   }
}

export { ReviewCard }
