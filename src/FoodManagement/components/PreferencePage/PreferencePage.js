import React from 'react'
import { observer } from 'mobx-react'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import NoDataView from '../../../Common/components/NoDataView'
import { SetCarousel } from '../../../Common/components/SetCarousel'
import { Header } from '../../common/components/Header'
import { PreferenceCard } from '../PreferenceCard'
import {
   Container,
   Banner,
   HeaderWrapper,
   SuccessWrapper,
   LoadingWrapper,
   PreferenceCardWrapper
} from './styledComponents'

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
         onClickSkipButton,
         isLoadingOnSave,
         isLoadingOnSkipped
      } = this.props
      if (selectedMealInfo.length === 0) {
         return <NoDataView />
      } else {
         return (
            <SuccessWrapper>
               <PreferenceCardWrapper>
                  <PreferenceCard
                     selectedMealInfo={selectedMealInfo}
                     onChangeDate={onChangeDate}
                     selectedDate={selectedDate}
                     getSelectedPreference={getSelectedPreference}
                     onSaveMealPreference={onSaveMealPreference}
                     onClickBackButton={onClickBackButton}
                     onClickSkipButton={onClickSkipButton}
                     isLoadingOnSave={isLoadingOnSave}
                     isLoadingOnSkipped={isLoadingOnSkipped}
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
            <Banner>
               <SetCarousel />
            </Banner>
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
