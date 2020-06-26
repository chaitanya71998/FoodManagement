import React from 'react'
import { observer } from 'mobx-react'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import NoDataView from '../../../Common/components/LoadingWrapperWithFailure'
import { SetCarousel } from '../../../Common/components/SetCarousel'
import { Header } from '../../common/components/Header'
import { ReviewCard } from '../ReviewCard'
import {
   Container,
   Banner,
   HeaderWrapper,
   SuccessWrapper,
   LoadingWrapper,
   ReviewCardWrapper
} from './styledComponents'
import { MealReview } from '../../stores/MealInfoStore/models/MealReview'
import { APIStatus } from '@ib/api-constants'

export interface ReviewCardProps {
   selectedMealTypeInfoReview: MealReview | any
   onSaveMealReview: () => void
   isLoadingOnDone: boolean
   onChangeReviewOfMealType: (review: string) => void
}

interface ReviewPageProps extends ReviewCardProps {
   selectedMealTypeReviewInfoAPIStatus: APIStatus
   selectedMealTypeReviewInfoAPIError: Error | null
   doNetworkCalls: () => void
   gotoHome: () => void
   onClickSignOut: () => void
}

@observer
class ReviewPage extends React.Component<ReviewPageProps> {
   renderMealReviewInfo = observer(() => {
      const {
         selectedMealTypeInfoReview,
         onSaveMealReview,
         isLoadingOnDone,
         onChangeReviewOfMealType
      } = this.props
      if (!selectedMealTypeInfoReview) {
         return <NoDataView />
      } else {
         return (
            <SuccessWrapper>
               <ReviewCardWrapper>
                  <ReviewCard
                     selectedMealTypeInfoReview={selectedMealTypeInfoReview}
                     onSaveMealReview={onSaveMealReview}
                     isLoadingOnDone={isLoadingOnDone}
                     onChangeReviewOfMealType={onChangeReviewOfMealType}
                  />
               </ReviewCardWrapper>
            </SuccessWrapper>
         )
      }
   })

   render() {
      const {
         selectedMealTypeReviewInfoAPIStatus,
         selectedMealTypeReviewInfoAPIError,
         doNetworkCalls,
         gotoHome,
         onClickSignOut
      } = this.props
      return (
         <Container>
            <HeaderWrapper>
               <Header gotoHome={gotoHome} onClickSignOut={onClickSignOut} />
            </HeaderWrapper>
            <Banner>
               <SetCarousel />
            </Banner>
            <LoadingWrapper>
               <LoadingWrapperWithFailure
                  apiStatus={selectedMealTypeReviewInfoAPIStatus}
                  apiError={selectedMealTypeReviewInfoAPIError}
                  onRetryClick={doNetworkCalls}
                  renderSuccessUI={this.renderMealReviewInfo}
               />
            </LoadingWrapper>
         </Container>
      )
   }
}

export { ReviewPage }
