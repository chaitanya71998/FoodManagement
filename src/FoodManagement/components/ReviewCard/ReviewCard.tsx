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
import { ReviewCardProps } from '../ReviewPage/Reviewpage'

class ReviewCard extends Component<ReviewCardProps> {
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

   onChangeReview = event => {
      const { onChangeReviewOfMealType } = this.props
      onChangeReviewOfMealType(event.target.value)
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
               placeholder='write review'
               onChange={this.onChangeReview}
            />
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
