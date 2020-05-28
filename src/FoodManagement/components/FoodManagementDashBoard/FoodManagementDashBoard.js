import React from 'react'
import { SetDate } from '../../../common/components/SetDate'
import { SetCarousel } from '../../../common/components/SetCarousel'
import { Header } from '../../common/components/Header'
import { MealCard } from '../MealCard'
import { Provider, observer } from 'mobx-react'
import LoadingWrapperWithFailure from '../../../common/LoadingWrapperWithFailure'
import { PreferencePage } from '../PreferencePage'
import {
   Container,
   Banner,
   DateWrapper,
   HeaderWrapper,
   SelectDate,
   MealCards,
   SuccessWrapper,
   LoadingWrapper
}
from './styledComponent'

@observer
class FoodManagementDashBoard extends React.Component {
   renderMealInfo = observer(() => {
      const { mealInformation, onClickEditPreference, } = this.props
      const mealInfo = [...mealInformation]
      if (mealInfo.length === 0) {
         return <NoDataView/>
      }
      else {

         return (
            <SuccessWrapper>
                <Banner>
            <SetCarousel/>
            </Banner>
            <DateWrapper>
          <SetDate/>
            </DateWrapper>
            <Provider onClickEditPreference={onClickEditPreference}>
            <MealCards>
            <MealCard perticularMealInfo={mealInfo[0]}/>
            <MealCard perticularMealInfo={mealInfo[1]}/>
            <MealCard perticularMealInfo={mealInfo[2]}/>
            </MealCards>
            </Provider>
            </SuccessWrapper>

         )
         // return (
         //    <PreferencePage/>
         // )
      }


   })

   render() {
      const {
         getMealInfoAPIStatus,
         getMealInfoAPIError,
         doNetworkCalls,
         mealInformation

      } = this.props
      const mealInfo = [...mealInformation]
      //console.log("mealInfo", mealInfo[0].mealType)
      if (mealInfo.length != 0) {
         return (
            <Container>
         <HeaderWrapper>
            <Header />
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
      return null
   }
}

export { FoodManagementDashBoard }
