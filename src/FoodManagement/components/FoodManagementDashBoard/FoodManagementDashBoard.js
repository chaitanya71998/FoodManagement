import React from 'react'
import { observer } from 'mobx-react'

import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import NoDataView from '../../../Common/components/NoDataView'
import { SetDate } from '../../../Common/components/SetDate'
import { SetCarousel } from '../../../Common/components/SetCarousel'
import { Header } from '../../common/components/Header'
import { MealCard } from '../MealCard'
import {
   Container,
   Banner,
   DateWrapper,
   HeaderWrapper,
   MealCards,
   SuccessWrapper,
   LoadingWrapper
}
from './styledComponents'

@observer
class FoodManagementDashBoard extends React.Component {
   constructor(props) {
      super(props)
      this.icons = [
         'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/ff7ee48c-8f6d-473d-848b-9042fc296211.svg',
         'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/3315d5ae-a054-4661-ad90-11dc19202c51.svg',
         'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/2956a7eb-d60c-4031-a589-15d79145210b.svg'
      ]
   }

   renderMealCards = () => {
      const {
         mealInformation,
         onClickEditPreference,
         timeLeftForEditPreference,
         selectedDate,
         onClickReviewButton,
         selectedMealTypeInfoAPIStatus,
         onClickIAteIt,
         onClickISkipped,
         doNetworkCalls
      } = this.props
      const mealInfo = [...mealInformation]
      return mealInfo.map((mealTypeInfo, index) => {
         return (
            <MealCard
               mealTypeInfo={mealTypeInfo}
               mealIcon={this.icons[index]}
               onClickEditPreference={onClickEditPreference}
               timeLeftForEditPreference={timeLeftForEditPreference}
               selectedDate={selectedDate}
               onClickReviewButton={onClickReviewButton}
               selectedMealTypeInfoAPIStatus={selectedMealTypeInfoAPIStatus}
               onClickIAteIt={onClickIAteIt}
               onClickISkipped={onClickISkipped}
               doNetworkCalls={doNetworkCalls}
            ></MealCard>
         )
      })
   }
   renderMealInfo = observer(() => {
      const { mealInformation } = this.props
      const mealInfo = [...mealInformation]
      if (mealInfo.length === 0) {
         return <NoDataView />
      }
      else {
         return (
            <SuccessWrapper>
               <MealCards>{this.renderMealCards()}</MealCards>
            </SuccessWrapper>
         )
      }
   })

   render() {
      const {
         mealInfoAPIStatus,
         mealInfoAPIError,
         doNetworkCalls,
         gotoHome,
         onClickSignOut,
         selectedDate,
         onChangeDate
      } = this.props

      return (
         <Container>
            <HeaderWrapper>
                                       <Header gotoHome={gotoHome} onClickSignOut={onClickSignOut} />
                                    </HeaderWrapper>
            <Banner>
                  <SetCarousel />
               </Banner>
               <DateWrapper>
                  <SetDate
                     selectedDate={selectedDate}
                     onChangeDate={onChangeDate}
                  />
               </DateWrapper>
            <LoadingWrapper>
               <LoadingWrapperWithFailure
                  apiStatus={mealInfoAPIStatus}
                  apiError={mealInfoAPIError}
                  onRetryClick={doNetworkCalls}
                  renderSuccessUI={this.renderMealInfo}
               />
            </LoadingWrapper>
         </Container>
      )
   }
}

export { FoodManagementDashBoard }
