import React from 'react'
import { SetDate } from '../../../common/components/SetDate'
import { SetCarousel } from '../../../common/components/SetCarousel'
import { Header } from '../../common/components/Header'
import { MealCard } from '../MealCard'
import { Provider, observer } from 'mobx-react'
import LoadingWrapperWithFailure from '../../../common/LoadingWrapperWithFailure'
import { Toastify } from '../../../common/components/Toastify'
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
      this.mealTypeIconForBreakFast =
         'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/ff7ee48c-8f6d-473d-848b-9042fc296211.svg'
      this.mealTypeIconForLunch =
         'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/3315d5ae-a054-4661-ad90-11dc19202c51.svg'
      this.mealTypeIconForDinner =
         'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/2956a7eb-d60c-4031-a589-15d79145210b.svg'
   }
   renderMealInfo = observer(() => {
      const {
         mealInformation,
         onClickEditPreference,
         date,
         onChangeDate
      } = this.props
      const mealInfo = [...mealInformation]
      if (mealInfo.length === 0) {
         return <NoDataView />
      }
      else {
         return (
            <SuccessWrapper>
               <Banner>
                  <SetCarousel />
               </Banner>
               <DateWrapper>
                  <SetDate date={date} onChangeDate={onChangeDate} />
               </DateWrapper>
               <Provider onClickEditPreference={onClickEditPreference}>
                  <MealCards>
                     <MealCard
                        perticularMealInfo={mealInfo[0]}
                        mealIcon={this.mealTypeIconForBreakFast}
                     />
                     <MealCard
                        perticularMealInfo={mealInfo[1]}
                        mealIcon={this.mealTypeIconForLunch}
                     />
                     <MealCard
                        perticularMealInfo={mealInfo[2]}
                        mealIcon={this.mealTypeIconForDinner}
                     />
                  </MealCards>
               </Provider>
               <Toastify />
            </SuccessWrapper>
         )
      }
   })

   render() {
      const {
         getMealInfoAPIStatus,
         getMealInfoAPIError,
         doNetworkCalls,
         gotoHome,
         onClickSignOut
      } = this.props

      return (
         <Container>
            <HeaderWrapper>
               <Header gotoHome={gotoHome} onClickSignOut={onClickSignOut} />
            </HeaderWrapper>
            <LoadingWrapper>
               <LoadingWrapperWithFailure
                  apiStatus={getMealInfoAPIStatus}
                  apiError={getMealInfoAPIError}
                  onRetryClick={doNetworkCalls}
                  renderSuccessUI={this.renderMealInfo}
               />
            </LoadingWrapper>
         </Container>
      )
   }
}

export { FoodManagementDashBoard }
