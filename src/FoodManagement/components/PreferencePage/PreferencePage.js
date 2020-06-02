import React from 'react'
import { observer } from 'mobx-react'
import { SetCarousel } from '../../../common/components/SetCarousel'
import { Header } from '../../common/components/Header'
import { PreferenceCard } from '../PreferenceCard'
import { ReviewCard } from '../ReviewCard'
import {
   Container,
   Banner,
   HeaderWrapper,
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
         selectedDate,
         onChangeDate,
         getSelectedPreference,
         onSaveMealPreference,
         onClickBackButton,
      } = this.props
      console.log("selectedDate", selectedDate)
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
                     selectedDate={selectedDate}
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
         selectedMealTypeInfoAPIError,
         selectedMealTypeInfoAPIStatus,
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
                  apiStatus={selectedMealTypeInfoAPIStatus}
                  apiError={selectedMealTypeInfoAPIError}
                  onRetryClick={doNetworkCalls}
                  renderSuccessUI={this.renderMealInfo}
               />
            </LoadingWrapper>
         </Container>
      )
   }
}

export default PreferencePage
/*
<PreferenceCard
                     selectedMealInfo={selectedMealInfo}
                     onChangeDate={onChangeDate}
                     selectedDate={selectedDate}
                     getSelectedPreference={getSelectedPreference}
                     onSaveMealPreference={onSaveMealPreference}
                     onClickBackButton={onClickBackButton}
                  />*/
/*
<PreferenceCard
                     selectedMealInfo={selectedMealInfo}
                     onChangeDate={onChangeDate}
                     selectedDate={selectedDate}
                     getSelectedPreference={getSelectedPreference}
                     onSaveMealPreference={onSaveMealPreference}
                     onClickBackButton={onClickBackButton}
                  />*/
