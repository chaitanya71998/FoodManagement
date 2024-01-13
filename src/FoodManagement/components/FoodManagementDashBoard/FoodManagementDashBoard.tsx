import React from 'react'
import { observer } from 'mobx-react'

import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import NoDataView from '../../../Common/components/NoDataView'
import { SetDate } from '../../../Common/components/SetDate'
import { SetCarousel } from '../../../Common/components/SetCarousel'

import { Header } from '../../common/components/Header'
import { MealInfoType } from '../../stores/MealInfoStore/MealInfoStore'
import { MealCard } from '../MealCard'
import { MealPreference } from '../../stores/MealInfoStore/models/MealPreference'

import {
   Container,
   Banner,
   DateWrapper,
   HeaderWrapper,
   MealCards,
   SuccessWrapper,
   LoadingWrapper
} from './styledComponents'

interface FoodManagementDashBoardProps {
   mealInformation: Array<MealInfoType>
   onClickEditPreference: (mealType: string) => void
   selectedDate: String
   onClickReviewButton: Function
   selectedMealTypeInfo: null | MealPreference
   onClickIAteIt: Function
   onClickISkipped: Function
   doNetworkCalls: Function
   mealInfoAPIStatus: number
   mealInfoAPIError: string | null
   gotoHome: () => void
   onClickSignOut: () => void
   onChangeDate: Function
}

@observer
class FoodManagementDashBoard extends React.Component<
   FoodManagementDashBoardProps
> {
   icons: Array<string>
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
         selectedDate,
         onClickReviewButton,
         selectedMealTypeInfo,
         onClickIAteIt,
         onClickISkipped,
         doNetworkCalls
      } = this.props

      const mealInfo = [...mealInformation]
      return mealInfo.map((mealTypeInfo, index) => {
         return (
            <MealCard
               key={mealTypeInfo.mealId}
               mealTypeInfo={mealTypeInfo}
               mealIcon={this.icons[index]}
               onClickEditPreference={onClickEditPreference}
               selectedDate={selectedDate}
               onClickReviewButton={onClickReviewButton}
               selectedMealTypeInfo={selectedMealTypeInfo}
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
      } else {
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

export default FoodManagementDashBoard
