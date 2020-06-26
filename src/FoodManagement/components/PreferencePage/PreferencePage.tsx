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
import { ItemInfo } from "../../stores/MealInfoStore/models/ItemInfo"

export interface PreferenceCardProps {
   selectedMealInfo:Array<ItemInfo>,
   selectedDate:string,
   onChangeDate:(date:string)=>void,
   getSelectedPreference:(Preference:string)=>void,
   onSaveMealPreference:()=>void,
   onClickBackButton:()=>void,
   onClickSkipButton:()=>void,
   isLoadingOnSave:()=>void,
   isLoadingOnSkipped:()=>void,
}

interface PreferencePageProps extends PreferenceCardProps {
   selectedMealTypeInfoAPIError:null | string,
   selectedMealTypeInfoAPIStatus:number,
   doNetworkCalls:()=>void,
   gotoHome:()=>void,
   onClickSignOut:()=>void
}


@observer
class PreferencePage extends React.Component<PreferencePageProps> {
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
