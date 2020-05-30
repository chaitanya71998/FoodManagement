import React from 'react'
import { observer } from 'mobx-react'
import { MealTabs } from '../MealTabs'
import { SetCarousel } from '../../../common/components/SetCarousel'
import { Header } from '../../common/components/Header'
import { PreferenceCard } from '../PreferenceCard'
import {
   Container,
   Banner,
   DateWrapper,
   HeaderWrapper,
   SelectDate,
   MealCards,
   SuccessWrapper,
   LoadingWrapper,
   PreferenceCardWrapper
}
from './styledComponents'
import LoadingWrapperWithFailure from '../../../common/LoadingWrapperWithFailure'

@observer
class PreferencePage extends React.Component {
   renderMealInfo = observer(() => {
      const {
         selectedMealInfo,
         date,
         onChangeDate,
         getSelectedPreference,
         onSaveMealPreference,
         onClickBackButton,
      } = this.props

      if (selectedMealInfo.length === 0) {
         return <NoDataView />
      }
      else {
         return (
            <SuccessWrapper>
               <Banner>
                  <SetCarousel />
               </Banner>
               <PreferenceCardWrapper>
                  <PreferenceCard
                     selectedMealInfo={selectedMealInfo}
                     onChangeDate={onChangeDate}
                     date={date}
                     getSelectedPreference={getSelectedPreference}
                     onSaveMealPreference={onSaveMealPreference}
                     onClickBackButton={onClickBackButton}
                  />
               </PreferenceCardWrapper>
            </SuccessWrapper>
         )
      }
   })

   render() {
      const {
         selectedMealInfo,
         getmealPreferenceInfoAPIError,
         getmealPreferenceInfoAPIStatus,
         date,
         onChangeDate,
         getSelectedPreference,
         onSaveMealPreference,
         onClickBackButton,
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
                  apiStatus={getmealPreferenceInfoAPIStatus}
                  apiError={getmealPreferenceInfoAPIError}
                  onRetryClick={doNetworkCalls}
                  renderSuccessUI={this.renderMealInfo}
               />
            </LoadingWrapper>
         </Container>
      )
   }
}

export default PreferencePage
