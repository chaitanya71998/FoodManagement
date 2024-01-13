/*global location*/
import React from 'react'
import { observer } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { Button } from '../../../Common/components/Button'
import { SetDate } from '../../../Common/components/SetDate'
import strings from '../../i18n/strings.json'
import { white, darkBlueGrey } from '../../themes/Colors'
import { MealTabs } from '../MealTabs'
const queryString = require('query-string')
import { PreferenceCardProps } from '../PreferencePage/PreferencePage'
import {
   Container,
   Header,
   Heading,
   SkipButtonWrapper,
   TabsWrapper,
   DateWrapper,
   Footer,
   BackButtonWrapper,
   SaveButtonWrapper,
   TabsAndDateWrapper,
   Image,
   Group,
   ImageWrapper
} from './styledComponents'
@observer
class PreferenceCard extends React.Component<
   PreferenceCardProps & RouteComponentProps
> {
   mealType: string
   constructor(props) {
      super(props)
      const parsed = queryString.parse(location.search)
      this.mealType = parsed.meal_type
   }
   render() {
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
      const selectedMealInformation = [...selectedMealInfo]
      if (selectedMealInformation.length != 0) {
         return (
            <Container>
               <Header>
                  <Heading>{this.mealType}</Heading>
                  <SkipButtonWrapper>
                     <Button
                        backgroundColor={white}
                        color={darkBlueGrey}
                        width='100%'
                        onClick={onClickSkipButton}
                        isLoading={isLoadingOnSkipped}
                     >
                        {strings.preferenceCard.skipMeal}
                     </Button>
                  </SkipButtonWrapper>
               </Header>
               <TabsAndDateWrapper>
                  <TabsWrapper>
                     <MealTabs
                        selectedMealInformation={selectedMealInformation}
                        getSelectedPreference={getSelectedPreference}
                     />
                  </TabsWrapper>
                  <Group>
                     <DateWrapper>
                        <SetDate
                           selectedDate={selectedDate}
                           onChangeDate={onChangeDate}
                        />
                     </DateWrapper>
                     <ImageWrapper>
                        <Image src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/90cfd3e2-22b8-44bc-be42-4d62a7a0a7c3.png' />
                     </ImageWrapper>
                  </Group>
               </TabsAndDateWrapper>
               <Footer>
                  <BackButtonWrapper>
                     <Button
                        backgroundColor={white}
                        color={darkBlueGrey}
                        width='100%'
                        onClick={onClickBackButton}
                     >
                        {strings.preferenceCard.back}
                     </Button>
                  </BackButtonWrapper>
                  <SaveButtonWrapper>
                     <Button
                        width='100%'
                        onClick={onSaveMealPreference}
                        isLoading={isLoadingOnSave}
                     >
                        {strings.preferenceCard.save}
                     </Button>
                  </SaveButtonWrapper>
               </Footer>
            </Container>
         )
      } else {
         return null
      }
   }
}

export default withRouter(PreferenceCard)
