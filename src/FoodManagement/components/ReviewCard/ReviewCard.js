import React, { Component } from 'react';
import { StarRating } from '../../../common/components/StarRating'
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

}
from './styledComponents'
import { Button } from '../../../common/components/Button'
import strings from '../../i18n/strings.json'
import { jade } from '../../themes/Colors'
class ReviewCard extends Component {
    render() {
        return (
            <Container>
            <Header>{strings.reviewCard.review}</Header>
            <RatingWrapper>
            <Headings>
            <Quality>{strings.reviewCard.quality}</Quality>
            <Taste>{strings.reviewCard.taste}</Taste>
            </Headings>
            <ItemsFeedBack>
            <EachItemFeedBack>
            <ItemName>poori</ItemName>
            <QualityRating><StarRating/></QualityRating>
            <TasteRating><StarRating/></TasteRating>
            </EachItemFeedBack>
            </ItemsFeedBack>
            </RatingWrapper>
            <TextAreaForReview row="3" cols="50" placeholder="write review">
            </TextAreaForReview>
            <DoneButtonWrapper>
            <Button width="73px" backgroundColor={jade}>{strings.reviewCard.done}</Button>
            </DoneButtonWrapper>
            
            </Container>

        )
    }
}

export { ReviewCard }
